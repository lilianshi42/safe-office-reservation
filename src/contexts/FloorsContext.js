import React, { useContext, useState, useEffect } from 'react';
import { retrieveDataFromCollectionDocument, retrieveDocIdFromCollectionDocument, updateDataToCollection, updateSeatSelected, deleteDataFromCollection, addDataToCollection } from '../firebase/firebase';
import { useBookings } from "./BookingsContext";

const FloorsContext = React.createContext()

export function useFloors() {
    return useContext(FloorsContext)
}

export const FloorsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [floorsData, setFloorsData] = useState([]);
    const [docID, setDocID] = useState([]);
    const [state, setState] = useState({});
    const { getBookingByDate } = useBookings();
    const [flag, setFlag] = useState(false)

    //get all
    //parameter: no
    //return: an array of floors
    function getAllFloors() {
        return floorsData
    }

    //get by id
    //parameter: floorId
    //return: one floor
    function getFloorByFloorId(id) {
        return floorsData.find(floor => floor.id === id);
    }

    //add new floor to the database
    //parameter: a floor object
    function addNewFloor(floor) {
        addDataToCollection('floors', floor)
    }

    //delete floor by ID from the database
    //parameter: a floorid
    function deleteFloor(id) {
        let index = floorsData.find(floor => floor.id === id);
        deleteDataFromCollection('floors', docID[index])
    }

    //update floor by ID on the database
    //parameter: floor id, the new floor object
    function updateFloor(id, floor) {
        let index = floorsData.find(floor => floor.id === id);
        updateDataToCollection('floors', docID[index], floor)
    }

    //get all desks on a floor
    //parameter: floor id
    //return: all the desks on the floor
    function getAllDesksByFloorId(id) {
        let floor = getFloorByFloorId(id);
        return floor ? floor.desks : [];
    }

    //get all available desks on a floor in some day
    //parameter: floor id, date
    //return: all the available desks on the floor on that day
    function getAllDesksByFloorIdAndDate(id, date) {
        let desks = getAllDesksByFloorId(id);
        if (desks.length === 0) return [];
        let bookedDesksOnDate = [];
        const bookings = getBookingByDate(date);
        bookings.forEach(booking => {
            if (booking.bookingDate === date) {
                bookedDesksOnDate.push(booking.deskId);
            }
        })
        return desks.filter(desk => !bookedDesksOnDate.includes(desk.id));
    }

    //get all available desks in a location in some day
    //parameter: location, date
    //return: all the available desks in that location on that day
    function getAllDesksByLocationAndDate(location, date) {
        if (floorsData.length === 0) return;
        console.log(date)
        let desks = [];
        floorsData.forEach(seat => {
            if (seat.officeLocation === location && seat.date !== date && seat.availability === true) {
                desks.push(seat)
            }
        })

        desks.sort((a, b) => {
            return (a.seatNum - b.seatNum)
        })

        return desks
    }

    async function updateSelectedSeatIntoDB(location, seatNum, date) {
        try {
            await updateSeatSelected('floors', location, seatNum, date);

        } catch (err) {
            console.log(err);
        }

    }

    function refreshFloorsData() {
        setFlag(!flag)
    }

    useEffect(() => {
        retrieveDataFromCollectionDocument('floors')
            .then(data => {
                setFloorsData(data)
            })
        retrieveDocIdFromCollectionDocument('floors')
            .then(data => {
                setDocID(data)
            })
        setLoading(false)
        return () => {
            setState({});
        };
    }, [flag])

    const value = {
        state,
        floorsData,
        refreshFloorsData,
        getAllFloors,
        updateSelectedSeatIntoDB,
        getFloorByFloorId,
        getAllDesksByFloorId,
        getAllDesksByFloorIdAndDate,
        getAllDesksByLocationAndDate,
        addNewFloor,
        deleteFloor,
        updateFloor
    }
    return (
        <FloorsContext.Provider value={value}>
            {!loading && children}
        </FloorsContext.Provider>
    );
}


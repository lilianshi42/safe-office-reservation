import React, { useContext, useState, useEffect } from 'react';
import { retrieveDataFromCollectionDocument, retrieveDocIdFromCollectionDocument, updateDataToCollection, getDataFromCollection, deleteDataFromCollection, addDataToCollection } from '../firebase/firebase';

const FloorsContext = React.createContext()

export function useFloors() {
    return useContext(FloorsContext)
}

export const FloorsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [floorsData, setFloorsData] = useState(null);
    const [docID, setDocID] = useState(null);

    //get all
    function getAllFloors() {
        return floorsData
    }

    //get by id
    function getFloorByFloorId(id) {
        let index = floorsData.find(floor => floor.id === id);
        return getDataFromCollection(docID[index])
    }

    //add new floor
    function addNewFloor(floor) {
        addDataToCollection('floors', floor)
    }

    //delete floor by ID
    function deleteFloor(id) {
        let index = floorsData.find(floor => floor.id === id);
        deleteDataFromCollection('floors', docID[index])
    }

    //update floor by ID
    function updateFloor(id, floor) {
        let index = floorsData.find(floor => floor.id === id);
        updateDataToCollection('floors', docID[index], floor)
    }

    function getAllDesksByFloorId(id) {
        let floor = this.getFloorByFloorId(id);
        return floor ? floor.desks : [];
    }

    function getAllDesksByFloorIdAndDate(id, date) {
        let desks = this.getAllDesksByFloorId(id);
        if (desks.length === 0) return [];
        let bookedDesksOnDate = [];
        this.bookings.forEach(booking => {
            if (booking.bookingDate === date) {
                bookedDesksOnDate.push(booking.deskId);
            }
        })
        return desks.filter(desk => !bookedDesksOnDate.includes(desk.id));
    }

    useEffect(() => {
        let unmounted = false;
        retrieveDataFromCollectionDocument('floors')
            .then(data => {
                setFloorsData(data)
            })
            .then(retrieveDocIdFromCollectionDocument('floors')
            )
            .then(data => {
                setDocID(data)
            })
            .then(() => {
                if (!unmounted) {
                    setLoading(false)
                }
            })


        return () => { unmounted = true };
    }, [])

    const value = {
        floorsData,
        getAllFloors,
        getFloorByFloorId,
        getAllDesksByFloorId,
        getAllDesksByFloorIdAndDate,
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


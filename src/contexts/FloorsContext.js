import React, { useContext, useState, useEffect } from 'react';
import { retrieveDataFromCollectionDocument, addSingleDataToCollectionsDocument, uploadDataCollectionsDocument } from '../firebase/firebase';

const FloorsContext = React.createContext()

export function useFloors() {
    return useContext(FloorsContext)
}

export const FloorsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [floorsData, setFloorsData] = useState(null);

    function getAllFloors() {
        return floorsData
    }

    function getFloorByFloorId(id) {
        return floorsData.find(floor => floor.id === id);
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

    function addNewFloor(floor) {
        addSingleDataToCollectionsDocument('floors', floor)
    }

    //add new desk for floor
    function addNewDeskForFloor(floorId, desk) {
        let floor = this.getFloorByFloorId(floorId);
        if (!floor) return false;
        if (floor.desks === undefined) {
            floor.desks = [];
        }
        setFloorsData(...floorsData, floor)
        uploadDataCollectionsDocument(floor)
        //floor.desks.push(desk);
    }

    useEffect(() => {
        const unsubscribe = retrieveDataFromCollectionDocument('floors')
            .then(data => {
                setFloorsData(data)
            })
        setLoading(false)
        return unsubscribe
    }, [])

    const value = {
        floorsData,
        getAllFloors,
        getFloorByFloorId,
        getAllDesksByFloorId,
        getAllDesksByFloorIdAndDate,
        addNewFloor,
        addNewDeskForFloor
    }
    return (
        <FloorsContext.Provider value={value}>
            {!loading && children}
        </FloorsContext.Provider>
    );
}


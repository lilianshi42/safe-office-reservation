import React, { useContext, useState, useEffect } from 'react';
import { retrieveDataFromCollectionDocument, retrieveDocIdFromCollectionDocument, getDataFromCollection, addDataToCollection, deleteDataFromCollection, updateDataToCollection,retrieveDocIdFromCollectionByFieldValue } from '../firebase/firebase';

const BookingsContext = React.createContext()

export function useBookings() {
    return useContext(BookingsContext)
}

export const BookingsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [bookingsData, setBookingsData] = useState(null);
    const [docID, setDocID] = useState(null);

    //get all
    function getAllBookings() {
        return bookingsData
    }

    //get by id
    function getBookingsByBookingsId(id) {
        let index = bookingsData.find(floor => floor.id === id);
        return getDataFromCollection(docID[index])
    }

    //add new bookings
    function addNewBookings(username, date, deskId, floorId) {
        const id = Math.floor(Math.random() * 1000001);
        let newBooking = {
            id,
            owner: username,
            bookingDate: date,
            createdAT: new Date(),
            deskId,
            floorId,
            checkIn: false,
            checkOut: false
        }
        addDataToCollection('bookings', newBooking)
    }

    //delete bookings by ID
    function deleteBookings(id) {
        let index = bookingsData.find(floor => floor.id === id);
        deleteDataFromCollection('bookings', docID[index])
    }

    //update bookings by ID
    function updateBookings(id, booking) {
        let index = bookingsData.find(floor => floor.id === id);
        updateDataToCollection('bookings', docID[index], booking)
    }

    //return true if user has a booking on that date
    function userHasBookingThatDay(username, date) {
        return bookingsData.some(booking => booking.owner === username && booking.bookingDate === date);
    }

    //note: needs to add validations later
    function getBookingByUsernameAndDate(username, date) {
        if (!date) {
            return bookingsData.filter(booking => booking.owner === username);
        }
        return bookingsData.find(booking => booking.owner === username && booking.bookingDate === date);
    }

    //note: needs to add validations later
    async function checkInByUsernameAndDate(username, date) {
        try{
            var booking = getBookingByUsernameAndDate(username, date);
            booking.checkIn = true;
            let index = await retrieveDocIdFromCollectionByFieldValue('bookings',username,date);
            console.log(index);
           // let index = bookingsData.find(booking => booking.username === username && booking.date === date);
            //updateDataToCollection('bookings', docID[index], booking)
        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        let unmounted = false;
        retrieveDataFromCollectionDocument('bookings')
            .then(data => {
                setBookingsData(data)
            })
            .then(retrieveDocIdFromCollectionDocument('bookings')
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
        getAllBookings,
        getBookingsByBookingsId,
        addNewBookings,
        deleteBookings,
        updateBookings,
        userHasBookingThatDay,
        getBookingByUsernameAndDate,
        checkInByUsernameAndDate,
    }
    return (
        <BookingsContext.Provider value={value}>
            {!loading && children}
        </BookingsContext.Provider>
    );
}

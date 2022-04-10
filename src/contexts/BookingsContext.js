import React, { useContext, useState, useEffect } from 'react';
import { retrieveDataFromCollectionDocument, retrieveDocIdFromCollectionDocument, getDataFromCollection, addDataToCollection, deleteDataFromCollection, updateDataToCollection, updateChecking, updateCheckOut } from '../firebase/firebase';

const BookingsContext = React.createContext()

export function useBookings() {
    return useContext(BookingsContext)
}

export const BookingsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [bookingsData, setBookingsData] = useState(null);
    const [docID, setDocID] = useState(null);
    const [state, setState] = useState({});

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
    function addNewBookings(username, date, deskId, floorId, officeAddress) {
        const id = Math.floor(Math.random() * 1000001);
        let newBooking = {
            id,
            owner: username,
            bookingDate: date,
            createdAT: new Date(),
            deskId,
            floorId,
            officeAddress,
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
        try {
            await updateChecking('bookings', username, date);

        } catch (err) {
            console.log(err);
        }

    }

    //note: needs to add validations later
    async function checkOutByUsernameAndDate(username, date) {
        try {
            await updateCheckOut('bookings', username, date);

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        retrieveDataFromCollectionDocument('bookings')
            .then(data => {
                setBookingsData(data)
            })
        retrieveDocIdFromCollectionDocument('bookings')
            .then(data => {
                setDocID(data)
            })
        setLoading(false)
        return () => {
            setState({});
        };
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
        checkOutByUsernameAndDate,
    }
    return (
        <BookingsContext.Provider value={value}>
            {!loading && children}
        </BookingsContext.Provider>
    );
}

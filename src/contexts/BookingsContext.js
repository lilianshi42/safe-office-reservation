import React, { useContext, useState, useEffect } from 'react';
import { retrieveDataFromCollectionDocument, retrieveDocIdFromCollectionDocument, getDataFromCollection, addDataToCollection, deleteDataFromCollection, updateDataToCollection, updateChecking, updateCheckOut } from '../firebase/firebase';

const BookingsContext = React.createContext()

export function useBookings() {
    return useContext(BookingsContext)
}

export const BookingsProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [bookingsData, setBookingsData] = useState([]);
    const [docID, setDocID] = useState([]);
    const [state, setState] = useState({});
    const [flag, setFlag] = useState(false)

    //get all bookings
    //no parameter
    //return all bookings
    function getAllBookings() {
        return bookingsData
    }

    //get booking by booking id
    //parameter: booking id
    //return a booking 
    function getBookingsByBookingsId(id) {
        let index = bookingsData.find(floor => floor.id === id);
        return getDataFromCollection(docID[index])
    }

    //add new bookings to the database
    //parameter: username, date, deskId, floorId, officeAddress
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
    //parameter: id
    function deleteBookings(id) {
        let index = bookingsData.find(floor => floor.id === id);
        deleteDataFromCollection('bookings', docID[index])
    }

    //update bookings by ID
    //parameter: id
    function updateBookings(id, booking) {
        let index = bookingsData.find(floor => floor.id === id);
        updateDataToCollection('bookings', docID[index], booking)
    }

    //return true if user has a booking on that date
    //parameter: user email, data
    function userHasBookingThatDay(username, date) {
        return bookingsData.some(booking => booking.owner === username && booking.bookingDate === date);
    }

    //note: get booking history by user email and date
    //parameter: user email, date
    //return an array of bookings if no date is provided; A single booking if both parameter provided
    function getBookingByUsernameAndDate(username, date) {
        if (!date) {
            return bookingsData.filter(booking => booking.owner === username);
        }
        return bookingsData.find(booking => booking.owner === username && booking.bookingDate === date);
    }

    //get all bookings by date, no user email needed
    //parameter: date
    //return an array to bookings
    function getBookingByDate(date) {
        return bookingsData.filter(booking => booking.bookingDate === date);
    }

    //modify the check-in status to true on database
    //parameter: useremail, date, and survey answer
    async function checkInByUsernameAndDate(username, date,answer) {
        try {
            await updateChecking('bookings', username, date,answer);

        } catch (err) {
            console.log(err);
        }

    }

    //modify the check-in status of the user on that day to true on database
    //parameter: useremail, date
    async function checkOutByUsernameAndDate(username, date) {
        try {
            await updateCheckOut('bookings', username, date);

        } catch (err) {
            console.log(err);
        }

    }
    
    function refreshBookingsData() {
        setFlag(!flag)
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
    }, [flag])


    const value = {
        state,
        refreshBookingsData,
        getAllBookings,
        getBookingsByBookingsId,
        addNewBookings,
        deleteBookings,
        updateBookings,
        userHasBookingThatDay,
        getBookingByUsernameAndDate,
        checkInByUsernameAndDate,
        checkOutByUsernameAndDate,
        getBookingByDate,
    }
    return (
        <BookingsContext.Provider value={value}>
            {!loading && children}
        </BookingsContext.Provider>
    );
}

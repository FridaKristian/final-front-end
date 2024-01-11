import { create } from 'zustand'

const apiEnv = import.meta.env.VITE_BACKEND_API

export const bookingStore = create((set) => ({
    allShowTimes: [],
    selectedSeats: [],
    selectedShowtime: [],

    fetchAllShowTimes: async () => {
        try {
            const response = await fetch(`${apiEnv}/showtimes`, {
                method: 'GET',
            })
            const data = await response.json()
            // console.log(data)
            set({ allShowTimes: data })
        }
        catch (error) {
            console.log(error)
        }
    },

    fetchSelectedShowtime: async (showtimeId) => {
        try {
            const response = await fetch(`${apiEnv}/showtimes/showtime/${showtimeId}`, {
                method: 'GET',
            })
            const data = await response.json()
            set({ selectedShowtime: data })
        }
        catch (error) {
            console.log(error)
        }
    },

    setSelectedSeats: async ( newSeats, showTimeId ) => {
        set(
            () => ({ 
                selectedSeats: 
                    Array.isArray(newSeats) ? newSeats : [newSeats] 
        }))

        try {
            const theSeats = Array.isArray(newSeats) ? newSeats : [newSeats] 
            const response = await fetch(`${apiEnv}/showtimes/showtime/${showTimeId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    seat: theSeats ,
                    id: showTimeId 
                })
            })
            const data = await response.json()
            set({ selectedShowtime: data })
        } catch (error) {
            console.log(error)
        }
    },

    updateSelectedSeats: async ( newSeats, showTimeId ) => {
        set(
            state => ({ 
                selectedSeats: [...state.selectedSeats, newSeats] 
            })
        )
        try {
            const theSeats = Array.isArray(newSeats) ? newSeats : [newSeats] 
            const response = await fetch(`${apiEnv}/showtimes/showtime/${showTimeId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    seat: theSeats,
                    id: showTimeId 
                })
            })
            const data = await response.json()
            set({ selectedShowtime: data })
        } catch (error) {
            console.log(error)
        }
    },

    makeAReservation: async ({ selectedSeat, email, showTimeId }) => {
        try {
            const response = await fetch(`${apiEnv}/bookings`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: email,
                    seat: selectedSeat,
                    showtimeId: showTimeId 
                })
            })
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    },
}))

export default bookingStore
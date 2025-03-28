"use client"

import { useState, useEffect } from "react"
import "../../styles/BookingSection.css"

const BookingSection = () => {
  const [availabilities, setAvailabilities] = useState([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedBarber, setSelectedBarber] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    // Fetch availabilities
    if (selectedDate) {
      fetchAvailabilities()
    }
  }, [selectedDate])

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/availability")
      const data = await response.json()

      // Filter availabilities by selected date
      const filtered = data.filter((avail) => {
        const availDate = new Date(avail.date).toDateString()
        const selDate = new Date(selectedDate).toDateString()
        return availDate === selDate
      })

      setAvailabilities(filtered)
    } catch (error) {
      console.error("Error fetching availabilities:", error)
    }
  }

  const handleBooking = async () => {
    if (!isLoggedIn) {
      setMessage("Please log in to book an appointment")
      return
    }

    if (!selectedTimeSlot) {
      setMessage("Please select a time slot")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          availabilityId: selectedTimeSlot.availabilityId,
          timeSlot: {
            startTime: selectedTimeSlot.startTime,
            endTime: selectedTimeSlot.endTime,
          },
        }),
      })

      if (response.ok) {
        setMessage("Booking successful! We look forward to seeing you.")
        setSelectedTimeSlot(null)
        fetchAvailabilities() // Refresh availabilities
      } else {
        const error = await response.json()
        setMessage(error.msg || "Booking failed. Please try again.")
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      setMessage("An error occurred. Please try again later.")
    }
  }

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }

    return dates
  }

  return (
    <section id="booking" className="booking-section">
      <h2>Book Your Appointment</h2>
      <div className="booking-container">
        <div className="booking-step">
          <h3>1. Select a Date</h3>
          <div className="date-selector">
            {generateDates().map((date, index) => (
              <div
                key={index}
                className={`date-option ${selectedDate === date.toISOString().split("T")[0] ? "selected" : ""}`}
                onClick={() => setSelectedDate(date.toISOString().split("T")[0])}
              >
                <div className="date-day">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="date-number">{date.getDate()}</div>
                <div className="date-month">{date.toLocaleDateString("en-US", { month: "short" })}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="booking-step">
            <h3>2. Select a Barber</h3>
            <div className="barber-selector">
              {availabilities.length > 0 ? (
                [...new Set(availabilities.map((a) => a.barber._id))].map((barberId) => {
                  const barber = availabilities.find((a) => a.barber._id === barberId).barber
                  return (
                    <div
                      key={barberId}
                      className={`barber-option ${selectedBarber === barberId ? "selected" : ""}`}
                      onClick={() => setSelectedBarber(barberId)}
                    >
                      <div className="barber-image">
                        <img src="/placeholder.svg?height=50&width=50" alt={barber.name} />
                      </div>
                      <div className="barber-name">{barber.name}</div>
                    </div>
                  )
                })
              ) : (
                <p>No barbers available on this date</p>
              )}
            </div>
          </div>
        )}

        {selectedBarber && (
          <div className="booking-step">
            <h3>3. Select a Time</h3>
            <div className="time-selector">
              {availabilities
                .filter((a) => a.barber._id === selectedBarber)
                .flatMap((a) =>
                  a.timeSlots
                    .filter((slot) => !slot.isBooked)
                    .map((slot, index) => (
                      <div
                        key={index}
                        className={`time-option ${
                          selectedTimeSlot &&
                          selectedTimeSlot.startTime === slot.startTime &&
                          selectedTimeSlot.endTime === slot.endTime
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedTimeSlot({
                            availabilityId: a._id,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                          })
                        }
                      >
                        {slot.startTime} - {slot.endTime}
                      </div>
                    )),
                )}
            </div>
          </div>
        )}

        {selectedTimeSlot && (
          <div className="booking-step">
            <h3>4. Confirm Booking</h3>
            <button className="book-button" onClick={handleBooking}>
              Book Appointment
            </button>
            {message && <p className="booking-message">{message}</p>}
            {!isLoggedIn && (
              <p className="login-prompt">
                Please <a href="/login">log in</a> to book an appointment
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default BookingSection


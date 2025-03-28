"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./context/AuthContext"

// Auth Components
import Login from "./components/Auth/Login"
import Signup from "./components/Auth/Signup"

// Newsletter Components
import Subscribe from "./components/Newsletter/Subscribe"
import SendNewsletter from "./components/Newsletter/SendNewsletter"

// Booking Components
import CreateAvailability from "./components/Booking/CreateAvailability"
import BookAppointment from "./components/Booking/BookAppointment"
import ViewBookings from "./components/Booking/ViewBookings"

// Home Page
import HomePage from "./pages/HomePage"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Newsletter Routes */}
            <Route
              path="/newsletter/subscribe"
              element={
                <ProtectedRoute>
                  <Subscribe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/newsletter/send"
              element={
                <ProtectedRoute>
                  <SendNewsletter />
                </ProtectedRoute>
              }
            />

            {/* Protected Booking Routes */}
            <Route
              path="/availability/create"
              element={
                <ProtectedRoute>
                  <CreateAvailability />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/create"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <ViewBookings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


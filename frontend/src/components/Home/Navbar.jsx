"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../../styles/Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Improved smooth scroll function
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()

    // Close mobile menu if open
    closeMobileMenu()

    // If it's the home link, scroll to top
    if (!sectionId) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    // Use setTimeout to ensure DOM is fully loaded
    setTimeout(() => {
      // Find the section element
      const section = document.getElementById(sectionId)
      
      if (section) {
        // Get the position of the element relative to the viewport
        const rect = section.getBoundingClientRect()
        
        // Calculate the absolute position and adjust for navbar height (80px)
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const offsetPosition = rect.top + scrollTop - 80
        
        // Scroll to the element
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        console.log(`Scrolled to section: ${sectionId} at position ${offsetPosition}`)
      } else {
        console.error(`Section not found: ${sectionId}`)
        // Log all available IDs for debugging
        const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id)
        console.log('Available IDs:', allIds)
      }
    }, 100) // Small delay to ensure DOM is ready
  }

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={(e) => scrollToSection(e, null)}>
          BARBER<span>SHOP</span>
        </Link>

        <div className="menu-icon" onClick={toggleMobileMenu}>
          <div className={`menu-icon-bar ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${isMobileMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${isMobileMenuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={(e) => scrollToSection(e, null)}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#booking" className="nav-link" onClick={(e) => scrollToSection(e, "booking")}>
              Book Now
            </a>
          </li>
          <li className="nav-item">
            <a href="#story" className="nav-link" onClick={(e) => scrollToSection(e, "story")}>
              Our Story
            </a>
          </li>
          <li className="nav-item">
            <a href="#newsletter" className="nav-link" onClick={(e) => scrollToSection(e, "newsletter")}>
              Newsletter
            </a>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/bookings" className="nav-link" onClick={closeMobileMenu}>
                  My Bookings
                </Link>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    localStorage.removeItem("token")
                    setIsLoggedIn(false)
                    closeMobileMenu()
                    window.location.reload()
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link signup-link" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

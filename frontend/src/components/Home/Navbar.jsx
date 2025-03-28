"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "../../styles/Navbar.css"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navbarRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    const handleScroll = () => {
      if (window.scrollY > 10) {
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

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    closeMobileMenu()

    if (!sectionId) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        const rect = section.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const offsetPosition = rect.top + scrollTop - (isMobileMenuOpen ? 200 : 80)
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  const navLinks = [
    { id: 1, name: "Home", section: null },
    { id: 2, name: "Book Now", section: "booking" },
    { id: 3, name: "Our Story", section: "story" },
    { id: 4, name: "Newsletter", section: "newsletter" },
  ]

  return (
    <motion.nav 
      ref={navbarRef}
      className={`navbar ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
    >
      <div className="navbar-container">
        <motion.div whileHover={{ scale: 1.0 }}>
          <Link to="/" className="navbar-logo" onClick={(e) => scrollToSection(e, null)}>
            BARBER<span>SHOP</span>
          </Link>
        </motion.div>

        <motion.div 
          className="menu-icon" 
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.9 }}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`menu-icon-bar ${isMobileMenuOpen ? "open" : ""}`}
              animate={
                isMobileMenuOpen
                  ? i === 1
                    ? { rotate: 45, y: 9 }
                    : i === 2
                    ? { opacity: 0 }
                    : { rotate: -45, y: -9 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </motion.div>

        <ul className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <motion.li 
              key={link.id}
              className="nav-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href={`#${link.section}`} 
                className="nav-link" 
                onClick={(e) => scrollToSection(e, link.section)}
              >
                {link.name}
              </a>
            </motion.li>
          ))}

          <AnimatePresence>
            {isLoggedIn ? (
              <>
                <motion.li 
                  className="nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link to="/bookings" className="nav-link" onClick={closeMobileMenu}>
                    My Bookings
                  </Link>
                </motion.li>
                <motion.li 
                  className="nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
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
                </motion.li>
              </>
            ) : (
              <>
                <motion.li 
                  className="nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link to="/login" className="nav-link" onClick={closeMobileMenu}>
                    Login
                  </Link>
                </motion.li>
                <motion.li 
                  className="nav-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Link 
                    to="/signup" 
                    className="nav-link signup-link" 
                    onClick={closeMobileMenu}
                    whileHover={{ scale: 1.1 }}
                  >
                    Sign Up
                  </Link>
                </motion.li>
              </>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navbar
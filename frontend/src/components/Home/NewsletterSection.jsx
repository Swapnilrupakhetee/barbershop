"use client"

import { useState, useEffect } from "react"
import "../../styles/NewsletterSection.css"

const NewsletterSection = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Log when this component mounts to verify it's rendering
  useEffect(() => {
    console.log("NewsletterSection mounted with ID: newsletter")
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email address")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("http://localhost:5000/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage("Thank you for subscribing to our newsletter!")
        setEmail("")
      } else {
        const error = await response.json()
        setMessage(error.msg || "Subscription failed. Please try again.")
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      setMessage("An error occurred. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers, grooming tips, and updates on new services.</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button" disabled={isSubmitting}>
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="newsletter-message">{message}</p>}
        </div>
        <div className="newsletter-image">
          <img src="/placeholder.svg?height=300&width=400" alt="Newsletter" />
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection


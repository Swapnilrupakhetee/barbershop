"use client"

import { useState, useEffect } from "react"
import "../../styles/TestimonialSection.css"

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    text: "The best haircut I've ever had. The attention to detail is incredible!",
    rating: 5,
    image: "/images/testimonial1.jpg",
  },
  {
    id: 2,
    name: "Michael Thompson",
    text: "I've been coming here for years. The service is always top-notch and consistent.",
    rating: 5,
    image: "/images/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Robert Davis",
    text: "Great atmosphere, professional service, and reasonable prices. Highly recommend!",
    rating: 5,
    image: "/images/testimonial3.jpg",
  },
]

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="testimonial-section">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-container">
        <div className="testimonial-slider" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-image">
                <img src={testimonial.image || "/placeholder.svg?height=100&width=100"} alt={testimonial.name} />
              </div>
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection


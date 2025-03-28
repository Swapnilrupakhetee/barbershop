import { useEffect } from "react"
import HeroSection from "../components/Home/HeroSection"
import TestimonialSection from "../components/Home/TestimonialSection"
import BookingSection from "../components/Home/BookingSection"
import StorySection from "../components/Home/StorySection"
import NewsletterSection from "../components/Home/NewsletterSection"
import Footer from "../components/Home/Footer"
import "../styles/HomePage.css"
import Navbar from "../components/Home/Navbar"

const HomePage = () => {
  // Log all section IDs when the component mounts to verify they exist
  useEffect(() => {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
      console.log("Checking for section IDs:");
      console.log("booking section:", document.getElementById("booking"));
      console.log("story section:", document.getElementById("story"));
      console.log("newsletter section:", document.getElementById("newsletter"));
      
      // Log all IDs in the document
      const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
      console.log("All IDs in document:", allIds);
    }, 1000);
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      <TestimonialSection />
      <BookingSection />
      <StorySection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default HomePage;

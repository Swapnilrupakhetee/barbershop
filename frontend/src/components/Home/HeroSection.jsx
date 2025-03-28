import "../../styles/HeroSection.css"

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Premium Barber Experience</h1>
        <h2>Look Sharp, Feel Confident</h2>
        <p>Expert haircuts and grooming services tailored to your style</p>
        <a href="#booking" className="cta-button">
          Book Now
        </a>
      </div>
    </section>
  )
}

export default HeroSection


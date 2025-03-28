import React from 'react';
import '../../styles/StorySection.css';

const StorySection = () => {
  // Log when this component mounts to verify it's rendering
  React.useEffect(() => {
    console.log("StorySection mounted with ID: story");
  }, []);

  return (
    <section id="story" className="story-section">
      <div className="story-container">
        <div className="story-image">
          <img src="/placeholder.svg?height=400&width=600" alt="Our Barber Shop" />
        </div>
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2010, our barber shop has been dedicated to providing exceptional grooming services to men who appreciate quality and style.
          </p>
          <p>
            What started as a small, one-chair operation has grown into a premium destination for those seeking the perfect haircut, beard trim, and grooming experience.
          </p>
          <p>
            Our team of skilled barbers combines traditional techniques with modern styles to create looks that are both timeless and contemporary.
          </p>
          <p>
            We believe that a great haircut is more than just a service—it's an experience that boosts confidence and helps you put your best face forward.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

import "../../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 Barber Street</p>
          <p>New York, NY 10001</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@barbershop.com</p>
        </div>

        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday - Friday: 9am - 8pm</p>
          <p>Saturday: 10am - 6pm</p>
          <p>Sunday: 11am - 5pm</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              Facebook
            </a>
            <a href="#" className="social-link">
              Instagram
            </a>
            <a href="#" className="social-link">
              Twitter
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Haircuts</a>
            </li>
            <li>
              <a href="#">Beard Trims</a>
            </li>
            <li>
              <a href="#">Hot Towel Shaves</a>
            </li>
            <li>
              <a href="#">Hair Styling</a>
            </li>
            <li>
              <a href="#">Kids Cuts</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Premium Barber Shop. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer


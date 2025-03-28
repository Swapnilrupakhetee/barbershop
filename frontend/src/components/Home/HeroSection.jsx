import { motion } from "framer-motion"
import "../../styles/HeroSection.css"

const HeroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(197, 157, 95, 0.4)",
      transition: { 
        yoyo: Infinity,
        duration: 0.3
      }
    },
    tap: { scale: 0.95 }
  }

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.h1 variants={itemVariants}>
          <span className="gold-gradient">Premium</span> Barber Experience
        </motion.h1>
        <motion.h2 variants={itemVariants}>
          Look <span className="underline-animation">Sharp</span>, Feel Confident
        </motion.h2>
        <motion.p variants={itemVariants}>
          Expert haircuts and grooming services tailored to your style. 
          Where tradition meets contemporary craftsmanship.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.a 
            href="#booking" 
            className="cta-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Book Now
            <span className="button-arrow">→</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
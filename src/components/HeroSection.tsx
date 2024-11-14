import { useState, useEffect } from "react";
import { FaScissors, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
interface HeroSectionProps {

  
  
    onBookAppointment: () => void; // Added prop
  }

const HeroSection : React.FC<HeroSectionProps>= ({onBookAppointment}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3",
      alt: "Professional barber cutting client's hair"
    },
    {
      image: "images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3",
      alt: "Modern barber shop interior"
    },
    {
      image: "images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3",
      alt: "Barber tools and equipment"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`https://${slide.image}`}
              alt={slide.alt}
              className="object-cover w-full h-full"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white px-4 md:px-8">
        <div className="animate-fadeIn">
          <FaScissors className="mx-auto text-4xl mb-6 text-yellow-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Classic Cuts & Modern Style
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
            Experience the perfect blend of traditional craftsmanship and contemporary grooming at Manhattan's premier barbershop. Where style meets excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-yellow-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              onClick={onBookAppointment}
            >
              Book Appointment
              <FaAngleRight className="inline ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/services">
            <button
              className="group bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              
            >
              Explore Services
            </button>
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  currentSlide === index ? "bg-yellow-400 w-8" : "bg-white"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
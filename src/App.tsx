// App.tsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BarberServices from "./Pages/BarberServices";
import ProfilePage from "./Pages/ProfilePage";
import BookingModal from "./components/BookingModal";

import { FaCut, FaShower, FaSprayCan } from "react-icons/fa";
import { BiSolidFaceMask } from "react-icons/bi";
import HeroSection from "./components/HeroSection";

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const services = [
    {
      id: 1,
      title: "Classic Haircut",
      description: "Professional haircut with precision styling and finishing",
      price: "$30",
      duration: "45 mins",
      category: "haircut",
      image: "images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3",
      icon: <FaCut className="text-2xl" />
    },
    {
      id: 2,
      title: "Beard Grooming",
      description: "Expert beard trimming and shaping with hot towel service",
      price: "$25",
      duration: "30 mins",
      category: "grooming",
      image: "images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3",
      icon: <FaShower className="text-2xl" />
    },
    {
      id: 3,
      title: "Hair Treatment",
      description: "Deep conditioning and scalp treatment for healthy hair",
      price: "$40",
      duration: "60 mins",
      category: "treatment",
      image: "images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3",
      icon: <FaSprayCan className="text-2xl" />
    },
    {
      id: 4,
      title: "Facial Care",
      description: "Rejuvenating facial treatment with premium products",
      price: "$35",
      duration: "40 mins",
      category: "treatment",
      image: "images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3",
      icon: <BiSolidFaceMask className="text-2xl" />
    }
  ]

  const servicesData: string[] = [
    "Hair Cut & Styling",
    "Spa Treatment",
    "Massage Therapy",
    "Facial Treatment",
    "Nail Care",
    "Body Scrub",
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    // Add more links as needed
  ];

  const userMenuItems = [
    { name: "Profile", href: "/profile" },
    { name: "Logout", href: "/logout" },
    // Add more user menu items as needed
  ];

  return (
    <Router>
      <Navbar
        logo={{ src: "", alt: "Company Logo" }}
        navLinks={navLinks}
        userMenuItems={userMenuItems}
   
        isLoggedIn={true} // Example logged-in state
        onBookAppointment={openBookingModal} // Pass the handler here
      />

      <Routes>
        <Route path="/" element={<HeroSection onBookAppointment={openBookingModal} />} />
        <Route
          path="/services"
          element={<BarberServices services={services} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Add more routes as needed */}
      </Routes>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        services={servicesData}
        onSubmit={(data) => {
          console.log("Booking Data:", data);
          // Implement further submission logic (e.g., API call)
          closeBookingModal();
        }}
      />
    </Router>
  );
};

export default App;
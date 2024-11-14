// constants.ts
import { Staff, Service, Appointment } from "./types";
export const INITIAL_STAFF: Staff[] = [
    {
      id: 1,
      name: "John Smith",
      email: "john@barber.com",
      role: "Senior Barber",
      experience: "5 years"
    }
  ];
  
 export const INITIAL_SERVICES: Service[] = [
    {
      id: 1,
      name: "Classic Haircut",
      price: "$30",
      duration: "30 mins",
      image: "images.unsplash.com/photo-1585747860715-2ba37e788b70",
      description: "Traditional haircut with precision trimming and styling"
    },
    {
      id: 2,
      name: "Beard Trim",
      price: "$20",
      duration: "20 mins",
      image: "images.unsplash.com/photo-1621605815971-fbc98d665033",
      description: "Professional beard grooming and shaping"
    },
    {
      id: 3,
      name: "Hot Towel Shave",
      price: "$35",
      duration: "45 mins",
      image: "images.unsplash.com/photo-1503951914875-452162b0f3f1",
      description: "Luxurious traditional hot towel shave experience"
    }
  ];
  
 export const INITIAL_APPOINTMENTS: Appointment[] = [
    {
      id: 1,
      service: "Classic Haircut",
      date: "2024-02-20",
      time: "10:00 AM",
      status: "Upcoming",
      clientName: "John Doe",
      clientEmail: "john@example.com"
    },
    {
      id: 2,
      service: "Beard Trim",
      date: "2024-02-18",
      time: "2:30 PM",
      status: "Completed",
      clientName: "Mike Smith",
      clientEmail: "mike@example.com"
    }
  ];
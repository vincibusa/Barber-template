import React, { useState, FormEvent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StaffMember, Service, Appointment } from "./types";
import Navigation from "./components/Navigation";
import HomePage from "./Pages/HomePage";
import BookingPage from "./Pages/BookingPage";
import Dashboard from "./Pages/Dashboard";
import AddStaffModal from "./components/AddStaffModal";
import AddServiceModal from "./components/AddServiceModal";

const App: React.FC = () => {
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    name: "",
    email: "",
    role: "",
    experience: "",
  });
  const [newService, setNewService] = useState<Partial<Service>>({
    name: "",
    price: "",
    duration: "",
    description: "",
  });
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@barber.com",
      role: "Senior Barber",
      experience: "5 years",
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      service: "Classic Haircut",
      date: "2024-02-20",
      time: "10:00 AM",
      status: "Upcoming",
      clientName: "John Doe",
      clientEmail: "john@example.com",
    },
    {
      id: 2,
      service: "Beard Trim",
      date: "2024-02-18",
      time: "2:30 PM",
      status: "Completed",
      clientName: "Mike Smith",
      clientEmail: "mike@example.com",
    },
  ]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Classic Haircut",
      price: "$30",
      duration: "30 mins",
      image: "images.unsplash.com/photo-1585747860715-2ba37e788b70",
      description: "Traditional haircut with precision trimming and styling",
    },
    {
      id: 2,
      name: "Beard Trim",
      price: "$20",
      duration: "20 mins",
      image: "images.unsplash.com/photo-1621605815971-fbc98d665033",
      description: "Professional beard grooming and shaping",
    },
    {
      id: 3,
      name: "Hot Towel Shave",
      price: "$35",
      duration: "45 mins",
      image: "images.unsplash.com/photo-1503951914875-452162b0f3f1",
      description: "Luxurious traditional hot towel shave experience",
    },
  ]);

  const handleAddStaff = (e: FormEvent) => {
    e.preventDefault();
    const newStaffMember = {
      id: staff.length + 1,
      ...newStaff,
    } as StaffMember;
    setStaff([...staff, newStaffMember]);
    setNewStaff({ name: "", email: "", role: "", experience: "" });
    setShowAddStaffModal(false);
  };

  const handleAddService = (e: FormEvent) => {
    e.preventDefault();
    const newServiceItem = {
      id: services.length + 1,
      ...newService,
      image: "images.unsplash.com/photo-1585747860715-2ba37e788b70",
    } as Service;
    setServices([...services, newServiceItem]);
    setNewService({ name: "", price: "", duration: "", description: "" });
    setShowAddServiceModal(false);
  };

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  const handleUpdateAppointment = (e: FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      const updatedAppointments = appointments.map((app) =>
        app.id === editingAppointment.id ? editingAppointment : app
      );
      setAppointments(updatedAppointments);
      setEditingAppointment(null);
    }
  };

  return (
    <Router>
      <div className="relative">
        <Navigation />
        {showAddStaffModal && (
          <AddStaffModal
            onClose={() => setShowAddStaffModal(false)}
            onAddStaff={handleAddStaff}
            newStaff={newStaff}
            setNewStaff={setNewStaff}
          />
        )}
        {showAddServiceModal && (
          <AddServiceModal
            onClose={() => setShowAddServiceModal(false)}
            onAddService={handleAddService}
            newService={newService}
            setNewService={setNewService}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage services={services} />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                services={services}
                selectedService={""}
                setSelectedService={() => {}}
                selectedDate={""}
                setSelectedDate={() => {}}
                selectedTime={""}
                setSelectedTime={() => {}}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Dashboard
                isAdmin={true}
                staff={staff}
                onAddStaff={() => setShowAddStaffModal(true)}
                services={services}
                onAddService={() => setShowAddServiceModal(true)}
                appointments={appointments}
                onDeleteAppointment={handleDeleteAppointment}
                onEditAppointment={handleEditAppointment}
                editingAppointment={editingAppointment}
                onUpdateAppointment={handleUpdateAppointment}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
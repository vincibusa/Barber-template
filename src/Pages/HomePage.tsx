import React from "react";
import { Service } from "../types";

interface HomePageProps {
  services: Service[];
}

const HomePage: React.FC<HomePageProps> = ({ services }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to BarberBook Pro</h1>
          <p className="text-gray-600 mb-8">Experience premium grooming services with our expert barbers</p>
          <a href="/booking" className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-300">
            Book Appointment
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 my-12">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={`https://${service.image}`}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-900 font-bold">{service.price}</span>
                  <span className="text-gray-500">{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React, { useState, useMemo } from "react";
import { FaSearch, FaShare } from "react-icons/fa";


interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
  icon: JSX.Element;
}

interface BarberServicesProps {
  services: Service[];
}

const BarberServices: React.FC<BarberServicesProps> = ({ services }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(services.map(s => s.category)));
    return ["all", ...uniqueCategories];
  }, [services]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleShare = (service: Service) => {
    // Implement share functionality
    console.log(`Sharing ${service.title}`);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-8 space-y-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="mb-4 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <img
                src={service.image.startsWith("http") ? service.image : `https://${service.image}`}
                alt={service.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3";
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="mb-2 rounded-full bg-blue-100 p-2 text-blue-500">
                {service.icon}
              </div>
              <button
                onClick={() => handleShare(service)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label={`Share ${service.title}`}
              >
                <FaShare />
              </button>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="mb-4 text-gray-600">{service.description}</p>
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-bold text-blue-500">
                {service.price}
              </span>
              <span className="text-sm text-gray-500">{service.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberServices;
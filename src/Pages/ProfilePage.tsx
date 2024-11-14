import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiImage,
} from "react-icons/fi";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

interface Booking {
  id: number;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "past";
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
  );
  const [formData, setFormData] = useState<FormData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, Country",
    bio: "Passionate about technology and innovation. Software developer with 5+ years of experience.",
  });

  const bookings: Booking[] = [
    {
      id: 1,
      service: "Business Consultation",
      date: "2024-02-15",
      time: "10:00 AM",
      status: "upcoming",
    },
    {
      id: 2,
      service: "Project Review",
      date: "2024-02-10",
      time: "2:00 PM",
      status: "upcoming",
    },
    {
      id: 3,
      service: "Strategy Meeting",
      date: "2024-01-28",
      time: "11:30 AM",
      status: "past",
    },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    // Implement further submission logic (e.g., API call)
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6"
          role="form"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/200";
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                >
                  <FiImage className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/200";
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {formData.name}
                </h1>
                <p className="text-gray-600">{formData.bio}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:text-blue-800"
            >
              <FiEdit2 className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-600">
              <FiMail className="w-5 h-5" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FiPhone className="w-5 h-5" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FiMapPin className="w-5 h-5" />
              <span>{formData.address}</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Booking History</h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`p-4 rounded-lg ${
                booking.status === "upcoming" ? "bg-blue-50" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  {booking.service}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    booking.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="mt-2 flex space-x-4 text-gray-600">
                <div className="flex items-center">
                  <FiCalendar className="w-4 h-4 mr-1" />
                  {booking.date}
                </div>
                <div className="flex items-center">
                  <FiClock className="w-4 h-4 mr-1" />
                  {booking.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
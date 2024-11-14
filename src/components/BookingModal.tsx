import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaCalendar, FaUser, FaPhone, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: string[];
  onSubmit: (data: FormData) => void;
}

interface FormData {
  service: string;
  datetime: Date | null;
  name: string;
  phone: string;
}

interface FormErrors {
  service?: string;
  datetime?: string;
  name?: string;
  phone?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    service: "",
    datetime: null,
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      handleSubmitForm();
    }
  }, [errors,  isSubmitting]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.service) {
      newErrors.service = "Please select a service";
    }
    if (!formData.datetime) {
      newErrors.datetime = "Please select date and time";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    return newErrors;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      datetime: date,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validateForm();
    setErrors(validationErrors);
  };

  const handleSubmitForm = () => {
    if (formData.datetime) {
      onSubmit(formData);
      setFormData({
        service: "",
        datetime: null,
        name: "",
        phone: "",
      });
      setIsSubmitting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative max-w-md w-full mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close booking modal"
        >
          <FaTimes className="h-6 w-6" />
        </button>

        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Book Your Appointment
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill in the details below to schedule your service
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700"
              >
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-200 ${
                  errors.service ? "border-red-500" : "border"
                }`}
                aria-label="Select service"
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-red-500">{errors.service}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="datetime"
                className="block text-sm font-medium text-gray-700"
              >
                Date and Time
              </label>
              <div className="mt-1 relative">
                <DatePicker
                  selected={formData.datetime}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-200 ${
                    errors.datetime ? "border-red-500" : "border"
                  }`}
                  minDate={new Date()}
                  aria-label="Select date and time"
                />
                <FaCalendar className="absolute right-3 top-3 text-gray-400" />
              </div>
              {errors.datetime && (
                <p className="mt-1 text-sm text-red-500">{errors.datetime}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-200 ${
                    errors.name ? "border-red-500" : "border"
                  }`}
                  placeholder="John Doe"
                  aria-label="Enter your full name"
                />
                <FaUser className="absolute right-3 top-3 text-gray-400" />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md transition-all duration-200 ${
                    errors.phone ? "border-red-500" : "border"
                  }`}
                  placeholder="1234567890"
                  aria-label="Enter your phone number"
                />
                <FaPhone className="absolute right-3 top-3 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
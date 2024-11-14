import React, { FormEvent } from "react";
import { FiX } from "react-icons/fi";
import { Service } from "../types";

interface AddServiceModalProps {
  onClose: () => void;
  onAddService: (e: FormEvent) => void;
  newService: Partial<Service>;
  setNewService: React.Dispatch<React.SetStateAction<Partial<Service>>>;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ onClose, onAddService, newService, setNewService }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add New Service</h3>
          <button onClick={onClose} className="text-gray-500">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={onAddService} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Service Name</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="text"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={newService.duration}
              onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800">
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
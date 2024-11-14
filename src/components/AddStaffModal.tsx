import React, { FormEvent } from "react";
import { FiX } from "react-icons/fi";
import { StaffMember } from "../types";

interface AddStaffModalProps {
  onClose: () => void;
  onAddStaff: (e: FormEvent) => void;
  newStaff: Partial<StaffMember>;
  setNewStaff: React.Dispatch<React.SetStateAction<Partial<StaffMember>>>;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ onClose, onAddStaff, newStaff, setNewStaff }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Add New Staff Member</h3>
          <button onClick={onClose} className="text-gray-500">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={onAddStaff} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <input
              type="text"
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Experience</label>
            <input
              type="text"
              value={newStaff.experience}
              onChange={(e) => setNewStaff({ ...newStaff, experience: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800">
            Add Staff Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
import React, { FormEvent } from "react";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { StaffMember, Service, Appointment } from "../types";

interface DashboardProps {
  isAdmin: boolean;
  staff: StaffMember[];
  onAddStaff: () => void;
  services: Service[];
  onAddService: () => void;
  appointments: Appointment[];
  onDeleteAppointment: (id: number) => void;
  onEditAppointment: (appointment: Appointment) => void;
  editingAppointment: Appointment | null;
  onUpdateAppointment: (e: FormEvent) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  isAdmin,
  staff,
  onAddStaff,
  services,
  onAddService,
  appointments,
  onDeleteAppointment,
  onEditAppointment,
  editingAppointment,
  onUpdateAppointment,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          {isAdmin ? "Admin Dashboard" : "My Dashboard"}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Staff Members</h3>
              <button
                onClick={onAddStaff}
                className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800"
              >
                <FiPlus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {staff.map((member) => (
                <div key={member.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-gray-600">{member.role}</p>
                  <p className="text-gray-600">{member.email}</p>
                  <p className="text-gray-600">Experience: {member.experience}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-900">Services</h3>
              <button
                onClick={onAddService}
                className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800"
              >
                <FiPlus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="font-semibold">{service.name}</p>
                  <p className="text-gray-600">{service.price} - {service.duration}</p>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Manage Appointments</h3>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border-b border-gray-200 pb-4 last:border-0">
                  {editingAppointment && editingAppointment.id === appointment.id ? (
                    <form onSubmit={onUpdateAppointment} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Service</label>
                        <select
                          value={editingAppointment.service}
                     
                          className="w-full p-2 border rounded"
                          required
                        >
                          {services.map((service) => (
                            <option key={service.id} value={service.name}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Date</label>
                        <input
                          type="date"
                          value={editingAppointment.date}
                         
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Time</label>
                        <input
                          type="time"
                          value={editingAppointment.time}
                       
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {}}
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{appointment.service}</p>
                        <p className="text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className="text-gray-600">
                          Client: {appointment.clientName}
                        </p>
                        <p className="text-gray-600">
                          Email: {appointment.clientEmail}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEditAppointment(appointment)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit size={20} />
                        </button>
                        <button
                          onClick={() => onDeleteAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
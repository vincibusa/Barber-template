export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  experience: string;
}

export interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  image: string;
  description: string;
}

export interface Appointment {
  id: number;
  service: string;
  date: string;
  time: string;
  status: string;
  clientName: string;
  clientEmail: string;
}
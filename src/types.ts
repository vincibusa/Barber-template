// types.ts
import { ReactNode } from 'react';

export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
  icon: ReactNode;
}

export interface BarberServicesProps {
  initialServices?: Service[];
  fallbackImage?: string;
  containerClassName?: string;
}
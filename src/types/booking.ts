export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  fullName: string;
  phone: string;
  email: string;
  specialRequests?: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Room {
  id: string;
  name: string;
  type: 'standard' | 'deluxe' | 'suite';
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
  description: string;
  isAvailable: boolean;
  floor: number;
  roomNumber: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  response?: string;
}

interface HotelContextType {
  rooms: Room[];
  bookings: Booking[];
  contactMessages: ContactMessage[];
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  addBooking: (booking: any) => void;
  updateBooking: (id: string, booking: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateContactMessage: (id: string, message: Partial<ContactMessage>) => void;
  getAvailableRooms: (checkIn: string, checkOut: string) => Room[];
  getDashboardStats: () => {
    totalRooms: number;
    totalBookings: number;
    totalRevenue: number;
    occupancyRate: number;
    recentBookings: Booking[];
  };
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

const initialRooms: Room[] = [
  {
    id: '1',
    name: 'Standard Room',
    type: 'standard',
    price: 150,
    capacity: 2,
    amenities: ['WiFi', 'TV', 'AC', 'Private Bathroom'],
    images: ['/src/assets/standard-room.jpg'],
    description: 'Comfortable standard room with all essential amenities',
    isAvailable: true,
    floor: 2,
    roomNumber: '201'
  },
  {
    id: '2',
    name: 'Deluxe Room',
    type: 'deluxe',
    price: 250,
    capacity: 3,
    amenities: ['WiFi', 'Smart TV', 'AC', 'Mini Bar', 'City View', 'Room Service'],
    images: ['/src/assets/deluxe-room.jpg'],
    description: 'Spacious deluxe room with premium amenities and city view',
    isAvailable: true,
    floor: 5,
    roomNumber: '505'
  },
  {
    id: '3',
    name: 'Executive Suite',
    type: 'suite',
    price: 450,
    capacity: 4,
    amenities: ['WiFi', 'Smart TV', 'AC', 'Mini Bar', 'Ocean View', 'Room Service', 'Balcony', 'Jacuzzi'],
    images: ['/src/assets/suite-room.jpg'],
    description: 'Luxurious suite with separate living area, premium amenities and stunning ocean view',
    isAvailable: true,
    floor: 10,
    roomNumber: '1001'
  }
];

const initialBookings: Booking[] = [
  {
    id: '1',
    customerId: '3',
    customerName: 'John Customer',
    customerEmail: 'customer@hotel.com',
    roomId: '2',
    roomName: 'Deluxe Room',
    checkIn: '2024-07-20',
    checkOut: '2024-07-22',
    guests: 2,
    totalAmount: 500,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-07-15T10:00:00Z'
  }
];

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const savedRooms = localStorage.getItem('hotelRooms');
    const savedBookings = localStorage.getItem('hotelBookings');
    const savedMessages = localStorage.getItem('hotelMessages');

    setRooms(savedRooms ? JSON.parse(savedRooms) : initialRooms);
    setBookings(savedBookings ? JSON.parse(savedBookings) : initialBookings);
    setContactMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem('hotelRooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hotelBookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hotelMessages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  const addRoom = (room: Omit<Room, 'id'>) => {
    const newRoom = { ...room, id: Date.now().toString() };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (id: string, roomUpdate: Partial<Room>) => {
    setRooms(prev => prev.map(room => room.id === id ? { ...room, ...roomUpdate } : room));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(room => room.id !== id));
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const addBooking = (booking: any) => {
    setBookings(prev => [...prev, booking]);
  };

  const updateBooking = (id: string, bookingUpdate: Partial<Booking>) => {
    setBookings(prev => prev.map(booking => booking.id === id ? { ...booking, ...bookingUpdate } : booking));
  };

  const cancelBooking = (id: string) => {
    updateBooking(id, { status: 'cancelled', paymentStatus: 'refunded' });
  };

  const addContactMessage = (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'open' as const
    };
    setContactMessages(prev => [...prev, newMessage]);
  };

  const updateContactMessage = (id: string, messageUpdate: Partial<ContactMessage>) => {
    setContactMessages(prev => prev.map(msg => msg.id === id ? { ...msg, ...messageUpdate } : msg));
  };

  const getAvailableRooms = (checkIn: string, checkOut: string) => {
    return rooms.filter(room => {
      if (!room.isAvailable) return false;
      
      const hasConflictingBooking = bookings.some(booking => {
        if (booking.roomId !== room.id || booking.status === 'cancelled') return false;
        
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);
        const requestStart = new Date(checkIn);
        const requestEnd = new Date(checkOut);
        
        return (requestStart < bookingEnd && requestEnd > bookingStart);
      });
      
      return !hasConflictingBooking;
    });
  };

  const getDashboardStats = () => {
    const totalRooms = rooms.length;
    const totalBookings = bookings.filter(b => b.status !== 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalAmount, 0);
    
    const occupiedRooms = bookings.filter(b => 
      b.status === 'checked-in' || 
      (b.status === 'confirmed' && new Date(b.checkIn) <= new Date() && new Date(b.checkOut) > new Date())
    ).length;
    
    const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;
    const recentBookings = bookings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return {
      totalRooms,
      totalBookings,
      totalRevenue,
      occupancyRate,
      recentBookings
    };
  };

  return (
    <HotelContext.Provider value={{
      rooms,
      bookings,
      contactMessages,
      addRoom,
      updateRoom,
      deleteRoom,
      createBooking,
      addBooking,
      updateBooking,
      cancelBooking,
      addContactMessage,
      updateContactMessage,
      getAvailableRooms,
      getDashboardStats
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
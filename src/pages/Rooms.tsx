import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Users, Bed, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHotel } from '@/contexts/HotelContext';
import standardRoom from '@/assets/standard-room.jpg';
import deluxeRoom from '@/assets/deluxe-room.jpg';
import suiteRoom from '@/assets/suite-room.jpg';

interface BookingData {
  roomId: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  specialRequests: string;
}

export const Rooms = () => {
  const { user } = useAuth();
  const { addBooking } = useHotel();
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<BookingData>({
    roomId: '',
    guestName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    specialRequests: ''
  });

  const rooms = [
    {
      id: '1',
      image: standardRoom,
      title: 'Standard Room',
      price: 150,
      description: 'Comfortable accommodation with essential amenities',
      features: ['Free WiFi', 'TV', 'AC', 'Private Bathroom'],
      maxGuests: 2,
      bedType: 'Queen Bed',
      size: '25 sqm'
    },
    {
      id: '2',
      image: deluxeRoom,
      title: 'Deluxe Room',
      price: 250,
      description: 'Spacious room with premium amenities and city view',
      features: ['Free WiFi', 'Smart TV', 'Mini Bar', 'City View'],
      maxGuests: 3,
      bedType: 'King Bed',
      size: '35 sqm'
    },
    {
      id: '3',
      image: suiteRoom,
      title: 'Executive Suite',
      price: 450,
      description: 'Luxurious suite with separate living area',
      features: ['Free WiFi', 'Living Area', 'Ocean View', 'Balcony'],
      maxGuests: 4,
      bedType: 'King Bed + Sofa',
      size: '60 sqm'
    },
    {
      id: '4',
      image: standardRoom,
      title: 'Family Room',
      price: 320,
      description: 'Perfect for families with connecting rooms',
      features: ['Free WiFi', 'Two Bedrooms', 'Kitchenette', 'Family Area'],
      maxGuests: 6,
      bedType: '2 Queen Beds',
      size: '45 sqm'
    },
    {
      id: '5',
      image: deluxeRoom,
      title: 'Business Suite',
      price: 380,
      description: 'Ideal for business travelers with work area',
      features: ['Free WiFi', 'Work Desk', 'Meeting Area', 'City View'],
      maxGuests: 2,
      bedType: 'King Bed',
      size: '40 sqm'
    },
    {
      id: '6',
      image: suiteRoom,
      title: 'Presidential Suite',
      price: 750,
      description: 'Ultimate luxury with panoramic views',
      features: ['Free WiFi', 'Butler Service', 'Jacuzzi', 'Panoramic View'],
      maxGuests: 4,
      bedType: 'King Bed + Sofa',
      size: '80 sqm'
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a booking.",
        variant: "destructive"
      });
      return;
    }

    const room = rooms.find(r => r.id === bookingData.roomId);
    if (!room) return;

    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: user.id,
      customerName: bookingData.guestName,
      customerEmail: bookingData.email,
      roomId: bookingData.roomId,
      roomName: room.title,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: parseInt(bookingData.guests),
      totalAmount: room.price,
      status: 'confirmed' as const,
      paymentStatus: 'paid' as const,
      specialRequests: bookingData.specialRequests,
      createdAt: new Date().toISOString()
    };

    addBooking(booking);
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${room.title} has been confirmed.`,
    });

    // Reset form
    setBookingData({
      roomId: '',
      guestName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: '1',
      specialRequests: ''
    });
    setSelectedRoom(null);
  };

  const openBookingDialog = (roomId: string) => {
    setSelectedRoom(roomId);
    setBookingData(prev => ({ ...prev, roomId }));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our range of beautifully appointed rooms and suites, each designed for comfort and luxury
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Card key={room.id} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground">
                    ${room.price}/night
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{room.title}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{room.bedType}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Room size: {room.size}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-6">
                  {room.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-hero hover:shadow-luxury transition-all duration-300"
                      onClick={() => openBookingDialog(room.id)}
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Book {room.title}</DialogTitle>
                      <DialogDescription>
                        Fill in your details to complete your booking
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="guestName">Full Name</Label>
                          <Input
                            id="guestName"
                            value={bookingData.guestName}
                            onChange={(e) => setBookingData(prev => ({ ...prev, guestName: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={bookingData.phone}
                          onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="checkIn">Check-in Date</Label>
                          <Input
                            id="checkIn"
                            type="date"
                            value={bookingData.checkIn}
                            onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="checkOut">Check-out Date</Label>
                          <Input
                            id="checkOut"
                            type="date"
                            value={bookingData.checkOut}
                            onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select value={bookingData.guests} onValueChange={(value) => setBookingData(prev => ({ ...prev, guests: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: room.maxGuests }, (_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                        <Textarea
                          id="specialRequests"
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                          placeholder="Any special requests or requirements..."
                        />
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total per night:</span>
                          <span className="text-primary">${room.price}</span>
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full bg-gradient-hero hover:shadow-luxury">
                        Confirm Booking
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
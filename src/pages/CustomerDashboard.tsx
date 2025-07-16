import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHotel } from '@/contexts/HotelContext';

export const CustomerDashboard = () => {
  const { user } = useAuth();
  const { bookings, updateBooking, cancelBooking } = useHotel();
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modifyData, setModifyData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
    specialRequests: ''
  });

  const userBookings = bookings.filter(booking => booking.customerId === user?.id);
  const activeBookings = userBookings.filter(booking => booking.status !== 'cancelled');
  const upcomingBookings = userBookings.filter(booking => 
    new Date(booking.checkIn) > new Date() && booking.status !== 'cancelled'
  );
  const pastBookings = userBookings.filter(booking => 
    new Date(booking.checkOut) < new Date() && booking.status !== 'cancelled'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'checked-in': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'checked-out': return 'bg-gray-500/10 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const handleModifyBooking = (booking: any) => {
    setSelectedBooking(booking);
    setModifyData({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests.toString(),
      specialRequests: booking.specialRequests || ''
    });
  };

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    updateBooking(selectedBooking.id, {
      checkIn: modifyData.checkIn,
      checkOut: modifyData.checkOut,
      guests: parseInt(modifyData.guests),
      specialRequests: modifyData.specialRequests
    });

    toast({
      title: "Booking Updated",
      description: "Your booking has been successfully modified.",
    });

    setSelectedBooking(null);
  };

  const handleCancelBooking = (bookingId: string, roomName: string) => {
    if (confirm(`Are you sure you want to cancel your booking for ${roomName}? This action cannot be undone.`)) {
      cancelBooking(bookingId);
      
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled and a refund will be processed.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">Manage your reservations and account settings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeBookings.length}</div>
              <p className="text-xs text-muted-foreground">Active reservations</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Stays</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingBookings.length}</div>
              <p className="text-xs text-muted-foreground">Confirmed reservations</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nights Stayed</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pastBookings.reduce((total, booking) => {
                  const checkIn = new Date(booking.checkIn);
                  const checkOut = new Date(booking.checkOut);
                  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
                  return total + nights;
                }, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Total nights</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Reservations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-lg">{booking.roomName}</CardTitle>
                      <Badge className={`w-fit ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </Badge>
                    </div>
                    <CardDescription>Booking ID: {booking.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.guests} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">${booking.totalAmount}/night</span>
                      </div>
                    </div>
                    {booking.specialRequests && (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Special Requests:</p>
                        <p className="text-sm">{booking.specialRequests}</p>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleModifyBooking(booking)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Modify Booking
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modify Booking</DialogTitle>
                            <DialogDescription>
                              Update your booking details for {booking.roomName}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <form onSubmit={handleModifySubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="modifyCheckIn">Check-in Date</Label>
                                <Input
                                  id="modifyCheckIn"
                                  type="date"
                                  value={modifyData.checkIn}
                                  onChange={(e) => setModifyData(prev => ({ ...prev, checkIn: e.target.value }))}
                                  min={new Date().toISOString().split('T')[0]}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="modifyCheckOut">Check-out Date</Label>
                                <Input
                                  id="modifyCheckOut"
                                  type="date"
                                  value={modifyData.checkOut}
                                  onChange={(e) => setModifyData(prev => ({ ...prev, checkOut: e.target.value }))}
                                  min={modifyData.checkIn || new Date().toISOString().split('T')[0]}
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="modifyGuests">Number of Guests</Label>
                              <Select 
                                value={modifyData.guests} 
                                onValueChange={(value) => setModifyData(prev => ({ ...prev, guests: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 6 }, (_, i) => (
                                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                                      {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label htmlFor="modifySpecialRequests">Special Requests</Label>
                              <Textarea
                                id="modifySpecialRequests"
                                value={modifyData.specialRequests}
                                onChange={(e) => setModifyData(prev => ({ ...prev, specialRequests: e.target.value }))}
                                placeholder="Any special requests or requirements..."
                              />
                            </div>
                            
                            <div className="bg-muted p-4 rounded-lg">
                              <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total per night:</span>
                                <span className="text-primary">${booking.totalAmount}</span>
                              </div>
                            </div>
                            
                            <Button type="submit" className="w-full bg-gradient-hero hover:shadow-luxury">
                              Update Booking
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleCancelBooking(booking.id, booking.roomName)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pastBookings.slice(0, 6).map((booking) => (
                <Card key={booking.id} className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{booking.roomName}</CardTitle>
                      <Badge className={`${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <span>{booking.guests} guests</span>
                      <span className="font-semibold">${booking.totalAmount}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <Card className="hover:shadow-elegant transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Need Assistance?</CardTitle>
            <CardDescription>Our team is here to help with any questions or special requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">support@grandhotel.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Available</p>
                  <p className="text-sm text-muted-foreground">24/7 Support</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
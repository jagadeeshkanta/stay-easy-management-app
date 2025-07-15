import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, CheckCircle, Clock, AlertTriangle, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHotel } from '@/contexts/HotelContext';

export const StaffDashboard = () => {
  const { user } = useAuth();
  const { bookings, rooms } = useHotel();

  const todayCheckIns = bookings.filter(booking => 
    new Date(booking.checkIn).toDateString() === new Date().toDateString() &&
    booking.status === 'confirmed'
  );

  const todayCheckOuts = bookings.filter(booking => 
    new Date(booking.checkOut).toDateString() === new Date().toDateString() &&
    booking.status === 'checked-in'
  );

  const currentGuests = bookings.filter(booking => 
    booking.status === 'checked-in' ||
    (booking.status === 'confirmed' && 
     new Date(booking.checkIn) <= new Date() && 
     new Date(booking.checkOut) > new Date())
  );

  const availableRooms = rooms.filter(room => room.isAvailable);
  const occupiedRooms = rooms.filter(room => !room.isAvailable);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'checked-in': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'checked-out': return 'bg-gray-500/10 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground mt-2">Good day, {user?.name}! Here's today's overview.</p>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayCheckIns.length}</div>
              <p className="text-xs text-muted-foreground">Arrivals expected</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-outs Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayCheckOuts.length}</div>
              <p className="text-xs text-muted-foreground">Departures expected</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Guests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentGuests.length}</div>
              <p className="text-xs text-muted-foreground">Active bookings</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableRooms.length}</div>
              <p className="text-xs text-muted-foreground">Ready for booking</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Check-ins */}
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Today's Arrivals
              </CardTitle>
              <CardDescription>Guests checking in today</CardDescription>
            </CardHeader>
            <CardContent>
              {todayCheckIns.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No check-ins scheduled for today</p>
              ) : (
                <div className="space-y-4">
                  {todayCheckIns.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{booking.customerName}</p>
                          <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{booking.roomName}</p>
                        <p className="text-xs text-muted-foreground">{booking.guests} guests</p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button size="sm" className="bg-gradient-hero">
                          Check In
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Today's Check-outs */}
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Departures
              </CardTitle>
              <CardDescription>Guests checking out today</CardDescription>
            </CardHeader>
            <CardContent>
              {todayCheckOuts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No check-outs scheduled for today</p>
              ) : (
                <div className="space-y-4">
                  {todayCheckOuts.map((booking) => (
                    <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium truncate">{booking.customerName}</p>
                          <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{booking.roomName}</p>
                        <p className="text-xs text-muted-foreground">{booking.guests} guests</p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button size="sm" variant="outline">
                          Check Out
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Room Status Overview */}
        <div className="mt-8">
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Room Status Overview</CardTitle>
              <CardDescription>Current status of all rooms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <div key={room.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Room {room.roomNumber}</h3>
                      {room.isAvailable ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{room.name}</p>
                    <Badge variant={room.isAvailable ? "default" : "destructive"} className="text-xs">
                      {room.isAvailable ? "Available" : "Occupied"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="bg-gradient-hero hover:shadow-luxury transition-all duration-300">
                  New Walk-in
                </Button>
                <Button variant="outline">
                  Room Maintenance
                </Button>
                <Button variant="outline">
                  Guest Services
                </Button>
                <Button variant="outline">
                  Housekeeping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
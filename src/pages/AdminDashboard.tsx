import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHotel } from '@/contexts/HotelContext';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { getDashboardStats, bookings, rooms, contactMessages } = useHotel();
  const stats = getDashboardStats();

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const pendingMessages = contactMessages.filter(msg => msg.status === 'open').length;

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
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user?.name}. Here's your hotel overview.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRooms}</div>
              <p className="text-xs text-muted-foreground">Available properties</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">Active reservations</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.occupancyRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Current occupancy</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Recent Bookings</CardTitle>
              <CardDescription>Latest reservations and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium truncate">{booking.customerName}</p>
                        <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{booking.roomName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <p className="font-semibold">${booking.totalAmount}</p>
                      <p className="text-xs text-muted-foreground">{booking.guests} guests</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Room Status */}
          <Card className="hover:shadow-elegant transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl">Room Management</CardTitle>
              <CardDescription>Current room availability and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rooms.slice(0, 6).map((room) => (
                  <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{room.name}</p>
                        {room.isAvailable ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Floor {room.floor} • Room {room.roomNumber} • {room.capacity} guests
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${room.price}/night</p>
                      <Badge variant={room.isAvailable ? "default" : "destructive"} className="text-xs">
                        {room.isAvailable ? "Available" : "Occupied"}
                      </Badge>
                    </div>
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
              <CardDescription>Manage your hotel operations efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="bg-gradient-hero hover:shadow-luxury transition-all duration-300">
                  Add New Room
                </Button>
                <Button variant="outline">
                  View All Bookings
                </Button>
                <Button variant="outline">
                  <div className="flex items-center gap-2">
                    <span>Messages</span>
                    {pendingMessages > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {pendingMessages}
                      </Badge>
                    )}
                  </div>
                </Button>
                <Button variant="outline">
                  Generate Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
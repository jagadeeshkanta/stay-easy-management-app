import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Hotel, 
  Wifi, 
  Car, 
  Coffee, 
  Utensils, 
  Dumbbell, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle
} from 'lucide-react';
import hotelLobby from '@/assets/hotel-lobby.jpg';
import deluxeRoom from '@/assets/deluxe-room.jpg';
import suiteRoom from '@/assets/suite-room.jpg';
import standardRoom from '@/assets/standard-room.jpg';

export const Home = () => {
  const features = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout the hotel' },
    { icon: Car, title: 'Valet Parking', description: 'Complimentary parking for all guests' },
    { icon: Coffee, title: '24/7 Room Service', description: 'Delicious meals delivered to your room' },
    { icon: Utensils, title: 'Fine Dining', description: 'Award-winning restaurant on-site' },
    { icon: Dumbbell, title: 'Fitness Center', description: 'State-of-the-art gym facilities' },
    { icon: Hotel, title: 'Concierge Service', description: 'Personalized assistance for your stay' },
  ];

  const roomTypes = [
    {
      image: standardRoom,
      title: 'Standard Room',
      price: '$150',
      description: 'Comfortable accommodation with essential amenities',
      features: ['Free WiFi', 'TV', 'AC', 'Private Bathroom']
    },
    {
      image: deluxeRoom,
      title: 'Deluxe Room',
      price: '$250',
      description: 'Spacious room with premium amenities and city view',
      features: ['Free WiFi', 'Smart TV', 'Mini Bar', 'City View']
    },
    {
      image: suiteRoom,
      title: 'Executive Suite',
      price: '$450',
      description: 'Luxurious suite with separate living area',
      features: ['Free WiFi', 'Living Area', 'Ocean View', 'Balcony']
    }
  ];

  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Exceptional service and beautiful rooms. The staff went above and beyond to make our stay memorable.',
      date: '2 days ago'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Perfect location and amazing amenities. The hotel restaurant serves the best food in the city.',
      date: '1 week ago'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      comment: 'Luxurious experience from check-in to check-out. Will definitely be returning for future visits.',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src={hotelLobby} 
          alt="Hotel Lobby" 
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          onClick={() => window.location.href = '/rooms'}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-accent">GrandHotel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Experience luxury, comfort, and exceptional service in the heart of the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" asChild className="bg-accent hover:bg-accent-light text-accent-foreground text-lg px-8 py-3">
              <Link to="/rooms">Book Your Stay</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-3">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Exceptional Amenities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover world-class facilities and services designed to make your stay unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-gradient-hero p-4 rounded-full w-fit mb-4 group-hover:shadow-luxury transition-shadow">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Premium Rooms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our carefully designed rooms and suites, each offering unique comforts and stunning views
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => window.location.href = '/rooms'}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {room.price}/night
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-hero hover:shadow-luxury transition-all duration-300">
              <Link to="/rooms">View All Rooms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What Our Guests Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read testimonials from our satisfied guests who have experienced the GrandHotel difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Experience Luxury?</h2>
            <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
              Book your stay today and discover why GrandHotel is the preferred choice for discerning travelers
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="opacity-90">123 Luxury Ave, Downtown</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="opacity-90">+1 (555) 123-4567</p>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="opacity-90">info@grandhotel.com</p>
              </div>
            </div>

            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
              <Link to="/rooms">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
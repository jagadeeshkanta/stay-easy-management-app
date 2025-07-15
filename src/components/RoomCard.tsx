import React from 'react';
import { Room } from '@/contexts/HotelContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Wifi, Tv, Car, Coffee } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onBook?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onDelete?: (roomId: string) => void;
  showActions?: boolean;
}

const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();
  if (lower.includes('wifi')) return <Wifi className="h-4 w-4" />;
  if (lower.includes('tv')) return <Tv className="h-4 w-4" />;
  if (lower.includes('parking')) return <Car className="h-4 w-4" />;
  if (lower.includes('coffee') || lower.includes('bar')) return <Coffee className="h-4 w-4" />;
  return null;
};

const getRoomTypeColor = (type: Room['type']) => {
  switch (type) {
    case 'standard':
      return 'bg-muted text-muted-foreground';
    case 'deluxe':
      return 'bg-primary/10 text-primary';
    case 'suite':
      return 'bg-accent/10 text-accent-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const RoomCard: React.FC<RoomCardProps> = ({ 
  room, 
  onBook, 
  onEdit, 
  onDelete, 
  showActions = false 
}) => {
  return (
    <Card className="overflow-hidden group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img 
          src={room.images[0]} 
          alt={room.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={getRoomTypeColor(room.type)}>
            {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant={room.isAvailable ? 'default' : 'destructive'}>
            {room.isAvailable ? 'Available' : 'Occupied'}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{room.name}</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${room.price}</div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-sm">Up to {room.capacity} guests</span>
          <span className="mx-2">•</span>
          <span className="text-sm">Room {room.roomNumber}</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4">{room.description}</p>
        
        <div className="space-y-2">
          <h4 className="font-semibold">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-sm bg-muted/50 px-2 py-1 rounded-md">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {onBook && room.isAvailable && (
          <Button 
            onClick={() => onBook(room)} 
            className="flex-1 bg-gradient-hero hover:shadow-luxury transition-all duration-300"
          >
            Book Now
          </Button>
        )}
        
        {showActions && (
          <>
            {onEdit && (
              <Button variant="outline" onClick={() => onEdit(room)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" onClick={() => onDelete(room.id)}>
                Delete
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};
import { motion } from "framer-motion";
import { Star, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Room } from "@/types/hotel";
import { AMENITIES } from "@/constants";

interface RoomCardProps {
  room: Room;
  index: number;
}

export default function RoomCard({ room, index }: RoomCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " so'm";
  };

  const getAmenityDetails = (amenityId: string) => {
    return AMENITIES.find((a) => a.id === amenityId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-blue-100 group">
        <div className="relative overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              {room.type}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{room.rating}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {room.description}
          </p>

          <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{room.roomCount} xona</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Markaziy</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {room.amenities.slice(0, 4).map((amenityId) => {
              const amenity = getAmenityDetails(amenityId);
              return amenity ? (
                <Badge
                  key={amenityId}
                  variant="secondary"
                  className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {amenity.icon} {amenity.label}
                </Badge>
              ) : null;
            })}
            {room.amenities.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{room.amenities.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(room.price)}
              </p>
              <p className="text-sm text-gray-600">kecha uchun</p>
            </div>
            <Link to="/booking">
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                Bron qilish
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

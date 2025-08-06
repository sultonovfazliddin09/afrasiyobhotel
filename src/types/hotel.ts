export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  amenities: string[];
  rating: number;
  roomCount: number;
  description: string;
}

export interface FilterState {
  star5: boolean;
  restaurant: boolean;
  balcony: boolean;
  sauna: boolean;
  fitness: boolean;
  shower: boolean;
  wifi: boolean;
  parking: boolean;
}
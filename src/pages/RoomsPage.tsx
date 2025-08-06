import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/shared/Sidebar";
import RoomGrid from "@/components/rooms/RoomGrid";
import { FilterState } from "@/types/hotel";
import { SAMPLE_ROOMS } from "@/data/rooms";

export default function RoomsPage() {
  const [filters, setFilters] = useState<FilterState>({
    star5: false,
    restaurant: false,
    balcony: false,
    sauna: false,
    fitness: false,
    shower: false,
    wifi: false,
    parking: false,
  });

  const handleFilterChange = (key: keyof FilterState, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredRooms = useMemo(() => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key, _]) => key);

    if (activeFilters.length === 0) {
      return SAMPLE_ROOMS;
    }

    return SAMPLE_ROOMS.filter((room) => {
      return activeFilters.every((filter) => room.amenities.includes(filter));
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Barcha Xonalar
          </h1>
          <p className="text-gray-600">
            O'zingizga mos xonani toping va ajoyib tajriba oling
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-shrink-0">
            <Sidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Mavjud xonalar
              </h2>
              <p className="text-gray-600">
                {filteredRooms.length} ta xona topildi
              </p>
            </motion.div>

            <RoomGrid rooms={filteredRooms} />
          </div>
        </div>
      </div>
    </div>
  );
}

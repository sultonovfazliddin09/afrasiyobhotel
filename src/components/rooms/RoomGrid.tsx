import { motion } from 'framer-motion';
import { Room } from '@/types/hotel';
import RoomCard from './RoomCard';

interface RoomGridProps {
  rooms: Room[];
}

export default function RoomGrid({ rooms }: RoomGridProps) {
  if (rooms.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">🏨</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Hech narsa topilmadi
        </h3>
        <p className="text-gray-600">
          Filtrlarni o'zgartirib ko'ring yoki boshqa parametrlar tanlang
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {rooms.map((room, index) => (
        <RoomCard key={room.id} room={room} index={index} />
      ))}
    </div>
  );
}
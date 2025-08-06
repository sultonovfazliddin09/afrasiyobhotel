import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import RoomGrid from "@/components/rooms/RoomGrid";
import { SAMPLE_ROOMS } from "@/data/rooms";

export default function HomePage() {
  const featuredRooms = SAMPLE_ROOMS.slice(0, 6);

  return (
    <div>
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Mashhur Xonalar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Eng yaxshi xonalarimizdan tanlov qiling va unutilmas tajriba oling
            </p>
          </motion.div>

          <RoomGrid rooms={featuredRooms} />
        </div>
      </section>
    </div>
  );
}

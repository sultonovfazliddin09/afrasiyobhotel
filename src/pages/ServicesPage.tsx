import { motion } from 'framer-motion';
import { Wifi, Car, Utensils, Dumbbell, Waves, Coffee, Shield, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: Wifi,
    title: 'Bepul WiFi',
    description: 'Barcha xonalarda va umumiy joylarda tezkor internet',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Car,
    title: 'Avtoturargoh',
    description: 'Xavfsiz va bepul avtoturargoh xizmati',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Utensils,
    title: 'Restoran',
    description: 'Milliy va xalqaro taomlar, 24/7 xizmat',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: Dumbbell,
    title: 'Fitnes Zal',
    description: 'Zamonaviy jihozlar bilan jihozlangan fitnes markaz',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Waves,
    title: 'Sauna & Spa',
    description: 'Dam olish va sog\'lomlashtirish xizmatlari',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Coffee,
    title: 'Qahvaxona',
    description: 'Ertalabki qahva va yengil taomlar',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Shield,
    title: 'Xavfsizlik',
    description: '24/7 xavfsizlik xizmati va kuzatuv tizimi',
    color: 'from-gray-500 to-gray-600'
  },
  {
    icon: Clock,
    title: '24/7 Qabulxona',
    description: 'Doimo sizning xizmatingizdamiz',
    color: 'from-indigo-500 to-indigo-600'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Bizning Xizmatlar
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Afrasiyob Hotel sizga eng yaxshi xizmatlarni taqdim etadi. 
            Qulaylik va mukammallik bizning ustuvorligimiz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-blue-100 group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { AMENITIES } from "@/constants";
import { FilterState } from "@/types/hotel";

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: boolean) => void;
}

export default function Sidebar({ filters, onFilterChange }: SidebarProps) {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-80 h-fit"
    >
      <Card className="p-6 shadow-lg border-blue-100">
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Filtrlar</h2>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Qulayliklar</h3>
            <div className="space-y-3">
              {AMENITIES.map((amenity) => (
                <motion.div
                  key={amenity.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Checkbox
                    id={amenity.id}
                    checked={filters[amenity.id as keyof FilterState]}
                    onCheckedChange={(checked) =>
                      onFilterChange(amenity.id as keyof FilterState, !!checked)
                    }
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label
                    htmlFor={amenity.id}
                    className="flex items-center space-x-2 text-sm font-medium cursor-pointer flex-1"
                  >
                    <span className="text-lg">{amenity.icon}</span>
                    <span>{amenity.label}</span>
                  </label>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

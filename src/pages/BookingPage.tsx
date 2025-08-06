import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, CreditCard, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookingData } from "@/types/booking";
import { sendToTelegram, formatBookingMessage } from "@/utils/telegram";
import { ROOM_TYPES } from "@/constants";

export default function BookingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "",
    fullName: "",
    phone: "",
    email: "",
    specialRequests: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = formatBookingMessage(formData);
      await sendToTelegram(message);

      toast({
        title: "Bron muvaffaqiyatli yuborildi!",
        description:
          "Tez orada siz bilan bog'lanamiz va bronni tasdiqlash uchun qo'ng'iroq qilamiz.",
      });

      setCurrentStep(4);
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Iltimos qaytadan urinib ko'ring.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: "Sana va Xona", icon: Calendar },
    { number: 2, title: "Shaxsiy Ma'lumotlar", icon: Users },
    { number: 3, title: "Tasdiqlash", icon: CreditCard },
    { number: 4, title: "Tugallandi", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Xona Bron Qilish
          </h1>
          <p className="text-gray-600">
            Qadamlar bo'yicha bron qilish jarayonini yakunlang
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-2 hidden md:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-1 mx-2 ${
                      currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Sana va Xona Tanlash
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kirish sanasi *
                    </label>
                    <Input
                      name="checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chiqish sanasi *
                    </label>
                    <Input
                      name="checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      required
                      min={
                        formData.checkIn ||
                        new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mehmonlar soni *
                    </label>
                    <Input
                      name="guests"
                      type="number"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Xona turi *
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("roomType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Xona turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROOM_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !formData.checkIn ||
                      !formData.checkOut ||
                      !formData.roomType
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Keyingi qadam
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Shaxsiy Ma'lumotlar
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To'liq ism *
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Ismingiz va familiyangiz"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon raqam *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email manzil *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maxsus so'rovlar
                  </label>
                  <Textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Qo'shimcha talablar yoki izohlar..."
                    rows={4}
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={prevStep} variant="outline">
                    Orqaga
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      !formData.fullName || !formData.phone || !formData.email
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Keyingi qadam
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Bron Ma'lumotlarini Tasdiqlash
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Kirish sanasi:</span>
                    <span>{formData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Chiqish sanasi:</span>
                    <span>{formData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Mehmonlar:</span>
                    <span>{formData.guests} kishi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Xona turi:</span>
                    <span>{formData.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Mijoz:</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telefon:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" onClick={prevStep} variant="outline">
                    Orqaga
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Yuborilmoqda..." : "Bronni tasdiqlash"}
                  </Button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Bron muvaffaqiyatli yuborildi!
                </h2>
                <p className="text-gray-600">
                  Sizning bronlaringiz qabul qilindi. Tez orada bizning
                  xodimlarimiz siz bilan bog'lanib, bronni tasdiqlash uchun
                  qo'ng'iroq qilishadi.
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Bosh sahifaga qaytish
                </Button>
              </motion.div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>

        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}
export default App;

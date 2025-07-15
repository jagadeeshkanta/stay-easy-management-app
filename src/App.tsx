import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { HotelProvider } from "@/contexts/HotelContext";
import { Navbar } from "@/components/ui/navbar";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Rooms } from "./pages/Rooms";
import { Contact } from "./pages/Contact";
import { AdminDashboard } from "./pages/AdminDashboard";
import { StaffDashboard } from "./pages/StaffDashboard";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <HotelProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/staff" element={<StaffDashboard />} />
                <Route path="/customer" element={<CustomerDashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </HotelProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import Agendamento from "./pages/Agendamento";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={
            <>
              <Navbar />
              <Index />
              <Footer />
            </>
          } />
          <Route path="/servicos" element={
            <>
              <Navbar />
              <Index />
              <Footer />
            </>
          } />
          <Route path="/agendamento" element={
            <>
              <Navbar />
              <Agendamento />
              <Footer />
            </>
          } />
          <Route path="/sobre" element={
            <>
              <Navbar />
              <Index />
              <Footer />
            </>
          } />
          <Route path="/contato" element={
            <>
              <Navbar />
              <Contato />
              <Footer />
            </>
          } />
          
          {/* Rotas Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

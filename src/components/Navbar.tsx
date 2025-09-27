import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Scissors } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/", section: "hero" },
    { name: "Sobre", path: "/", section: "sobre" },
    { name: "Serviços", path: "/", section: "servicos" },
    { name: "Avaliações", path: "/", section: "avaliacoes" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-white/95 backdrop-blur-md border-b border-brand-gold/20 sticky top-0 z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-gold p-2 rounded-lg group-hover:shadow-gold transition-all duration-300">
              <Scissors className="h-6 w-6 text-brand-black" />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-xl text-brand-black">
                Laudano
              </h1>
              <p className="font-open-sans text-xs text-brand-gray -mt-1">
                Barbearia
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.section)}
                className={`font-open-sans font-medium transition-all duration-300 relative group ${
                  isActive(item.path)
                    ? "text-brand-gold"
                    : "text-brand-black hover:text-brand-gold"
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            <Button variant="hero" size="default" asChild>
              <Link to="/agendamento">Agendar</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-black hover:text-brand-gold transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-white border-t border-brand-gold/20 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.section)}
                className={`block font-open-sans font-medium py-2 transition-colors duration-300 w-full text-left ${
                  isActive(item.path)
                    ? "text-brand-gold"
                    : "text-brand-black hover:text-brand-gold"
                }`}
              >
                {item.name}
              </button>
            ))}
            <Button variant="hero" size="default" className="w-full" asChild>
              <Link to="/agendamento" onClick={() => setIsMenuOpen(false)}>
                Agendar
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
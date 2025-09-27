import { Link } from "react-router-dom";
import { Scissors, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-gold p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-brand-black" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-brand-white">
                  Laudano
                </h1>
                <p className="font-open-sans text-xs text-brand-gold -mt-1">
                  Barbearia
                </p>
              </div>
            </div>
            <p className="font-open-sans text-brand-white/80 text-sm">
              Estilo, sofisticação e tradição em cada corte. Agende seu horário e experimente o melhor da barbearia moderna.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-brand-gold">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Serviços", path: "/servicos" },
                { name: "Agendamento", path: "/agendamento" },
                { name: "Sobre", path: "/sobre" },
                { name: "Contato", path: "/contato" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="font-open-sans text-brand-white/80 hover:text-brand-gold transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-brand-gold">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-brand-gold" />
                <span className="font-open-sans text-brand-white/80 text-sm">
                  Rua dos Barbeiros, 123<br />Centro - São Paulo
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand-gold" />
                <span className="font-open-sans text-brand-white/80 text-sm">
                  (11) 9999-9999
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand-gold" />
                <span className="font-open-sans text-brand-white/80 text-sm">
                  contato@laudanobarbearia.com
                </span>
              </li>
            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-brand-gold">
              Funcionamento
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-brand-gold" />
                <div className="font-open-sans text-brand-white/80 text-sm">
                  <p>Seg - Sex: 9h às 19h</p>
                  <p>Sábado: 8h às 17h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-brand-white/80 hover:text-brand-gold transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand-white/80 hover:text-brand-gold transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-brand-gold/20 mt-8 pt-8 text-center">
          <p className="font-open-sans text-brand-white/80 text-sm">
            © 2024 Laudano Barbearia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
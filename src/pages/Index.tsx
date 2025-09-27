import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Star, MapPin, Phone, Clock, Users, Award, Heart, Calendar, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-barbershop.jpg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const Index = () => {
  const [services, setServices] = useState<Tables<'servicos'>[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('servicos')
          .select('*')
          .eq('ativo', true)
          .order('nome');

        if (error) {
          console.error('Erro ao buscar serviços:', error);
          return;
        }

        setServices(data || []);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      }
    };

    fetchServices();
  }, []);

  // Scroll to specific section based on route
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.pathname === '/servicos') {
        const element = document.getElementById('servicos');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (location.pathname === '/sobre') {
        const element = document.getElementById('sobre');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const testimonials = [
    {
      nome: "Carlos Silva",
      texto: "Excelente atendimento! Os profissionais são muito qualificados e o ambiente é top.",
      avaliacao: 5
    },
    {
      nome: "Rafael Santos",
      texto: "Melhor barbearia da região. Sempre saio satisfeito com o resultado.",
      avaliacao: 5
    },
    {
      nome: "João Oliveira",
      texto: "Atendimento impecável e preços justos. Recomendo para todos os amigos.",
      avaliacao: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Interior da Laudano Barbearia" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
        </div>
        <div className="relative z-10 text-center text-brand-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-montserrat font-bold text-5xl md:text-7xl mb-6 leading-tight">
            <span className="text-brand-gold">Laudano</span><br />
            Barbearia
          </h1>
          <p className="font-open-sans text-xl md:text-2xl mb-8 text-brand-white/90">
            Agende seu horário com estilo
          </p>
          <p className="font-open-sans text-lg mb-12 text-brand-white/80 max-w-2xl mx-auto">
            Tradição, qualidade e sofisticação em cada corte. 
            Experimente o melhor atendimento em barbearia da região.
          </p>
          <Button variant="hero" size="hero" asChild>
            <Link to="/agendamento">
              Agendar Agora
            </Link>
          </Button>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-black mb-4">
              Sobre a <span className="text-brand-gold">Laudano</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg max-w-3xl mx-auto">
              Com mais de 10 anos de tradição, a Laudano Barbearia é sinônimo de qualidade, 
              sofisticação e atendimento personalizado. Nossa missão é proporcionar uma experiência 
              única e exclusiva para cada cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-brand-black" />
                </div>
                <CardTitle className="font-montserrat font-semibold text-brand-black">
                  Tradição
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans text-brand-gray">
                  Mais de 10 anos de experiência no mercado, mantendo a tradição da barbearia clássica com técnicas modernas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <UserCheck className="h-8 w-8 text-brand-black" />
                </div>
                <CardTitle className="font-montserrat font-semibold text-brand-black">
                  Qualidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans text-brand-gray">
                  Profissionais altamente qualificados e produtos de primeira linha para garantir o melhor resultado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-brand-black" />
                </div>
                <CardTitle className="font-montserrat font-semibold text-brand-black">
                  Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans text-brand-gray">
                  Ambiente acolhedor e atendimento personalizado, fazendo você se sentir especial a cada visita.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Serviços em Destaque */}
      <section id="servicos" className="py-20 bg-brand-gray-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-black mb-4">
              Nossos <span className="text-brand-gold">Serviços</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg max-w-2xl mx-auto">
              Conheça nossos principais serviços e descubra o que há de melhor em cuidados masculinos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={service.id} className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20 hover:border-brand-gold group">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
                    <Scissors className="h-8 w-8 text-brand-black" />
                  </div>
                  <CardTitle className="font-montserrat font-semibold text-brand-black">
                    {service.nome}
                  </CardTitle>
                  <CardDescription className="font-open-sans text-brand-gray">
                    Duração: {service.duracao} minutos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="elegant" size="sm" asChild>
                    <Link to="/agendamento">
                      Agendar Serviço
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="elegant" size="lg" asChild>
              <Link to="/servicos">
                Ver Todos os Serviços
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="py-20 bg-brand-gray-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-black mb-4">
              O que nossos <span className="text-brand-gold">clientes dizem</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg max-w-2xl mx-auto">
              Veja alguns depoimentos de quem já experimentou nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.avaliacao)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="font-open-sans text-brand-gray mb-4 italic">
                    "{testimonial.texto}"
                  </p>
                  <h4 className="font-montserrat font-semibold text-brand-black">
                    {testimonial.nome}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Localização e Contato */}
      <section className="py-20 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-black mb-4">
              Venha nos <span className="text-brand-gold">Visitar</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg max-w-2xl mx-auto">
              Estamos localizados no coração da cidade, prontos para atender você
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="bg-gradient-gold p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-brand-black" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-brand-black">Endereço</h3>
                    <p className="font-open-sans text-brand-gray">
                      Rua dos Barbeiros, 123<br />Centro - São Paulo, SP
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="bg-gradient-gold p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-brand-black" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-brand-black">Telefone</h3>
                    <p className="font-open-sans text-brand-gray">
                      (11) 9999-9999
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="bg-gradient-gold p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-brand-black" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-brand-black">Funcionamento</h3>
                    <div className="font-open-sans text-brand-gray">
                      <p>Seg - Sex: 9h às 19h</p>
                      <p>Sábado: 8h às 17h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button variant="hero" className="flex-1" asChild>
                  <Link to="/agendamento">
                    Agendar Horário
                  </Link>
                </Button>
                <Button variant="premium" className="flex-1" asChild>
                  <Link to="/contato">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mapa (placeholder) */}
            <div className="bg-gradient-card rounded-lg shadow-elegant p-8">
              <div className="bg-brand-gray-light/30 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-brand-gold mx-auto mb-4" />
                  <h3 className="font-montserrat font-semibold text-brand-black mb-2">Nossa Localização</h3>
                  <p className="font-open-sans text-brand-gray">
                    Rua dos Barbeiros, 123<br />Centro - São Paulo
                  </p>
                  <p className="font-open-sans text-brand-gray text-sm mt-2">
                    * Mapa interativo será integrado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-brand-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-white mb-6">
            Pronto para uma nova experiência?
          </h2>
          <p className="font-open-sans text-brand-white/80 text-lg mb-8">
            Agende seu horário agora e descubra por que somos a barbearia de referência
          </p>
          <Button variant="hero" size="hero" asChild>
            <Link to="/agendamento">
              Fazer Agendamento
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

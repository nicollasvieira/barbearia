import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Servicos = () => {
  const servicos = [
    {
      id: 1,
      nome: "Corte Tradicional",
      descricao: "Corte clássico masculino com acabamento profissional",
      preco: "R$ 30,00",
      duracao: "30 min",
      icon: Scissors,
    },
    {
      id: 2,
      nome: "Barba Completa",
      descricao: "Aparar e modelar a barba com toalha quente",
      preco: "R$ 25,00",
      duracao: "25 min",
      icon: Scissors,
    },
    {
      id: 3,
      nome: "Corte + Barba",
      descricao: "Combo completo: corte de cabelo + barba",
      preco: "R$ 50,00",
      duracao: "45 min",
      icon: Scissors,
    },
    {
      id: 4,
      nome: "Sobrancelha",
      descricao: "Design e aparar sobrancelha masculina",
      preco: "R$ 15,00",
      duracao: "15 min",
      icon: Scissors,
    },
    {
      id: 5,
      nome: "Tratamento Capilar",
      descricao: "Hidratação e tratamento do couro cabeludo",
      preco: "R$ 40,00",
      duracao: "40 min",
      icon: Scissors,
    },
    {
      id: 6,
      nome: "Pacote Premium",
      descricao: "Corte + Barba + Sobrancelha + Tratamento",
      preco: "R$ 90,00",
      duracao: "90 min",
      icon: Scissors,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-brand-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6">
            Nossos <span className="text-brand-gold">Serviços</span>
          </h1>
          <p className="font-open-sans text-xl text-brand-white/90 max-w-3xl mx-auto">
            Descubra a excelência em cada serviço da Laudano Barbearia
          </p>
        </div>
      </section>

      {/* Serviços Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicos.map((servico) => (
              <Card key={servico.id} className="hover:shadow-elegant transition-all duration-300 border-brand-gold/20 hover:border-brand-gold group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
                    <servico.icon className="h-8 w-8 text-brand-black" />
                  </div>
                  <CardTitle className="font-montserrat font-semibold text-brand-black">
                    {servico.nome}
                  </CardTitle>
                  <CardDescription className="font-open-sans text-brand-gray">
                    {servico.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-brand-gold" />
                      <span className="font-montserrat font-semibold text-brand-black">
                        {servico.preco}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-brand-gold" />
                      <span className="font-open-sans text-brand-gray">
                        {servico.duracao}
                      </span>
                    </div>
                  </div>
                  <Button variant="elegant" className="w-full" asChild>
                    <Link to="/agendamento">
                      Agendar Agora
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-black py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-white mb-6">
            Pronto para agendar?
          </h2>
          <p className="font-open-sans text-brand-white/80 text-lg mb-8">
            Escolha o serviço ideal e garante seu horário com os melhores profissionais
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

export default Servicos;
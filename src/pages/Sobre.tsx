import { Card, CardContent } from "@/components/ui/card";
import { Award, Clock, Heart, Users } from "lucide-react";

const Sobre = () => {
  const valores = [
    {
      icon: Heart,
      titulo: "Paixão pelo Ofício",
      descricao: "Cada corte é feito com dedicação e amor pela arte da barbearia."
    },
    {
      icon: Award,
      titulo: "Excelência",
      descricao: "Buscamos sempre a perfeição em cada serviço prestado."
    },
    {
      icon: Users,
      titulo: "Atendimento Premium",
      descricao: "Cada cliente é único e merece um atendimento personalizado."
    },
    {
      icon: Clock,
      titulo: "Tradição e Modernidade",
      descricao: "Combinamos técnicas clássicas com as tendências atuais."
    }
  ];

  const equipe = [
    {
      nome: "Laudano Silva",
      cargo: "Fundador & Barbeiro Master",
      experiencia: "15 anos de experiência",
      especialidade: "Cortes clássicos e modernos"
    },
    {
      nome: "Marcos Silva",
      cargo: "Barbeiro Sênior",
      experiencia: "8 anos de experiência",
      especialidade: "Especialista em cortes clássicos"
    },
    {
      nome: "Rafael Santos",
      cargo: "Barbeiro Especialista",
      experiencia: "6 anos de experiência",
      especialidade: "Expert em barbas e bigodes"
    },
    {
      nome: "Carlos Oliveira",
      cargo: "Barbeiro",
      experiencia: "4 anos de experiência",
      especialidade: "Cortes modernos e estilosos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-brand-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6">
            Nossa <span className="text-brand-gold">História</span>
          </h1>
          <p className="font-open-sans text-xl text-brand-white/90 max-w-3xl mx-auto">
            Conheça a trajetória da Laudano Barbearia e nossa paixão pelo ofício
          </p>
        </div>
      </section>

      {/* História */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-black mb-6">
                A História da <span className="text-brand-gold">Laudano</span>
              </h2>
              <div className="space-y-4 font-open-sans text-brand-gray leading-relaxed">
                <p>
                  Fundada em 2009 por Laudano Silva, a Laudano Barbearia nasceu do sonho de criar 
                  um espaço onde tradição e modernidade se encontram para oferecer o melhor em 
                  cuidados masculinos.
                </p>
                <p>
                  Com mais de 15 anos de experiência no ramo, Laudano sempre teve a visão de 
                  transformar a simples ida à barbearia em uma experiência única e memorável. 
                  Começando com um pequeno salão no centro de São Paulo, hoje somos referência 
                  em qualidade e atendimento.
                </p>
                <p>
                  Nossa filosofia é simples: cada cliente é único e merece um atendimento 
                  personalizado. Combinamos técnicas clássicas da barbearia tradicional com 
                  as mais modernas tendências e equipamentos, sempre priorizando a qualidade 
                  e a satisfação de nossos clientes.
                </p>
                <p>
                  Ao longo dos anos, construímos uma equipe de profissionais apaixonados pelo 
                  ofício, que compartilham dos mesmos valores de excelência e dedicação que 
                  nos trouxeram até aqui.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-card rounded-lg p-8 shadow-elegant">
                <img 
                  src="/api/placeholder/500/400" 
                  alt="Interior da Laudano Barbearia" 
                  className="w-full rounded-lg shadow-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-brand-gray-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-black mb-4">
              Nossos <span className="text-brand-gold">Valores</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg max-w-2xl mx-auto">
              Os princípios que guiam nosso trabalho e nossa relação com os clientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20 hover:border-brand-gold group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
                    <valor.icon className="h-8 w-8 text-brand-black" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-brand-black mb-2">
                    {valor.titulo}
                  </h3>
                  <p className="font-open-sans text-brand-gray text-sm">
                    {valor.descricao}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-black mb-4">
              Nossa <span className="text-brand-gold">Equipe</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg max-w-2xl mx-auto">
              Conheça os profissionais que fazem a diferença na Laudano Barbearia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((membro, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 border-brand-gold/20 hover:border-brand-gold group">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-20 h-20 bg-gradient-card rounded-full flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
                    <Users className="h-10 w-10 text-brand-gold" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-brand-black mb-1">
                    {membro.nome}
                  </h3>
                  <p className="font-open-sans text-brand-gold text-sm mb-2">
                    {membro.cargo}
                  </p>
                  <p className="font-open-sans text-brand-gray text-xs mb-1">
                    {membro.experiencia}
                  </p>
                  <p className="font-open-sans text-brand-gray text-xs">
                    {membro.especialidade}
                  </p>
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
            Faça parte da nossa história
          </h2>
          <p className="font-open-sans text-brand-white/80 text-lg mb-8">
            Venha conhecer nossa barbearia e experimentar o atendimento que nos torna únicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-brand-gold text-brand-black font-montserrat font-semibold hover:shadow-gold transition-all duration-300 hover:scale-105"
            >
              WhatsApp
            </a>
            <a 
              href="tel:+5511999999999"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-300 font-montserrat font-medium"
            >
              Ligar Agora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
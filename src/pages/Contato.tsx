import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

const Contato = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-brand-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl mb-6">
            Entre em <span className="text-brand-gold">Contato</span>
          </h1>
          <p className="font-open-sans text-xl text-brand-white/90 max-w-3xl mx-auto">
            Estamos aqui para atender você da melhor forma possível
          </p>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-8">
              <div>
                <h2 className="font-montserrat font-bold text-3xl text-brand-black mb-6">
                  Fale <span className="text-brand-gold">Conosco</span>
                </h2>
                <p className="font-open-sans text-brand-gray text-lg">
                  Entre em contato através de qualquer um dos canais abaixo. 
                  Estamos sempre prontos para atender você!
                </p>
              </div>

              {/* Informações de Contato */}
              <div className="space-y-6">
                <Card className="border-brand-gold/20 hover:border-brand-gold hover:shadow-card transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="bg-gradient-gold p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-brand-black">Endereço</h3>
                      <p className="font-open-sans text-brand-gray">
                        Rua dos Barbeiros, 123<br />
                        Centro - São Paulo, SP<br />
                        CEP: 01234-567
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-gold/20 hover:border-brand-gold hover:shadow-card transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="bg-gradient-gold p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-brand-black">Telefone</h3>
                      <p className="font-open-sans text-brand-gray">
                        (11) 9999-9999<br />
                        WhatsApp: (11) 99999-9999
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-gold/20 hover:border-brand-gold hover:shadow-card transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="bg-gradient-gold p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-brand-black">E-mail</h3>
                      <p className="font-open-sans text-brand-gray">
                        contato@laudanobarbearia.com<br />
                        agendamento@laudanobarbearia.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-gold/20 hover:border-brand-gold hover:shadow-card transition-all duration-300">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <div className="bg-gradient-gold p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-brand-black" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-brand-black">Horário de Funcionamento</h3>
                      <div className="font-open-sans text-brand-gray">
                        <p>Segunda a Sexta: 9h às 19h</p>
                        <p>Sábado: 8h às 17h</p>
                        <p>Domingo: Fechado</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 className="font-montserrat font-semibold text-brand-black mb-4">Siga-nos nas Redes</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gradient-gold p-3 rounded-lg hover:shadow-gold transition-all duration-300">
                    <Instagram className="h-6 w-6 text-brand-black" />
                  </a>
                  <a href="#" className="bg-gradient-gold p-3 rounded-lg hover:shadow-gold transition-all duration-300">
                    <Facebook className="h-6 w-6 text-brand-black" />
                  </a>
                  <a 
                    href="https://wa.me/5511999999999" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-gold p-3 rounded-lg hover:shadow-gold transition-all duration-300"
                  >
                    <MessageCircle className="h-6 w-6 text-brand-black" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div>
              <Card className="shadow-elegant border-brand-gold/20">
                <CardHeader>
                  <CardTitle className="font-montserrat text-2xl text-brand-black">
                    Envie uma Mensagem
                  </CardTitle>
                  <CardDescription className="font-open-sans text-brand-gray">
                    Preencha o formulário abaixo e retornaremos o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome" className="font-montserrat font-medium text-brand-black">Nome</Label>
                      <Input id="nome" placeholder="Seu nome" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="telefone" className="font-montserrat font-medium text-brand-black">Telefone</Label>
                      <Input id="telefone" placeholder="(11) 99999-9999" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-montserrat font-medium text-brand-black">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="assunto" className="font-montserrat font-medium text-brand-black">Assunto</Label>
                    <Input id="assunto" placeholder="Como podemos te ajudar?" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="mensagem" className="font-montserrat font-medium text-brand-black">Mensagem</Label>
                    <Textarea 
                      id="mensagem" 
                      placeholder="Escreva sua mensagem aqui..." 
                      className="mt-1 min-h-[120px]" 
                    />
                  </div>
                  <Button variant="hero" className="w-full">
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-20 bg-brand-gray-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-black mb-4">
              Nossa <span className="text-brand-gold">Localização</span>
            </h2>
            <p className="font-open-sans text-brand-gray text-lg">
              Venha nos visitar e conheça nossa barbearia
            </p>
          </div>
          
          <div className="bg-brand-white rounded-lg shadow-elegant p-8">
            <div className="bg-brand-gray-light/30 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-brand-gold mx-auto mb-4" />
                <h3 className="font-montserrat font-semibold text-brand-black mb-2">Mapa Interativo</h3>
                <p className="font-open-sans text-brand-gray">
                  Rua dos Barbeiros, 123 - Centro, São Paulo
                </p>
                <p className="font-open-sans text-brand-gray text-sm mt-2">
                  * Integração com Google Maps será implementada
                </p>
              </div>
            </div>
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
            Entre em contato conosco e garanta seu horário
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

export default Contato;
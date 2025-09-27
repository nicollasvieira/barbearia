import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronLeft, ChevronRight, Scissors, User, Phone, Mail, Clock } from "lucide-react";
import { format, addDays, isSameDay, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

const Agendamento = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [clientData, setClientData] = useState({
    nome: "",
    telefone: "",
    email: "",
  });
  const [servicos, setServicos] = useState<Tables<'servicos'>[]>([]);
  const [barbeiros, setBarbeiros] = useState<Tables<'barbeiros'>[]>([]);
  const [loading, setLoading] = useState(false);
  const [existingClient, setExistingClient] = useState<any>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const { toast } = useToast();

  const steps = [
    { number: 1, title: "Serviço", description: "Escolha o serviço desejado" },
    { number: 2, title: "Barbeiro", description: "Selecione seu barbeiro" },
    { number: 3, title: "Data e Hora", description: "Escolha data e horário" },
    { number: 4, title: "Dados", description: "Seus dados de contato" },
  ];

  useEffect(() => {
    fetchServicos();
    fetchBarbeiros();
  }, []);

  const fetchServicos = async () => {
    const { data, error } = await supabase
      .from('servicos')
      .select('*')
      .eq('ativo', true);
    
    if (error) {
      console.error('Erro ao buscar serviços:', error);
    } else {
      setServicos(data || []);
    }
  };

  const fetchBarbeiros = async () => {
    const { data, error } = await supabase
      .from('barbeiros')
      .select('*')
      .eq('ativo', true);
    
    if (error) {
      console.error('Erro ao buscar barbeiros:', error);
    } else {
      setBarbeiros(data || []);
    }
  };

  const horarios = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];

  const checkExistingClient = async (email: string) => {
    if (!email || !email.includes('@')) return;
    
    setCheckingEmail(true);
    try {
      const { data, error } = await supabase
        .from('agendamentos')
        .select('cliente_nome, cliente_telefone, cliente_email')
        .eq('cliente_email', email)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Erro ao verificar cliente:', error);
        return;
      }

      if (data && data.length > 0) {
        const client = data[0];
        setExistingClient(client);
        setClientData({
          nome: client.cliente_nome,
          telefone: client.cliente_telefone,
          email: client.cliente_email
        });
        
        toast({
          title: "Cliente encontrado!",
          description: "Seus dados foram preenchidos automaticamente.",
        });
      } else {
        setExistingClient(null);
      }
    } catch (error) {
      console.error('Erro ao verificar cliente:', error);
    } finally {
      setCheckingEmail(false);
    }
  };

  const getAvailableTimes = async (date: Date) => {
    if (!date || !selectedBarber) return horarios;
    
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('agendamentos')
        .select('horario')
        .eq('data_agendamento', dateStr)
        .eq('barbeiro_id', selectedBarber)
        .eq('status', 'confirmado');

      if (error) {
        console.error('Erro ao buscar horários ocupados:', error);
        return horarios;
      }

      const occupiedTimes = data?.map(item => item.horario) || [];
      return horarios.filter(time => !occupiedTimes.includes(time));
    } catch (error) {
      console.error('Erro ao buscar horários ocupados:', error);
      return horarios;
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('agendamentos')
        .insert({
          servico_id: selectedService,
          barbeiro_id: selectedBarber === 'qualquer' ? null : selectedBarber,
          cliente_nome: clientData.nome,
          cliente_telefone: clientData.telefone,
          cliente_email: clientData.email,
          data_agendamento: selectedDate?.toISOString().split('T')[0],
          horario: selectedTime,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Agendamento realizado!",
        description: "Seu agendamento foi confirmado com sucesso.",
      });

      // Reset form
      setCurrentStep(1);
      setSelectedService("");
      setSelectedBarber("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setClientData({ nome: "", telefone: "", email: "" });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast({
        title: "Erro no agendamento",
        description: "Houve um erro ao processar seu agendamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedService !== "";
      case 2: return selectedBarber !== "";
      case 3: return selectedDate && selectedTime !== "";
      case 4: return clientData.nome && clientData.telefone && clientData.email;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-black mb-4">
            Agendar <span className="text-brand-gold">Horário</span>
          </h1>
          <p className="font-open-sans text-brand-gray text-lg">
            Complete as etapas abaixo para finalizar seu agendamento
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex flex-col items-center ${index < steps.length - 1 ? "mr-4" : ""}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    currentStep === step.number 
                      ? "bg-gradient-gold text-brand-black shadow-gold" 
                      : currentStep > step.number
                      ? "bg-brand-gold text-brand-black"
                      : "bg-brand-gray-light text-brand-gray"
                  }`}>
                    {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <div className="text-center mt-2 hidden sm:block">
                    <p className="font-montserrat font-medium text-sm text-brand-black">{step.title}</p>
                    <p className="font-open-sans text-xs text-brand-gray">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 transition-all duration-300 ${
                    currentStep > step.number ? "bg-brand-gold" : "bg-brand-gray-light"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-elegant border-brand-gold/20">
          <CardHeader>
            <CardTitle className="font-montserrat text-2xl text-brand-black">
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="font-open-sans text-brand-gray">
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Etapa 1: Escolher Serviço */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicos.map((servico) => (
                  <div
                    key={servico.id}
                    onClick={() => setSelectedService(servico.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedService === servico.id
                        ? "border-brand-gold bg-brand-gold/10 shadow-gold"
                        : "border-brand-gray-light hover:border-brand-gold/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Scissors className="h-6 w-6 text-brand-gold" />
                      <div className="flex-1">
                        <h3 className="font-montserrat font-semibold text-brand-black">{servico.nome}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-open-sans text-brand-gold font-medium">{servico.preco}</span>
                          <span className="font-open-sans text-brand-gray text-sm">{servico.duracao} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Etapa 2: Escolher Barbeiro */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {barbeiros.map((barbeiro) => (
                  <div
                    key={barbeiro.id}
                    onClick={() => setSelectedBarber(barbeiro.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      selectedBarber === barbeiro.id
                        ? "border-brand-gold bg-brand-gold/10 shadow-gold"
                        : "border-brand-gray-light hover:border-brand-gold/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="h-6 w-6 text-brand-gold" />
                      <div>
                        <h3 className="font-montserrat font-semibold text-brand-black">{barbeiro.nome}</h3>
                        <p className="font-open-sans text-brand-gray text-sm">{barbeiro.especialidade}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Etapa 3: Escolher Data e Hora */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="font-montserrat font-medium text-brand-black">Escolha a Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-2",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setSelectedTime(""); // Reset time when date changes
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || date.getDay() === 0; // Disable past dates and Sundays
                        }}
                        initialFocus
                        className="pointer-events-auto"
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="font-montserrat font-medium text-brand-black">Horários Disponíveis</Label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
                      {horarios.map((horario) => (
                        <Button
                          key={horario}
                          variant={selectedTime === horario ? "hero" : "outline"}
                          onClick={() => setSelectedTime(horario)}
                          className="text-sm"
                          disabled={false} // Por enquanto todos disponíveis, pode ser melhorado
                        >
                          {horario}
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-brand-gray mt-2 font-open-sans">
                      * Horários em vermelho indicam horários ocupados
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Etapa 4: Dados do Cliente */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome" className="font-montserrat font-medium text-brand-black">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={clientData.nome}
                      onChange={(e) => setClientData({ ...clientData, nome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="font-montserrat font-medium text-brand-black">Telefone</Label>
                    <Input
                      id="telefone"
                      value={clientData.telefone}
                      onChange={(e) => setClientData({ ...clientData, telefone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="font-montserrat font-medium text-brand-black">E-mail</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) => {
                        const newEmail = e.target.value;
                        setClientData({ ...clientData, email: newEmail });
                        // Verificar email após um pequeno delay
                        setTimeout(() => {
                          if (newEmail !== clientData.email) {
                            checkExistingClient(newEmail);
                          }
                        }, 1000);
                      }}
                      placeholder="seu@email.com"
                      className="mt-1 pr-10"
                    />
                    {checkingEmail && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Clock className="h-4 w-4 animate-spin text-brand-gold" />
                      </div>
                    )}
                  </div>
                  {existingClient && (
                    <p className="text-sm text-green-600 mt-1 font-open-sans">
                      ✓ Cliente encontrado! Dados preenchidos automaticamente.
                    </p>
                  )}
                </div>

                {/* Resumo do Agendamento */}
                <Card className="bg-brand-gold/10 border-brand-gold/30">
                  <CardHeader>
                    <CardTitle className="font-montserrat text-lg text-brand-black">Resumo do Agendamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-open-sans"><strong>Serviço:</strong> {servicos.find(s => s.id === selectedService)?.nome}</p>
                    <p className="font-open-sans"><strong>Barbeiro:</strong> {barbeiros.find(b => b.id === selectedBarber)?.nome}</p>
                    <p className="font-open-sans"><strong>Data:</strong> {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : ""}</p>
                    <p className="font-open-sans"><strong>Horário:</strong> {selectedTime}</p>
                    <p className="font-open-sans"><strong>Preço:</strong> {servicos.find(s => s.id === selectedService)?.preco}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="hero"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2"
                >
                  <span>Continuar</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>{loading ? "Processando..." : "Confirmar Agendamento"}</span>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Agendamento;
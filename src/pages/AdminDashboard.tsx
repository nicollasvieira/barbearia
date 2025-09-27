import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Scissors, DollarSign, Clock, User, LogOut, BarChart3, TrendingUp, UserCheck, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalAgendamentos: 0,
    agendamentosHoje: 0,
    totalClientes: 0,
    servicoMaisPopular: "",
  });

  useEffect(() => {
    // Verificar se está autenticado
    if (!localStorage.getItem("admin_authenticated")) {
      navigate("/admin");
      return;
    }
    
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Buscar todos os agendamentos
      const { data: agendamentosData, error: agendamentosError } = await supabase
        .from('agendamentos')
        .select(`
          *,
          servicos (nome, preco),
          barbeiros (nome)
        `)
        .order('created_at', { ascending: false });

      if (agendamentosError) throw agendamentosError;

      setAgendamentos(agendamentosData || []);

      // Calcular estatísticas
      const today = new Date().toISOString().split('T')[0];
      const agendamentosHoje = agendamentosData?.filter(a => a.data_agendamento === today).length || 0;
      
      const clientesUnicos = new Set(agendamentosData?.map(a => a.cliente_email)).size;
      
      // Serviço mais popular
      const servicosCount = agendamentosData?.reduce((acc: any, agendamento: any) => {
        const servicoNome = agendamento.servicos?.nome || 'Não informado';
        acc[servicoNome] = (acc[servicoNome] || 0) + 1;
        return acc;
      }, {});
      
      const servicoMaisPopular = Object.keys(servicosCount || {}).reduce((a, b) => 
        (servicosCount[a] || 0) > (servicosCount[b] || 0) ? a : b, 'Nenhum'
      );

      setStats({
        totalAgendamentos: agendamentosData?.length || 0,
        agendamentosHoje,
        totalClientes: clientesUnicos,
        servicoMaisPopular,
      });
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-brand-white shadow-card border-b border-brand-gold/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-gold p-2 rounded-lg">
                <Scissors className="h-6 w-6 text-brand-black" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-brand-black">
                  Painel Administrativo
                </h1>
                <p className="font-open-sans text-xs text-brand-gray -mt-1">
                  Laudano Barbearia
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-open-sans text-brand-gray text-sm">Total de Clientes</p>
                  <p className="font-montserrat font-bold text-2xl text-brand-black">{stats.totalClientes}</p>
                </div>
                <div className="bg-gradient-gold p-3 rounded-lg">
                  <Users className="h-6 w-6 text-brand-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-open-sans text-brand-gray text-sm">Agendamentos Hoje</p>
                  <p className="font-montserrat font-bold text-2xl text-brand-black">{stats.agendamentosHoje}</p>
                </div>
                <div className="bg-gradient-gold p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-brand-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-open-sans text-brand-gray text-sm">Total de Agendamentos</p>
                  <p className="font-montserrat font-bold text-2xl text-brand-black">{stats.totalAgendamentos}</p>
                </div>
                <div className="bg-gradient-gold p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-brand-black" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-brand-gold/20 hover:shadow-card transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-open-sans text-brand-gray text-sm">Serviço Mais Popular</p>
                  <p className="font-montserrat font-bold text-lg text-brand-black">{stats.servicoMaisPopular}</p>
                </div>
                <div className="bg-gradient-gold p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-brand-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="agendamentos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="agendamentos" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Agendamentos</span>
            </TabsTrigger>
            <TabsTrigger value="clientes" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="relatorios" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Relatórios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agendamentos">
            <Card className="shadow-elegant border-brand-gold/20">
              <CardHeader>
                <CardTitle className="font-montserrat text-brand-black">Agendamentos Recentes</CardTitle>
                <CardDescription className="font-open-sans text-brand-gray">
                  Lista dos agendamentos mais recentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agendamentos.slice(0, 10).map((agendamento) => (
                    <div key={agendamento.id} className="flex items-center justify-between p-4 bg-brand-gray-light/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-gold p-2 rounded-full">
                          <User className="h-4 w-4 text-brand-black" />
                        </div>
                        <div>
                          <p className="font-montserrat font-semibold text-brand-black">{agendamento.cliente_nome}</p>
                          <p className="font-open-sans text-brand-gray text-sm">{agendamento.servicos?.nome || 'Serviço não encontrado'}</p>
                          <p className="font-open-sans text-brand-gray text-xs">{agendamento.cliente_telefone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-montserrat font-medium text-brand-black">
                          {format(new Date(agendamento.data_agendamento), 'dd/MM/yyyy', { locale: ptBR })}
                        </p>
                        <p className="font-open-sans text-brand-gray text-sm">às {agendamento.horario}</p>
                        <p className="font-open-sans text-brand-gray text-xs">{agendamento.barbeiros?.nome || 'Qualquer barbeiro'}</p>
                      </div>
                    </div>
                  ))}
                  {agendamentos.length === 0 && (
                    <p className="text-center text-brand-gray py-8">Nenhum agendamento encontrado</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clientes">
            <Card className="shadow-elegant border-brand-gold/20">
              <CardHeader>
                <CardTitle className="font-montserrat text-brand-black">Clientes Únicos</CardTitle>
                <CardDescription className="font-open-sans text-brand-gray">
                  Lista de clientes que já fizeram agendamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(agendamentos.map(a => a.cliente_email)))
                    .slice(0, 10)
                    .map((email) => {
                      const cliente = agendamentos.find(a => a.cliente_email === email);
                      const totalAgendamentos = agendamentos.filter(a => a.cliente_email === email).length;
                      return (
                        <div key={email} className="flex items-center justify-between p-4 bg-brand-gray-light/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-gold p-2 rounded-full">
                              <Users className="h-4 w-4 text-brand-black" />
                            </div>
                            <div>
                              <p className="font-montserrat font-semibold text-brand-black">{cliente?.cliente_nome}</p>
                              <p className="font-open-sans text-brand-gray text-sm">{cliente?.cliente_telefone}</p>
                              <p className="font-open-sans text-brand-gray text-xs">{email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-montserrat font-medium text-brand-black">
                              {totalAgendamentos} agendamento{totalAgendamentos !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  {agendamentos.length === 0 && (
                    <p className="text-center text-brand-gray py-8">Nenhum cliente encontrado</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-brand-gold/20">
                <CardHeader>
                  <CardTitle className="font-montserrat text-brand-black">Serviços Mais Procurados</CardTitle>
                  <CardDescription className="font-open-sans text-brand-gray">
                    Ranking dos serviços mais solicitados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      agendamentos.reduce((acc: any, agendamento: any) => {
                        const servicoNome = agendamento.servicos?.nome || 'Não informado';
                        acc[servicoNome] = (acc[servicoNome] || 0) + 1;
                        return acc;
                      }, {})
                    )
                      .sort(([,a], [,b]) => (b as number) - (a as number))
                      .slice(0, 5)
                      .map(([servico, count]) => (
                        <div key={servico} className="flex justify-between items-center">
                          <span className="font-open-sans text-brand-gray">{servico}</span>
                          <span className="font-montserrat font-semibold text-brand-black">{count as number} agendamentos</span>
                        </div>
                      ))}
                    {agendamentos.length === 0 && (
                      <p className="text-center text-brand-gray py-4">Nenhum dado disponível</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-brand-gold/20">
                <CardHeader>
                  <CardTitle className="font-montserrat text-brand-black">Barbeiros Mais Solicitados</CardTitle>
                  <CardDescription className="font-open-sans text-brand-gray">
                    Ranking dos barbeiros mais escolhidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(
                      agendamentos.reduce((acc: any, agendamento: any) => {
                        const barbeiroNome = agendamento.barbeiros?.nome || 'Qualquer barbeiro';
                        acc[barbeiroNome] = (acc[barbeiroNome] || 0) + 1;
                        return acc;
                      }, {})
                    )
                      .sort(([,a], [,b]) => (b as number) - (a as number))
                      .slice(0, 5)
                      .map(([barbeiro, count]) => (
                        <div key={barbeiro} className="flex justify-between items-center">
                          <span className="font-open-sans text-brand-gray">{barbeiro}</span>
                          <span className="font-montserrat font-semibold text-brand-black">{count as number} agendamentos</span>
                        </div>
                      ))}
                    {agendamentos.length === 0 && (
                      <p className="text-center text-brand-gray py-4">Nenhum dado disponível</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
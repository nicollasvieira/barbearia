-- Criar tabela de serviços
CREATE TABLE public.servicos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  preco TEXT NOT NULL,
  duracao INTEGER NOT NULL, -- em minutos
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de barbeiros
CREATE TABLE public.barbeiros (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  especialidade TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de agendamentos
CREATE TABLE public.agendamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  servico_id UUID REFERENCES public.servicos(id) NOT NULL,
  barbeiro_id UUID REFERENCES public.barbeiros(id),
  cliente_nome TEXT NOT NULL,
  cliente_telefone TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  data_agendamento DATE NOT NULL,
  horario TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'agendado',
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir serviços padrão
INSERT INTO public.servicos (nome, preco, duracao) VALUES
('Corte Tradicional', 'R$ 30,00', 30),
('Barba Completa', 'R$ 25,00', 25),
('Corte + Barba', 'R$ 50,00', 45),
('Sobrancelha', 'R$ 15,00', 15),
('Tratamento Capilar', 'R$ 40,00', 40),
('Pacote Premium', 'R$ 90,00', 90);

-- Inserir barbeiros padrão
INSERT INTO public.barbeiros (nome, especialidade) VALUES
('Qualquer Barbeiro', 'Disponibilidade flexível'),
('Marcos Silva', 'Especialista em cortes clássicos'),
('Rafael Santos', 'Expert em barbas e bigodes'),
('Carlos Oliveira', 'Cortes modernos e estilosos');

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Criar trigger para agendamentos
CREATE TRIGGER update_agendamentos_updated_at
  BEFORE UPDATE ON public.agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbeiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agendamentos ENABLE ROW LEVEL SECURITY;

-- Criar políticas para permitir leitura pública dos serviços e barbeiros
CREATE POLICY "Servicos são visíveis publicamente" 
  ON public.servicos FOR SELECT 
  USING (ativo = true);

CREATE POLICY "Barbeiros são visíveis publicamente" 
  ON public.barbeiros FOR SELECT 
  USING (ativo = true);

-- Permitir inserção de agendamentos por qualquer pessoa
CREATE POLICY "Qualquer pessoa pode criar agendamentos" 
  ON public.agendamentos FOR INSERT 
  WITH CHECK (true);

-- Permitir leitura de agendamentos (para o painel admin)
CREATE POLICY "Agendamentos são visíveis publicamente" 
  ON public.agendamentos FOR SELECT 
  USING (true);
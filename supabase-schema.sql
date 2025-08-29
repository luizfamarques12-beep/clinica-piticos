-- Script SQL para criar as tabelas do CLINICA PITICOS no Supabase
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela terapeuta
-- Nota: A autenticação será gerenciada pelo Supabase Auth
-- Esta tabela armazena informações adicionais do terapeuta
CREATE TABLE IF NOT EXISTS terapeuta (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela paciente
CREATE TABLE IF NOT EXISTS paciente (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    data_nascimento DATE NOT NULL,
    observacoes TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela evolucao
CREATE TABLE IF NOT EXISTS evolucao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    paciente_id UUID NOT NULL REFERENCES paciente(id) ON DELETE CASCADE,
    data DATE DEFAULT CURRENT_DATE,
    descricao TEXT NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_paciente_nome ON paciente(nome);
CREATE INDEX IF NOT EXISTS idx_evolucao_paciente_id ON evolucao(paciente_id);
CREATE INDEX IF NOT EXISTS idx_evolucao_data ON evolucao(data);

-- Função para atualizar o campo atualizado_em automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar automaticamente o campo atualizado_em
CREATE TRIGGER update_terapeuta_updated_at 
    BEFORE UPDATE ON terapeuta 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_paciente_updated_at 
    BEFORE UPDATE ON paciente 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evolucao_updated_at 
    BEFORE UPDATE ON evolucao 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Políticas de segurança RLS (Row Level Security)
-- Habilitar RLS nas tabelas
ALTER TABLE terapeuta ENABLE ROW LEVEL SECURITY;
ALTER TABLE paciente ENABLE ROW LEVEL SECURITY;
ALTER TABLE evolucao ENABLE ROW LEVEL SECURITY;

-- Política para terapeuta: apenas usuários autenticados podem acessar
CREATE POLICY "Terapeutas podem ver seus próprios dados" ON terapeuta
    FOR ALL USING (auth.uid()::text = id::text);

-- Política para paciente: apenas usuários autenticados podem acessar
CREATE POLICY "Usuários autenticados podem gerenciar pacientes" ON paciente
    FOR ALL USING (auth.role() = 'authenticated');

-- Política para evolucao: apenas usuários autenticados podem acessar
CREATE POLICY "Usuários autenticados podem gerenciar evoluções" ON evolucao
    FOR ALL USING (auth.role() = 'authenticated');

-- Inserir dados de exemplo (opcional)
-- Descomente as linhas abaixo se quiser dados de teste

-- INSERT INTO paciente (nome, data_nascimento, observacoes) VALUES
-- ('João Silva', '1985-03-15', 'Paciente com histórico de ansiedade'),
-- ('Maria Santos', '1990-07-22', 'Primeira consulta, sem observações específicas'),
-- ('Pedro Oliveira', '1978-11-08', 'Acompanhamento mensal');

-- INSERT INTO evolucao (paciente_id, data, descricao) VALUES
-- ((SELECT id FROM paciente WHERE nome = 'João Silva'), '2024-01-15', 'Primeira sessão. Paciente relatou melhora no quadro de ansiedade.'),
-- ((SELECT id FROM paciente WHERE nome = 'João Silva'), '2024-01-22', 'Segunda sessão. Continuidade do tratamento, paciente mais receptivo.'),
-- ((SELECT id FROM paciente WHERE nome = 'Maria Santos'), '2024-01-20', 'Sessão inicial. Estabelecimento de rapport e definição de objetivos.');


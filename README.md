# CLINICA PITICOS - Sistema de Gestão de Pacientes

Um sistema web completo para gestão de pacientes desenvolvido com React e Supabase, especialmente projetado para terapeutas e profissionais da saúde.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Supabase](#configuração-do-supabase)
- [Instalação e Configuração](#instalação-e-configuração)
- [Deploy no Vercel](#deploy-no-vercel)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso da Aplicação](#uso-da-aplicação)
- [Troubleshooting](#troubleshooting)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Visão Geral

O CLINICA PITICOS é um sistema web moderno e responsivo desenvolvido para facilitar a gestão de pacientes em clínicas e consultórios. O sistema oferece uma interface intuitiva para cadastro, acompanhamento e registro de evoluções de pacientes, com foco na simplicidade e eficiência.

### Características Principais

- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- **Autenticação Segura**: Sistema de login exclusivo para terapeutas
- **Gestão Completa**: CRUD completo para pacientes e evoluções
- **Design Moderno**: Interface limpa e profissional com Tailwind CSS
- **Backend Robusto**: Integração com Supabase para banco de dados e autenticação
- **Deploy Simples**: Configuração fácil para deploy no Vercel

## ✨ Funcionalidades

### Autenticação
- Login seguro com email e senha
- Sessão persistente
- Logout com confirmação

### Gestão de Pacientes
- Cadastro de novos pacientes
- Listagem com busca por nome
- Visualização detalhada de informações
- Cálculo automático de idade
- Campos para observações especiais

### Registro de Evoluções
- Adição de evoluções por paciente
- Histórico cronológico completo
- Data e descrição detalhada
- Interface modal para facilitar o uso

### Dashboard
- Estatísticas gerais da clínica
- Ações rápidas para funcionalidades principais
- Visão geral de atividades recentes

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca principal para interface
- **Vite 6.3.5** - Build tool e servidor de desenvolvimento
- **React Router DOM 7.6.1** - Roteamento da aplicação
- **Tailwind CSS 4.1.7** - Framework CSS para estilização
- **shadcn/ui** - Componentes de interface pré-construídos
- **Lucide React** - Ícones modernos e consistentes

### Backend
- **Supabase** - Backend as a Service (BaaS)
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security (RLS)** - Segurança a nível de linha
- **Supabase Auth** - Sistema de autenticação

### Deploy e Hospedagem
- **Vercel** - Plataforma de deploy para frontend
- **Supabase Cloud** - Hospedagem do backend

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **pnpm** (recomendado)
- **Git** para controle de versão
- Conta no **Supabase** (gratuita)
- Conta no **Vercel** (gratuita)

## 🗄 Configuração do Supabase

### Passo 1: Criar Conta e Projeto

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em "New Project"
3. Escolha sua organização
4. Defina um nome para o projeto (ex: "clinica-piticos")
5. Crie uma senha segura para o banco de dados
6. Selecione a região mais próxima
7. Clique em "Create new project"

### Passo 2: Configurar o Banco de Dados

1. Aguarde a criação do projeto (pode levar alguns minutos)
2. No painel do Supabase, vá para "SQL Editor"
3. Clique em "New query"
4. Copie e cole o conteúdo do arquivo `supabase-schema.sql`
5. Clique em "Run" para executar o script

### Passo 3: Configurar Autenticação

1. No painel do Supabase, vá para "Authentication"
2. Clique em "Settings"
3. Em "Site URL", adicione: `http://localhost:5173` (para desenvolvimento)
4. Em "Redirect URLs", adicione: `http://localhost:5173/**`
5. Salve as configurações

### Passo 4: Obter Chaves de API

1. No painel do Supabase, vá para "Settings" > "API"
2. Copie a "Project URL"
3. Copie a "anon public" key
4. Guarde essas informações para a próxima etapa

### Passo 5: Criar Usuário Terapeuta

1. No painel do Supabase, vá para "Authentication" > "Users"
2. Clique em "Add user"
3. Adicione o email e senha do terapeuta
4. Confirme a criação

## ⚙️ Instalação e Configuração

### Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd clinica-piticos
```

### Passo 2: Instalar Dependências

```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install
```

### Passo 3: Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas credenciais do Supabase:
```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### Passo 4: Executar em Desenvolvimento

```bash
# Usando pnpm
pnpm run dev

# Ou usando npm
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Passo 5: Testar a Aplicação

1. Acesse `http://localhost:5173`
2. Faça login com as credenciais do terapeuta criadas no Supabase
3. Teste as funcionalidades de cadastro e gestão de pacientes

## 🚀 Deploy no Vercel

### Passo 1: Preparar para Deploy

1. Certifique-se de que a aplicação está funcionando localmente
2. Faça commit de todas as mudanças:
```bash
git add .
git commit -m "Projeto pronto para deploy"
git push origin main
```

### Passo 2: Configurar no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Importe seu repositório do GitHub
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`: URL do seu projeto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Chave anon do Supabase
5. Clique em "Deploy"

### Passo 3: Configurar URLs no Supabase

1. Após o deploy, copie a URL do Vercel (ex: `https://clinica-piticos.vercel.app`)
2. No Supabase, vá para "Authentication" > "Settings"
3. Atualize a "Site URL" para a URL do Vercel
4. Adicione a URL em "Redirect URLs": `https://sua-url.vercel.app/**`

### Passo 4: Testar Deploy

1. Acesse a URL do Vercel
2. Teste todas as funcionalidades
3. Verifique se o login está funcionando corretamente

## 📁 Estrutura do Projeto

```
clinica-piticos/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes de UI (shadcn/ui)
│   │   ├── Login.jsx      # Tela de login
│   │   ├── Dashboard.jsx  # Dashboard principal
│   │   ├── Layout.jsx     # Layout da aplicação
│   │   ├── ListaPacientes.jsx     # Lista de pacientes
│   │   ├── CadastrarPaciente.jsx  # Cadastro de pacientes
│   │   ├── DetalhePaciente.jsx    # Detalhes do paciente
│   │   └── ConfigError.jsx        # Tela de erro de configuração
│   ├── contexts/          # Contextos React
│   │   └── AuthContext.jsx # Contexto de autenticação
│   ├── lib/               # Utilitários e configurações
│   │   └── supabase.js    # Cliente e APIs do Supabase
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos principais
│   └── main.jsx           # Ponto de entrada
├── .env.example           # Exemplo de variáveis de ambiente
├── supabase-schema.sql    # Script SQL para criar tabelas
├── package.json           # Dependências e scripts
└── README.md             # Este arquivo
```

## 📖 Uso da Aplicação

### Login
1. Acesse a aplicação
2. Digite o email e senha do terapeuta
3. Clique em "Entrar"

### Cadastrar Paciente
1. No dashboard, clique em "Cadastrar Paciente"
2. Preencha nome, data de nascimento e observações
3. Clique em "Cadastrar Paciente"

### Visualizar Pacientes
1. Clique em "Lista de Pacientes"
2. Use a busca para encontrar pacientes específicos
3. Clique em "Ver Detalhes" para mais informações

### Adicionar Evolução
1. Na página de detalhes do paciente
2. Clique em "Adicionar Evolução"
3. Preencha a data e descrição
4. Clique em "Salvar"

## 🔧 Troubleshooting

### Problemas Comuns

**Erro: "Configuração do Supabase Necessária"**
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o arquivo `.env` existe e está configurado
- Reinicie o servidor de desenvolvimento

**Erro de Login**
- Verifique se o usuário foi criado no Supabase
- Confirme se as URLs estão configuradas corretamente
- Verifique se o RLS está configurado nas tabelas

**Aplicação não carrega**
- Verifique se todas as dependências foram instaladas
- Confirme se o Node.js está na versão correta
- Verifique o console do navegador para erros

### Logs e Debug

Para verificar logs detalhados:

```bash
# Desenvolvimento
pnpm run dev

# Build
pnpm run build

# Preview da build
pnpm run preview
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação do Supabase
- Verifique a documentação do Vercel

---

**Desenvolvido com ❤️ para facilitar a gestão de pacientes em clínicas e consultórios.**


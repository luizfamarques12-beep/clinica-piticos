# 🚀 Guia Completo de Deploy - CLINICA PITICOS

Este guia fornece instruções detalhadas para fazer o deploy completo do sistema CLINICA PITICOS, desde a configuração do Supabase até a publicação no Vercel.

## 📋 Checklist Pré-Deploy

Antes de começar, certifique-se de ter:

- [ ] Conta no Supabase (gratuita)
- [ ] Conta no Vercel (gratuita)
- [ ] Conta no GitHub (para hospedar o código)
- [ ] Node.js instalado (versão 18+)
- [ ] Git configurado

## 🗄️ PARTE 1: Configuração do Supabase

### Etapa 1.1: Criar Projeto no Supabase

1. **Acesse o Supabase**
   - Vá para [supabase.com](https://supabase.com)
   - Clique em "Start your project"
   - Faça login ou crie uma conta

2. **Criar Novo Projeto**
   - Clique em "New Project"
   - Selecione sua organização (ou crie uma)
   - Preencha os dados:
     - **Name**: `clinica-piticos`
     - **Database Password**: Crie uma senha forte (anote!)
     - **Region**: Escolha a mais próxima (ex: South America)
   - Clique em "Create new project"

3. **Aguardar Criação**
   - O processo leva 2-3 minutos
   - Aguarde até ver o dashboard do projeto

### Etapa 1.2: Configurar Banco de Dados

1. **Acessar SQL Editor**
   - No menu lateral, clique em "SQL Editor"
   - Clique em "New query"

2. **Executar Script SQL**
   - Copie todo o conteúdo do arquivo `supabase-schema.sql`
   - Cole no editor SQL
   - Clique em "Run" (botão verde)
   - Aguarde a execução (deve aparecer "Success")

3. **Verificar Tabelas Criadas**
   - Vá para "Table Editor"
   - Você deve ver as tabelas: `terapeuta`, `paciente`, `evolucao`

### Etapa 1.3: Configurar Autenticação

1. **Acessar Configurações de Auth**
   - Vá para "Authentication" > "Settings"

2. **Configurar URLs (Desenvolvimento)**
   - **Site URL**: `http://localhost:5173`
   - **Redirect URLs**: `http://localhost:5173/**`
   - Clique em "Save"

3. **Criar Usuário Terapeuta**
   - Vá para "Authentication" > "Users"
   - Clique em "Add user"
   - Preencha:
     - **Email**: email do terapeuta
     - **Password**: senha segura
     - **Email Confirm**: marque como confirmado
   - Clique em "Create user"

### Etapa 1.4: Obter Credenciais

1. **Acessar Configurações da API**
   - Vá para "Settings" > "API"

2. **Copiar Informações**
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Anote essas informações!

## 💻 PARTE 2: Configuração Local

### Etapa 2.1: Preparar Ambiente

1. **Baixar o Projeto**
   ```bash
   # Se você tem o código
   cd clinica-piticos
   
   # Ou clone do repositório
   git clone <url-do-repositorio>
   cd clinica-piticos
   ```

2. **Instalar Dependências**
   ```bash
   # Usando pnpm (recomendado)
   pnpm install
   
   # Ou usando npm
   npm install
   ```

### Etapa 2.2: Configurar Variáveis de Ambiente

1. **Criar Arquivo .env**
   ```bash
   cp .env.example .env
   ```

2. **Editar .env**
   ```env
   VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-completa-aqui
   ```

### Etapa 2.3: Testar Localmente

1. **Iniciar Servidor**
   ```bash
   pnpm run dev
   ```

2. **Testar Aplicação**
   - Acesse `http://localhost:5173`
   - Faça login com as credenciais criadas
   - Teste cadastro de paciente
   - Teste adição de evolução

## 🌐 PARTE 3: Deploy no Vercel

### Etapa 3.1: Preparar Repositório

1. **Criar Repositório no GitHub**
   - Vá para [github.com](https://github.com)
   - Clique em "New repository"
   - Nome: `clinica-piticos`
   - Marque como "Public" ou "Private"
   - Clique em "Create repository"

2. **Fazer Push do Código**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - CLINICA PITICOS"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/clinica-piticos.git
   git push -u origin main
   ```

### Etapa 3.2: Deploy no Vercel

1. **Acessar Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login com GitHub

2. **Importar Projeto**
   - Clique em "New Project"
   - Encontre seu repositório `clinica-piticos`
   - Clique em "Import"

3. **Configurar Deploy**
   - **Project Name**: `clinica-piticos`
   - **Framework Preset**: Vite (deve detectar automaticamente)
   - **Root Directory**: `./` (padrão)

4. **Adicionar Variáveis de Ambiente**
   - Clique em "Environment Variables"
   - Adicione:
     - **Name**: `VITE_SUPABASE_URL`
     - **Value**: URL do seu projeto Supabase
   - Adicione:
     - **Name**: `VITE_SUPABASE_ANON_KEY`
     - **Value**: Chave anon do Supabase

5. **Fazer Deploy**
   - Clique em "Deploy"
   - Aguarde o processo (2-3 minutos)

### Etapa 3.3: Configurar URLs de Produção

1. **Copiar URL do Vercel**
   - Após o deploy, copie a URL (ex: `https://clinica-piticos.vercel.app`)

2. **Atualizar Supabase**
   - Volte ao Supabase
   - Vá para "Authentication" > "Settings"
   - Atualize:
     - **Site URL**: `https://clinica-piticos.vercel.app`
     - **Redirect URLs**: `https://clinica-piticos.vercel.app/**`
   - Clique em "Save"

## ✅ PARTE 4: Teste Final

### Etapa 4.1: Testar Aplicação em Produção

1. **Acessar URL do Vercel**
   - Abra a URL em uma nova aba
   - Verifique se carrega corretamente

2. **Testar Login**
   - Use as credenciais do terapeuta
   - Verifique se o login funciona

3. **Testar Funcionalidades**
   - Cadastre um paciente de teste
   - Adicione uma evolução
   - Teste a busca de pacientes

### Etapa 4.2: Verificar Responsividade

1. **Teste em Desktop**
   - Verifique layout e funcionalidades

2. **Teste em Mobile**
   - Use as ferramentas de desenvolvedor
   - Ou acesse pelo celular

## 🔧 Troubleshooting

### Problemas Comuns e Soluções

**1. Erro "Configuração do Supabase Necessária"**
```
Solução:
- Verifique se as variáveis de ambiente estão corretas no Vercel
- Confirme se não há espaços extras nas chaves
- Redeploy a aplicação no Vercel
```

**2. Erro de Login**
```
Solução:
- Verifique se as URLs estão corretas no Supabase
- Confirme se o usuário foi criado corretamente
- Verifique se o email foi confirmado
```

**3. Deploy Falha no Vercel**
```
Solução:
- Verifique se todas as dependências estão no package.json
- Confirme se não há erros de sintaxe no código
- Verifique os logs de build no Vercel
```

**4. Aplicação Carrega mas Não Funciona**
```
Solução:
- Abra o console do navegador (F12)
- Verifique se há erros JavaScript
- Confirme se as variáveis de ambiente estão definidas
```

## 📱 Configurações Adicionais

### Configurar Domínio Personalizado (Opcional)

1. **No Vercel**
   - Vá para "Settings" > "Domains"
   - Adicione seu domínio personalizado
   - Configure DNS conforme instruções

2. **Atualizar Supabase**
   - Atualize as URLs para o novo domínio

### Configurar Analytics (Opcional)

1. **Vercel Analytics**
   - Vá para "Analytics" no dashboard do Vercel
   - Ative o analytics

## 🎉 Conclusão

Parabéns! Seu sistema CLINICA PITICOS está agora:

- ✅ Hospedado no Vercel
- ✅ Conectado ao Supabase
- ✅ Funcionando em produção
- ✅ Acessível via URL pública

### Próximos Passos

1. **Compartilhe a URL** com os usuários
2. **Faça backup** das credenciais importantes
3. **Configure monitoramento** se necessário
4. **Documente** qualquer customização adicional

### URLs Importantes para Salvar

- **Aplicação**: `https://seu-projeto.vercel.app`
- **Supabase Dashboard**: `https://app.supabase.com/project/seu-id`
- **Vercel Dashboard**: `https://vercel.com/seu-usuario/clinica-piticos`

---

**🚀 Seu sistema está no ar e pronto para uso!**


# 🛠️ Guia de Desenvolvimento - CLINICA PITICOS

Este documento fornece informações técnicas para desenvolvedores que desejam contribuir ou modificar o sistema CLINICA PITICOS.

## 🏗️ Arquitetura do Sistema

### Frontend (React + Vite)
- **React 19.1.0**: Biblioteca principal para construção da interface
- **Vite**: Build tool moderno e rápido
- **React Router DOM**: Gerenciamento de rotas
- **Tailwind CSS**: Framework CSS utilitário
- **shadcn/ui**: Componentes de interface pré-construídos

### Backend (Supabase)
- **PostgreSQL**: Banco de dados relacional
- **Supabase Auth**: Sistema de autenticação
- **Row Level Security**: Segurança a nível de linha
- **Real-time**: Atualizações em tempo real (futuro)

## 📁 Estrutura Detalhada

```
src/
├── components/
│   ├── ui/                    # Componentes base do shadcn/ui
│   │   ├── button.jsx
│   │   ├── input.jsx
│   │   ├── card.jsx
│   │   └── ...
│   ├── Login.jsx              # Componente de autenticação
│   ├── Dashboard.jsx          # Página principal
│   ├── Layout.jsx             # Layout base da aplicação
│   ├── ListaPacientes.jsx     # Listagem de pacientes
│   ├── CadastrarPaciente.jsx  # Formulário de cadastro
│   ├── DetalhePaciente.jsx    # Detalhes e evoluções
│   └── ConfigError.jsx        # Tela de erro de configuração
├── contexts/
│   └── AuthContext.jsx        # Contexto de autenticação global
├── lib/
│   └── supabase.js           # Cliente Supabase e APIs
├── App.jsx                   # Componente raiz e roteamento
├── App.css                   # Estilos globais e Tailwind
└── main.jsx                  # Ponto de entrada da aplicação
```

## 🔧 Configuração do Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm
- Git
- Editor de código (VS Code recomendado)

### Extensões Recomendadas para VS Code
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev          # Inicia servidor de desenvolvimento

# Build
pnpm run build        # Gera build de produção
pnpm run preview      # Preview da build local

# Linting
pnpm run lint         # Executa ESLint
```

## 🗃️ Modelo de Dados

### Tabela: terapeuta
```sql
id              UUID PRIMARY KEY
nome            TEXT NOT NULL
email           TEXT UNIQUE NOT NULL
criado_em       TIMESTAMP WITH TIME ZONE
atualizado_em   TIMESTAMP WITH TIME ZONE
```

### Tabela: paciente
```sql
id              UUID PRIMARY KEY
nome            TEXT NOT NULL
data_nascimento DATE NOT NULL
observacoes     TEXT
criado_em       TIMESTAMP WITH TIME ZONE
atualizado_em   TIMESTAMP WITH TIME ZONE
```

### Tabela: evolucao
```sql
id              UUID PRIMARY KEY
paciente_id     UUID REFERENCES paciente(id)
data            DATE
descricao       TEXT NOT NULL
criado_em       TIMESTAMP WITH TIME ZONE
atualizado_em   TIMESTAMP WITH TIME ZONE
```

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação
1. Usuário insere email/senha
2. Supabase Auth valida credenciais
3. Token JWT é retornado
4. Token é armazenado no localStorage
5. Contexto de autenticação é atualizado
6. Usuário é redirecionado para dashboard

### Proteção de Rotas
```jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  return isAuthenticated ? children : <Navigate to="/login" />
}
```

## 🎨 Sistema de Design

### Cores Principais
```css
/* Azul principal */
--blue-50: #eff6ff
--blue-100: #dbeafe
--blue-900: #1e3a8a

/* Gradientes */
background: linear-gradient(to bottom right, #eff6ff, #e0e7ff)
```

### Componentes Reutilizáveis

#### Button
```jsx
<Button variant="default|outline|destructive" size="sm|default|lg">
  Texto do botão
</Button>
```

#### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo do card
  </CardContent>
</Card>
```

## 🔄 Gerenciamento de Estado

### Context API
O estado global é gerenciado através do Context API do React:

```jsx
// AuthContext.jsx
const AuthContext = createContext({
  user: null,
  loading: false,
  signIn: () => {},
  signOut: () => {},
  isAuthenticated: false
})
```

### Estado Local
Estados locais são gerenciados com `useState` para:
- Formulários
- Loading states
- Dados temporários
- UI states

## 📡 Integração com Supabase

### Cliente Supabase
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)
```

### Padrão de API
```javascript
export const pacientesAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('paciente')
      .select('*')
      .order('nome', { ascending: true })
    return { data, error }
  },
  
  create: async (paciente) => {
    const { data, error } = await supabase
      .from('paciente')
      .insert([paciente])
      .select()
      .single()
    return { data, error }
  }
}
```

## 🧪 Testes (Futuro)

### Estrutura de Testes Planejada
```
tests/
├── components/
├── contexts/
├── lib/
└── utils/
```

### Ferramentas Recomendadas
- **Vitest**: Framework de testes
- **React Testing Library**: Testes de componentes
- **MSW**: Mock Service Worker para APIs

## 🚀 Deploy e CI/CD

### Vercel Configuration
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite"
}
```

### Variáveis de Ambiente
```bash
# Desenvolvimento (.env)
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=local-key

# Produção (Vercel)
VITE_SUPABASE_URL=https://projeto.supabase.co
VITE_SUPABASE_ANON_KEY=production-key
```

## 🔍 Debugging

### Console Logs
```javascript
// Desenvolvimento
console.log('Debug info:', data)

// Produção (remover)
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data)
}
```

### React DevTools
- Instale a extensão React DevTools
- Use para inspecionar componentes e estado

### Supabase Logs
- Acesse o dashboard do Supabase
- Vá para "Logs" para ver queries e erros

## 📈 Performance

### Otimizações Implementadas
- **Code Splitting**: Rotas carregadas sob demanda
- **Lazy Loading**: Componentes carregados quando necessário
- **Memoization**: React.memo em componentes pesados

### Métricas Importantes
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Segurança

### Row Level Security (RLS)
```sql
-- Política para pacientes
CREATE POLICY "Usuários autenticados podem gerenciar pacientes" 
ON paciente FOR ALL 
USING (auth.role() = 'authenticated');
```

### Validação de Dados
- Validação no frontend (UX)
- Validação no backend (Supabase)
- Sanitização de inputs

## 🐛 Troubleshooting Comum

### Erro: "Module not found"
```bash
# Limpar cache e reinstalar
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Erro: "Supabase connection failed"
```javascript
// Verificar configuração
console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY)
```

### Erro: "Build failed"
```bash
# Verificar sintaxe
pnpm run lint

# Build local
pnpm run build
```

## 🤝 Contribuindo

### Fluxo de Contribuição
1. Fork do repositório
2. Criar branch feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit das mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abrir Pull Request

### Padrões de Código
- Use Prettier para formatação
- Siga as convenções do ESLint
- Nomes de componentes em PascalCase
- Nomes de funções em camelCase
- Comentários em português

### Commit Messages
```
feat: adiciona nova funcionalidade
fix: corrige bug específico
docs: atualiza documentação
style: ajustes de formatação
refactor: refatora código existente
test: adiciona ou corrige testes
```

## 📚 Recursos Adicionais

### Documentação
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

### Comunidade
- [React Discord](https://discord.gg/react)
- [Supabase Discord](https://discord.supabase.com/)
- [Tailwind Discord](https://discord.gg/tailwindcss)

---

**Happy coding! 🚀**


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ListaPacientes from './components/ListaPacientes'
import CadastrarPaciente from './components/CadastrarPaciente'
import DetalhePaciente from './components/DetalhePaciente'
import ConfigError from './components/ConfigError'
import { Loader2 } from 'lucide-react'
import './App.css'

// Verificar se as configurações do Supabase estão definidas
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  return url && key && 
         url !== 'https://your-project-id.supabase.co' && 
         key !== 'your-anon-key-here'
}

// Componente para proteger rotas que precisam de autenticação
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Componente para redirecionar usuários autenticados da página de login
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

// Componente para a página de detalhes do paciente
const PacienteDetalhePage = () => {
  const params = new URLSearchParams(window.location.search)
  const pacienteId = window.location.pathname.split('/').pop()
  
  return <DetalhePaciente pacienteId={pacienteId} />
}

function App() {
  // Verificar se o Supabase está configurado
  if (!isSupabaseConfigured()) {
    return <ConfigError />
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rota pública - Login */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* Rotas protegidas */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/pacientes" 
              element={
                <ProtectedRoute>
                  <ListaPacientes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/cadastrar-paciente" 
              element={
                <ProtectedRoute>
                  <CadastrarPaciente />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/paciente/:id" 
              element={
                <ProtectedRoute>
                  <PacienteDetalhePage />
                </ProtectedRoute>
              } 
            />

            {/* Rota raiz - redireciona para dashboard se autenticado, senão para login */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />

            {/* Rota 404 - redireciona para dashboard */}
            <Route 
              path="*" 
              element={<Navigate to="/dashboard" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


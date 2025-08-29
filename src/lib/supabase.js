import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
// IMPORTANTE: Substitua estas variáveis pelas suas chaves do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mokmicrmepgicjybtsyw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1va21pY3JtZXBnaWNqeWJ0c3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMzIwOTIsImV4cCI6MjA3MTkwODA5Mn0._3TFhxpkJgdAr-yl9cshPRkz5jSYFiktKngQJ7i3XN0'

// Criar cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funções de autenticação
export const auth = {
  // Login com email e senha
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Obter usuário atual
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Verificar se usuário está logado
  isAuthenticated: async () => {
    const { user } = await auth.getCurrentUser()
    return !!user
  }
}

// Funções para gerenciar pacientes
export const pacientesAPI = {
  // Listar todos os pacientes
  getAll: async () => {
    const { data, error } = await supabase
      .from('paciente')
      .select('*')
      .order('nome', { ascending: true })
    return { data, error }
  },

  // Obter paciente por ID
  getById: async (id) => {
    const { data, error } = await supabase
      .from('paciente')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  // Criar novo paciente
  create: async (paciente) => {
    const { data, error } = await supabase
      .from('paciente')
      .insert([paciente])
      .select()
      .single()
    return { data, error }
  },

  // Atualizar paciente
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('paciente')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  // Deletar paciente
  delete: async (id) => {
    const { error } = await supabase
      .from('paciente')
      .delete()
      .eq('id', id)
    return { error }
  }
}

// Funções para gerenciar evoluções
export const evolucoesAPI = {
  // Listar evoluções de um paciente
  getByPacienteId: async (pacienteId) => {
    const { data, error } = await supabase
      .from('evolucao')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('data', { ascending: false })
    return { data, error }
  },

  // Criar nova evolução
  create: async (evolucao) => {
    const { data, error } = await supabase
      .from('evolucao')
      .insert([evolucao])
      .select()
      .single()
    return { data, error }
  },

  // Atualizar evolução
  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('evolucao')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  // Deletar evolução
  delete: async (id) => {
    const { error } = await supabase
      .from('evolucao')
      .delete()
      .eq('id', id)
    return { error }
  }
}


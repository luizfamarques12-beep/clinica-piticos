import { useState, useEffect } from 'react'
import { pacientesAPI } from '../lib/supabase'
import Layout from './Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Search, 
  UserPlus, 
  Eye, 
  Calendar,
  Users,
  Loader2,
  AlertCircle
} from 'lucide-react'

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([])
  const [filteredPacientes, setFilteredPacientes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPacientes()
  }, [])

  useEffect(() => {
    // Filtrar pacientes baseado no termo de busca
    if (searchTerm.trim() === '') {
      setFilteredPacientes(pacientes)
    } else {
      const filtered = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPacientes(filtered)
    }
  }, [searchTerm, pacientes])

  const loadPacientes = async () => {
    try {
      setLoading(true)
      const { data, error } = await pacientesAPI.getAll()
      
      if (error) {
        throw error
      }

      setPacientes(data || [])
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error)
      setError('Erro ao carregar lista de pacientes')
    } finally {
      setLoading(false)
    }
  }

  const calculateAge = (dataNascimento) => {
    const birth = new Date(dataNascimento)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const handleViewPaciente = (pacienteId) => {
    window.location.href = `/paciente/${pacienteId}`
  }

  const handleNewPaciente = () => {
    window.location.href = '/cadastrar-paciente'
  }

  if (loading) {
    return (
      <Layout currentPage="pacientes">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Carregando pacientes...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout currentPage="pacientes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Lista de Pacientes
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie e visualize todos os pacientes cadastrados
            </p>
          </div>
          <Button onClick={handleNewPaciente} className="w-full sm:w-auto">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Paciente
          </Button>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar paciente por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="ml-2">
                  <p className="text-sm font-medium">Total</p>
                  <p className="text-2xl font-bold">{pacientes.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Pacientes List */}
        {filteredPacientes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Tente ajustar os termos da busca'
                    : 'Comece cadastrando seu primeiro paciente'
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={handleNewPaciente}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar Primeiro Paciente
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacientes.map((paciente) => (
              <Card key={paciente.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{paciente.nome}</CardTitle>
                      <CardDescription className="mt-1">
                        {calculateAge(paciente.data_nascimento)} anos
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      Ativo
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Nascimento: {formatDate(paciente.data_nascimento)}
                    </div>
                    
                    {paciente.observacoes && (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium mb-1">Observações:</p>
                        <p className="line-clamp-2">{paciente.observacoes}</p>
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      Cadastrado em: {formatDate(paciente.criado_em)}
                    </div>

                    <Button 
                      className="w-full mt-4"
                      onClick={() => handleViewPaciente(paciente.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Results Info */}
        {searchTerm && filteredPacientes.length > 0 && (
          <div className="text-center text-sm text-gray-600">
            Mostrando {filteredPacientes.length} de {pacientes.length} pacientes
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ListaPacientes


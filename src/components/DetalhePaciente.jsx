import { useState, useEffect } from 'react'
import { pacientesAPI, evolucoesAPI } from '../lib/supabase'
import Layout from './Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  ArrowLeft, 
  Calendar, 
  Plus, 
  FileText,
  Loader2,
  AlertCircle,
  Save,
  User,
  Clock
} from 'lucide-react'

const DetalhePaciente = ({ pacienteId }) => {
  const [paciente, setPaciente] = useState(null)
  const [evolucoes, setEvolucoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddEvolucao, setShowAddEvolucao] = useState(false)
  const [novaEvolucao, setNovaEvolucao] = useState({
    data: new Date().toISOString().split('T')[0],
    descricao: ''
  })
  const [savingEvolucao, setSavingEvolucao] = useState(false)

  useEffect(() => {
    if (pacienteId) {
      loadPacienteData()
    }
  }, [pacienteId])

  const loadPacienteData = async () => {
    try {
      setLoading(true)
      
      // Carregar dados do paciente
      const { data: pacienteData, error: pacienteError } = await pacientesAPI.getById(pacienteId)
      if (pacienteError) throw pacienteError
      
      // Carregar evoluções do paciente
      const { data: evolucoesData, error: evolucoesError } = await evolucoesAPI.getByPacienteId(pacienteId)
      if (evolucoesError) throw evolucoesError

      setPaciente(pacienteData)
      setEvolucoes(evolucoesData || [])
    } catch (error) {
      console.error('Erro ao carregar dados do paciente:', error)
      setError('Erro ao carregar dados do paciente')
    } finally {
      setLoading(false)
    }
  }

  const handleAddEvolucao = async (e) => {
    e.preventDefault()
    
    if (!novaEvolucao.descricao.trim()) {
      setError('Descrição da evolução é obrigatória')
      return
    }

    setSavingEvolucao(true)
    setError('')

    try {
      const { data, error } = await evolucoesAPI.create({
        paciente_id: pacienteId,
        data: novaEvolucao.data,
        descricao: novaEvolucao.descricao.trim()
      })

      if (error) throw error

      // Atualizar lista de evoluções
      setEvolucoes(prev => [data, ...prev])
      
      // Resetar formulário
      setNovaEvolucao({
        data: new Date().toISOString().split('T')[0],
        descricao: ''
      })
      
      setShowAddEvolucao(false)
    } catch (error) {
      console.error('Erro ao adicionar evolução:', error)
      setError('Erro ao adicionar evolução')
    } finally {
      setSavingEvolucao(false)
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

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  const handleBack = () => {
    window.location.href = '/pacientes'
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Carregando dados do paciente...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!paciente) {
    return (
      <Layout>
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Paciente não encontrado</h2>
          <p className="text-gray-600 mb-6">O paciente solicitado não foi encontrado.</p>
          <Button onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Lista
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button
              variant="outline"
              onClick={handleBack}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              {paciente.nome}
            </h1>
            <p className="text-gray-600 mt-1">
              Detalhes do paciente e histórico de evoluções
            </p>
          </div>
          
          <Dialog open={showAddEvolucao} onOpenChange={setShowAddEvolucao}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Evolução
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Nova Evolução</DialogTitle>
                <DialogDescription>
                  Adicione uma nova evolução para {paciente.nome}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEvolucao} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={novaEvolucao.data}
                    onChange={(e) => setNovaEvolucao(prev => ({ ...prev, data: e.target.value }))}
                    disabled={savingEvolucao}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva a evolução do paciente..."
                    value={novaEvolucao.descricao}
                    onChange={(e) => setNovaEvolucao(prev => ({ ...prev, descricao: e.target.value }))}
                    disabled={savingEvolucao}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddEvolucao(false)}
                    disabled={savingEvolucao}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={savingEvolucao}
                    className="flex-1"
                  >
                    {savingEvolucao ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informações do Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-500">Nome Completo</Label>
                <p className="text-lg font-medium">{paciente.nome}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Idade</Label>
                <p className="text-lg font-medium">{calculateAge(paciente.data_nascimento)} anos</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Data de Nascimento</Label>
                <p className="text-lg font-medium">{formatDate(paciente.data_nascimento)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Cadastrado em</Label>
                <p className="text-lg font-medium">{formatDate(paciente.criado_em)}</p>
              </div>
              {paciente.observacoes && (
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Observações</Label>
                  <p className="text-base mt-1">{paciente.observacoes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Evoluções */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Histórico de Evoluções
                </CardTitle>
                <CardDescription>
                  {evolucoes.length} evolução(ões) registrada(s)
                </CardDescription>
              </div>
              <Badge variant="secondary">
                {evolucoes.length} registros
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {evolucoes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma evolução registrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Comece adicionando a primeira evolução deste paciente
                </p>
                <Button onClick={() => setShowAddEvolucao(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeira Evolução
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {evolucoes.map((evolucao) => (
                  <div key={evolucao.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(evolucao.data)}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDateTime(evolucao.criado_em)}
                      </div>
                    </div>
                    <p className="text-gray-900 whitespace-pre-wrap">{evolucao.descricao}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default DetalhePaciente


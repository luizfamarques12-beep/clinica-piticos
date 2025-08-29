import { useState } from 'react'
import { pacientesAPI } from '../lib/supabase'
import Layout from './Layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Save, ArrowLeft, CheckCircle } from 'lucide-react'

const CadastrarPaciente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    observacoes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validações
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório')
      return
    }

    if (!formData.data_nascimento) {
      setError('Data de nascimento é obrigatória')
      return
    }

    // Verificar se a data não é futura
    const dataNascimento = new Date(formData.data_nascimento)
    const hoje = new Date()
    if (dataNascimento > hoje) {
      setError('Data de nascimento não pode ser futura')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await pacientesAPI.create({
        nome: formData.nome.trim(),
        data_nascimento: formData.data_nascimento,
        observacoes: formData.observacoes.trim() || null
      })

      if (error) {
        throw error
      }

      setSuccess(true)
      setFormData({
        nome: '',
        data_nascimento: '',
        observacoes: ''
      })

      // Redirecionar após 2 segundos
      setTimeout(() => {
        window.location.href = '/pacientes'
      }, 2000)

    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error)
      setError('Erro ao cadastrar paciente. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    window.location.href = '/pacientes'
  }

  if (success) {
    return (
      <Layout currentPage="cadastrar">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Paciente Cadastrado com Sucesso!
                </h2>
                <p className="text-gray-600 mb-6">
                  O paciente foi adicionado ao sistema e você será redirecionado para a lista de pacientes.
                </p>
                <Button onClick={handleBack}>
                  Ver Lista de Pacientes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout currentPage="cadastrar">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Cadastrar Novo Paciente
          </h1>
          <p className="text-gray-600 mt-2">
            Preencha as informações do paciente para adicioná-lo ao sistema.
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Informações do Paciente</CardTitle>
            <CardDescription>
              Todos os campos marcados com * são obrigatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite o nome completo do paciente"
                  value={formData.nome}
                  onChange={handleChange}
                  disabled={loading}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_nascimento">Data de Nascimento *</Label>
                <Input
                  id="data_nascimento"
                  name="data_nascimento"
                  type="date"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                  disabled={loading}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  placeholder="Observações sobre o paciente (opcional)"
                  value={formData.observacoes}
                  onChange={handleChange}
                  disabled={loading}
                  rows={4}
                  className="text-base resize-none"
                />
                <p className="text-sm text-gray-500">
                  Informações adicionais sobre o histórico, condições especiais, etc.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Cadastrar Paciente
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default CadastrarPaciente


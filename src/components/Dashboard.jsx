import { useState, useEffect } from 'react'
import { pacientesAPI } from '../lib/supabase'
import Layout from './Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, UserPlus, Calendar, TrendingUp } from 'lucide-react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPacientes: 0,
    pacientesRecentes: 0,
    loading: true
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const { data: pacientes, error } = await pacientesAPI.getAll()
      
      if (error) {
        console.error('Erro ao carregar estatísticas:', error)
        return
      }

      // Calcular pacientes recentes (últimos 30 dias)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const pacientesRecentes = pacientes?.filter(paciente => 
        new Date(paciente.criado_em) >= thirtyDaysAgo
      ).length || 0

      setStats({
        totalPacientes: pacientes?.length || 0,
        pacientesRecentes,
        loading: false
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  const quickActions = [
    {
      title: 'Cadastrar Paciente',
      description: 'Adicionar novo paciente ao sistema',
      icon: UserPlus,
      href: '/cadastrar-paciente',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Ver Pacientes',
      description: 'Visualizar lista de todos os pacientes',
      icon: Users,
      href: '/pacientes',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ]

  return (
    <Layout currentPage="dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vinda ao Dashboard
          </h2>
          <p className="text-gray-600">
            Gerencie seus pacientes e acompanhe suas evoluções de forma simples e eficiente.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Pacientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.loading ? '...' : stats.totalPacientes}
              </div>
              <p className="text-xs text-muted-foreground">
                Pacientes cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Novos Pacientes
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.loading ? '...' : stats.pacientesRecentes}
              </div>
              <p className="text-xs text-muted-foreground">
                Últimos 30 dias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Consultas Hoje
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Agendamentos do dia
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Evolução
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">
                Pacientes com progresso
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => window.location.href = action.href}
                    >
                      Acessar
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma atividade recente</p>
              <p className="text-sm">As ações aparecerão aqui conforme você usar o sistema</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard


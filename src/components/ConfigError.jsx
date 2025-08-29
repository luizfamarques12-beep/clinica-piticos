import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, Settings, ExternalLink } from 'lucide-react'

const ConfigError = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            CLINICA PITICOS
          </h1>
          <p className="text-gray-600">
            Sistema de Gestão de Pacientes
          </p>
        </div>

        {/* Error Card */}
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-yellow-100 rounded-full w-fit">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl text-gray-900">
              Configuração do Supabase Necessária
            </CardTitle>
            <CardDescription>
              Para usar a aplicação, você precisa configurar as credenciais do Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Settings className="h-4 w-4" />
              <AlertDescription>
                <strong>Aplicação em modo de demonstração</strong><br />
                As configurações do Supabase não foram definidas. Para usar a aplicação completa, 
                siga o guia de configuração fornecido.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Passos para configurar:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Crie uma conta no Supabase (supabase.com)</li>
                <li>Crie um novo projeto</li>
                <li>Execute o script SQL fornecido</li>
                <li>Configure as variáveis de ambiente</li>
                <li>Reinicie a aplicação</li>
              </ol>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Arquivos importantes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>supabase-schema.sql</code> - Script para criar as tabelas</li>
                <li>• <code>.env.example</code> - Exemplo de configuração</li>
                <li>• <code>README.md</code> - Guia completo de instalação</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Consulte a documentação completa para instruções detalhadas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 CLINICA PITICOS - Sistema de Gestão de Pacientes</p>
        </div>
      </div>
    </div>
  )
}

export default ConfigError


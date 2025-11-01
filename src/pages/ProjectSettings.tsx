import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, FileText, Pin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/contexts/ProjectContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ProjectSettings() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Projeto não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar ao Dashboard</Button>
        </div>
      </div>
    );
  }

  const pinnedMessage = project.messages.find(m => m.isPinned);

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
      deleteProject(id!);
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button variant="ghost" onClick={() => navigate(`/projeto/${id}`)} className="mb-6 gap-2">
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Chat
      </Button>

      <div className="space-y-6">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>
                  Criado {formatDistanceToNow(project.createdAt, { addSuffix: true, locale: ptBR })}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Link to={`/projeto/${id}/editar`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-1">Descrição</h3>
              <p className="text-sm text-muted-foreground">{project.description || 'Sem descrição'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-foreground mb-1">Instruções para IA</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {project.instructions || 'Sem instruções especiais'}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-foreground mb-2">
                Arquivos ({project.files.length})
              </h3>
              {project.files.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum arquivo adicionado</p>
              ) : (
                <div className="space-y-2">
                  {project.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted"
                    >
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pin className="w-5 h-5 text-success" />
              Cronograma Atual
            </CardTitle>
            <CardDescription>
              Cronograma de estudos fixado para este projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pinnedMessage ? (
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Ativo
                </Badge>
                <div className="p-4 rounded-lg bg-gradient-card border border-border">
                  <div className="prose prose-sm max-w-none text-foreground">
                    {pinnedMessage.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 last:mb-0 whitespace-pre-wrap">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Fixado {formatDistanceToNow(pinnedMessage.timestamp, { addSuffix: true, locale: ptBR })}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Pin className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground mb-4">
                  Nenhum cronograma fixado ainda
                </p>
                <Button onClick={() => navigate(`/projeto/${id}`)} variant="outline">
                  Ir para o Chat
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

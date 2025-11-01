import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Settings, Pin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';
import { useProjects } from '@/contexts/ProjectContext';
import { Badge } from '@/components/ui/badge';

export default function ProjectChat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addMessage, pinMessage } = useProjects();

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

  const handleSendMessage = (content: string) => {
    addMessage(id!, { role: 'user', content });

    // Simular resposta da IA (em produção, isso virá do backend)
    setTimeout(() => {
      const responses = [
        'Entendi! Vou te ajudar com isso. Baseado nas suas informações, posso criar um cronograma personalizado. Quanto tempo você tem disponível por semana?',
        'Excelente pergunta! Vamos abordar esse tópico com base no material do projeto. Pode me dar mais detalhes sobre o que especificamente você gostaria de entender?',
        'Claro! Aqui está minha sugestão baseada no contexto do seu projeto...',
      ];
      addMessage(id!, {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
      });
    }, 1000);
  };

  const handlePinMessage = (messageId: string) => {
    pinMessage(id!, messageId);
  };

  const hasPinnedSchedule = project.messages.some(m => m.isPinned);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border bg-card p-4 sticky top-14 z-10">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{project.name}</h1>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasPinnedSchedule && (
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Calendar className="w-3 h-3 mr-1" />
                Cronograma Ativo
              </Badge>
            )}
            <Link to={`/projeto/${id}/configuracoes`}>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <ChatContainer
        messages={project.messages}
        onPinMessage={handlePinMessage}
        showPinButtons={true}
      />

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}

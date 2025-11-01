import { Sparkles } from 'lucide-react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';
import { useProjects } from '@/contexts/ProjectContext';
import { Badge } from '@/components/ui/badge';

export default function GeneralAssistant() {
  const { generalMessages, addGeneralMessage, projects } = useProjects();

  const handleSendMessage = (content: string) => {
    addGeneralMessage({ role: 'user', content });

    // Simular resposta da IA com contexto geral
    setTimeout(() => {
      const responses = [
        `Olhando seus ${projects.length} projetos, posso ajudar a criar conexões entre os tópicos. O que você gostaria de saber?`,
        'Com base em todos os seus projetos de estudo, vejo algumas oportunidades de aprendizado integrado. Me conte mais sobre sua dúvida.',
        'Analisando seu portfólio de estudos completo, posso sugerir algumas abordagens. Sobre qual projeto você quer conversar?',
      ];
      addGeneralMessage({
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
      });
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border bg-card p-4 sticky top-14 z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Assistente Geral</h1>
              <p className="text-sm text-muted-foreground">
                Visão completa de todos os seus projetos de estudo
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
            </Badge>
          </div>
        </div>
      </div>

      <ChatContainer messages={generalMessages} showPinButtons={false} />

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}

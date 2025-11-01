import { useEffect, useRef } from 'react';
import { Message } from '@/contexts/ProjectContext';
import { ChatMessage } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatContainerProps {
  messages: Message[];
  onPinMessage?: (messageId: string) => void;
  showPinButtons?: boolean;
}

export function ChatContainer({ messages, onPinMessage, showPinButtons }: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Comece a Conversar
          </h3>
          <p className="text-muted-foreground text-sm">
            Envie uma mensagem para iniciar a conversa com o assistente de IA.
            Você pode pedir ajuda com seus estudos ou solicitar a criação de um cronograma.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-4xl mx-auto">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            onPin={onPinMessage ? () => onPinMessage(message.id) : undefined}
            showPinButton={showPinButtons}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}

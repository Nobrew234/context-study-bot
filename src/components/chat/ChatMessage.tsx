import { Message } from '@/contexts/ProjectContext';
import { Bot, User, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChatMessageProps {
  message: Message;
  onPin?: () => void;
  showPinButton?: boolean;
}

export function ChatMessage({ message, onPin, showPinButton }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex gap-3 p-4 rounded-lg animate-fade-in ${
        isAssistant ? 'bg-muted/50' : 'bg-card'
      } ${message.isPinned ? 'ring-2 ring-success shadow-md' : ''}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAssistant ? 'bg-primary' : 'bg-secondary'
        }`}
      >
        {isAssistant ? (
          <Bot className="w-5 h-5 text-primary-foreground" />
        ) : (
          <User className="w-5 h-5 text-secondary-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm text-foreground">
            {isAssistant ? 'Assistente' : 'Você'}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(message.timestamp, { addSuffix: true, locale: ptBR })}
          </span>
          {message.isPinned && (
            <span className="flex items-center gap-1 text-xs text-success font-medium">
              <Pin className="w-3 h-3" />
              Cronograma Fixado
            </span>
          )}
        </div>

        <div className="prose prose-sm max-w-none text-foreground">
          {message.content.split('\n').map((line, i) => (
            <p key={i} className="mb-2 last:mb-0 whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>

        {showPinButton && isAssistant && !message.isPinned && onPin && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPin}
            className="mt-3 text-xs"
          >
            <Pin className="w-3 h-3 mr-1" />
            Fixar como Cronograma
          </Button>
        )}

        {message.isPinned && onPin && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPin}
            className="mt-3 text-xs border-success text-success hover:bg-success/10"
          >
            <Pin className="w-3 h-3 mr-1" />
            Desfixar Cronograma
          </Button>
        )}
      </div>
    </div>
  );
}

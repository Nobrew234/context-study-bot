import { Link } from 'react-router-dom';
import { BookOpen, Calendar, FileText, Pin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/contexts/ProjectContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const hasPinnedSchedule = project.messages.some(m => m.isPinned);
  const messageCount = project.messages.length;

  return (
    <Link to={`/projeto/${project.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50 animate-fade-in">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              {hasPinnedSchedule && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  <Pin className="w-3 h-3 mr-1" />
                  Cronograma
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className="mt-2 text-foreground group-hover:text-primary transition-colors">
            {project.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{project.files.length} arquivos</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDistanceToNow(project.createdAt, { addSuffix: true, locale: ptBR })}
              </span>
            </div>
          </div>
          {messageCount > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                {messageCount} {messageCount === 1 ? 'mensagem' : 'mensagens'} no chat
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

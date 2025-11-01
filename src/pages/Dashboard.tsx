import { Link } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/project/ProjectCard';
import { useProjects } from '@/contexts/ProjectContext';

export default function Dashboard() {
  const { projects } = useProjects();

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            Meus Projetos de Estudo
          </h1>
          <Link to="/projeto/novo">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Projeto
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground">
          Organize seus estudos em projetos e crie cronogramas personalizados com IA
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-fade-in">
            <Plus className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Nenhum projeto ainda
          </h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Crie seu primeiro projeto de estudo e comece a organizar seu aprendizado com a ajuda da IA
          </p>
          <Link to="/projeto/novo">
            <Button size="lg" className="gap-2">
              <Plus className="w-5 h-5" />
              Criar Primeiro Projeto
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

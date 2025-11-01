import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  MessageSquare,
  FolderOpen,
  Sparkles,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useProjects } from '@/contexts/ProjectContext';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { projects } = useProjects();

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
      : 'hover:bg-sidebar-accent/50 text-sidebar-foreground';

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">StudyIA</h2>
            <p className="text-xs text-sidebar-foreground/70">Sistema de Estudos</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" end className={getNavClass}>
                    <FolderOpen className="w-4 h-4" />
                    <span>Meus Projetos</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/assistente-geral" className={getNavClass}>
                    <MessageSquare className="w-4 h-4" />
                    <span>Assistente Geral</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-2">
            <SidebarGroupLabel className="text-sidebar-foreground/70">
              Projetos ({projects.length})
            </SidebarGroupLabel>
            <NavLink to="/projeto/novo">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </NavLink>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.length === 0 ? (
                <div className="px-2 py-4 text-sm text-sidebar-foreground/50 text-center">
                  Nenhum projeto ainda
                </div>
              ) : (
                projects.map(project => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={`/projeto/${project.id}`}
                        className={getNavClass}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span className="truncate">{project.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          Powered by AI ✨
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

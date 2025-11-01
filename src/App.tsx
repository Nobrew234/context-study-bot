import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ProjectForm from "./pages/ProjectForm";
import ProjectChat from "./pages/ProjectChat";
import ProjectSettings from "./pages/ProjectSettings";
import GeneralAssistant from "./pages/GeneralAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProjectProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projeto/novo" element={<ProjectForm />} />
              <Route path="/projeto/:id" element={<ProjectChat />} />
              <Route path="/projeto/:id/editar" element={<ProjectForm />} />
              <Route path="/projeto/:id/configuracoes" element={<ProjectSettings />} />
              <Route path="/assistente-geral" element={<GeneralAssistant />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ProjectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

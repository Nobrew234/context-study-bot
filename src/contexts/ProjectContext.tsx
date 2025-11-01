import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isPinned?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  instructions: string;
  files: string[];
  messages: Message[];
  createdAt: Date;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'messages'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addMessage: (projectId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  pinMessage: (projectId: string, messageId: string) => void;
  generalMessages: Message[];
  addGeneralMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Matemática Avançada',
    description: 'Cálculo diferencial e integral para exames',
    instructions: 'Foco em exercícios práticos e aplicações. Preciso dominar derivadas e integrais.',
    files: ['calculo_stewart.pdf', 'exercicios_resolvidos.pdf'],
    messages: [
      {
        id: 'm1',
        role: 'assistant',
        content: 'Olá! Estou aqui para ajudar com seus estudos de Matemática Avançada. Posso criar um cronograma de estudos baseado no seu tempo disponível. Quanto tempo você tem por semana?',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 'm2',
        role: 'user',
        content: 'Tenho 10 horas por semana, durante 8 semanas. Preciso focar em derivadas e integrais.',
        timestamp: new Date(Date.now() - 3000000),
      },
      {
        id: 'm3',
        role: 'assistant',
        content: `Perfeito! Criei um cronograma personalizado para você:

**Semanas 1-2: Fundamentos de Derivadas (20h)**
- Limites e continuidade (4h)
- Regras básicas de derivação (6h)
- Regra da cadeia e derivadas implícitas (6h)
- Exercícios práticos (4h)

**Semanas 3-4: Aplicações de Derivadas (20h)**
- Máximos e mínimos (5h)
- Problemas de otimização (7h)
- Análise de gráficos (4h)
- Revisão e exercícios (4h)

**Semanas 5-6: Integrais (20h)**
- Integral indefinida (6h)
- Integral definida (6h)
- Técnicas de integração (6h)
- Exercícios práticos (2h)

**Semanas 7-8: Aplicações e Revisão (20h)**
- Aplicações de integrais (6h)
- Teorema Fundamental do Cálculo (4h)
- Simulados e revisão geral (10h)

**Dicas:**
- Dedique 30min diários em vez de sessões longas espaçadas
- Faça exercícios após cada tópico teórico
- Revise conceitos anteriores antes de avançar`,
        timestamp: new Date(Date.now() - 2400000),
        isPinned: true,
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 7),
  },
  {
    id: '2',
    name: 'Python para Data Science',
    description: 'Pandas, NumPy e visualização de dados',
    instructions: 'Aprender bibliotecas essenciais para análise de dados. Preciso de projetos práticos.',
    files: ['python_datascience.pdf'],
    messages: [
      {
        id: 'm4',
        role: 'assistant',
        content: 'Olá! Vou te ajudar a dominar Python para Data Science. Qual é seu nível atual de Python?',
        timestamp: new Date(Date.now() - 7200000),
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 3),
  },
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [generalMessages, setGeneralMessages] = useState<Message[]>([
    {
      id: 'g1',
      role: 'assistant',
      content: 'Olá! Sou seu assistente geral. Tenho acesso a todos os seus projetos de estudo. Como posso ajudar hoje?',
      timestamp: new Date(),
    },
  ]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'messages'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      messages: [],
      createdAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(project => (project.id === id ? { ...project, ...updates } : project))
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const addMessage = (projectId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, messages: [...project.messages, newMessage] }
          : project
      )
    );
  };

  const pinMessage = (projectId: string, messageId: string) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              messages: project.messages.map(msg => ({
                ...msg,
                isPinned: msg.id === messageId ? !msg.isPinned : false,
              })),
            }
          : project
      )
    );
  };

  const addGeneralMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setGeneralMessages(prev => [...prev, newMessage]);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        addMessage,
        pinMessage,
        generalMessages,
        addGeneralMessage,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}

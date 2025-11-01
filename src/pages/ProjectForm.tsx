import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjects } from '@/contexts/ProjectContext';
import { useToast } from '@/hooks/use-toast';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addProject, updateProject } = useProjects();
  const { toast } = useToast();

  const isEditing = id !== 'novo';
  const existingProject = isEditing ? projects.find(p => p.id === id) : null;

  const [name, setName] = useState(existingProject?.name || '');
  const [description, setDescription] = useState(existingProject?.description || '');
  const [instructions, setInstructions] = useState(existingProject?.instructions || '');
  const [files, setFiles] = useState<string[]>(existingProject?.files || []);
  const [newFile, setNewFile] = useState('');

  const handleAddFile = () => {
    if (newFile.trim()) {
      setFiles([...files, newFile.trim()]);
      setNewFile('');
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Por favor, informe um nome para o projeto',
        variant: 'destructive',
      });
      return;
    }

    if (isEditing && existingProject) {
      updateProject(existingProject.id, { name, description, instructions, files });
      toast({
        title: 'Projeto atualizado',
        description: 'As alterações foram salvas com sucesso',
      });
      navigate(`/projeto/${existingProject.id}`);
    } else {
      addProject({ name, description, instructions, files });
      toast({
        title: 'Projeto criado',
        description: 'Seu novo projeto foi criado com sucesso',
      });
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar Projeto' : 'Novo Projeto'}</CardTitle>
          <CardDescription>
            {isEditing
              ? 'Atualize as informações do seu projeto de estudo'
              : 'Crie um novo projeto de estudo com informações e contexto para a IA'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Projeto *</Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ex: Matemática Avançada"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Breve descrição do que você pretende estudar"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instruções para a IA</Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="Contexto adicional, objetivos, estilo de aprendizado preferido, áreas de foco..."
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Estas instruções ajudam a IA a personalizar as respostas para este projeto
              </p>
            </div>

            <div className="space-y-2">
              <Label>Arquivos de Referência</Label>
              <div className="flex gap-2">
                <Input
                  value={newFile}
                  onChange={e => setNewFile(e.target.value)}
                  placeholder="Nome do arquivo (ex: calculo.pdf)"
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddFile())}
                />
                <Button type="button" onClick={handleAddFile} variant="outline">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Por enquanto, adicione os nomes dos arquivos manualmente. Upload em breve!
              </p>

              {files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted"
                    >
                      <span className="text-sm">{file}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                {isEditing ? 'Salvar Alterações' : 'Criar Projeto'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

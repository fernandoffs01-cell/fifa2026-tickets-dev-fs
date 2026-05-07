import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Filter,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

interface Match {
  id: number;
  date: string;
  time: string;
  stage: string;
  group_name: string | null;
  home_team_id: number;
  away_team_id: number;
  stadium_id: number;
  home_score: number | null;
  away_score: number | null;
  status: string;
  home_team_name: string;
  home_team_code: string;
  home_team_flag: string;
  away_team_name: string;
  away_team_code: string;
  away_team_flag: string;
  stadium_name: string;
  stadium_city: string;
}

interface Team {
  id: number;
  name: string;
  code: string;
}

interface Stadium {
  id: number;
  name: string;
  city: string;
}

const phaseLabels: Record<string, string> = {
  group: 'Fase de Grupos',
  round_of_32: 'Oitavas de Final',
  round_of_16: 'Oitavas de Final',
  quarter_final: 'Quartas de Final',
  semi_final: 'Semifinal',
  third_place: 'Disputa 3º Lugar',
  final: 'Final',
};

const AdminMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    stadium_id: '',
    date: '',
    time: '',
    stage: '',
    group_name: '',
    home_score: '',
    away_score: '',
    status: 'scheduled',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [matchesRes, teamsRes, stadiumsRes] = await Promise.all([
        api.getMatches(),
        api.getTeams(),
        api.getStadiums(),
      ]);

      if (matchesRes.data?.matches) setMatches(matchesRes.data.matches);
      if (teamsRes.data?.teams) setTeams(teamsRes.data.teams);
      if (stadiumsRes.data?.stadiums) setStadiums(stadiumsRes.data.stadiums);
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao carregar dados', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const filteredMatches = matches.filter((match) => {
    const matchesSearch =
      match.home_team_name?.toLowerCase().includes(search.toLowerCase()) ||
      match.away_team_name?.toLowerCase().includes(search.toLowerCase()) ||
      match.stadium_name?.toLowerCase().includes(search.toLowerCase());
    const matchesPhase = phaseFilter === 'all' || match.stage === phaseFilter;
    return matchesSearch && matchesPhase;
  });

  const handleEdit = (match: Match) => {
    setEditingMatch(match);
    setFormData({
      home_team_id: match.home_team_id?.toString() || '',
      away_team_id: match.away_team_id?.toString() || '',
      stadium_id: match.stadium_id?.toString() || '',
      date: match.date ? match.date.split('T')[0] : '',
      time: match.time || '',
      stage: match.stage || '',
      group_name: match.group_name || '',
      home_score: match.home_score?.toString() || '',
      away_score: match.away_score?.toString() || '',
      status: match.status || 'scheduled',
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingMatch(null);
    setFormData({
      home_team_id: '',
      away_team_id: '',
      stadium_id: '',
      date: '',
      time: '',
      stage: '',
      group_name: '',
      home_score: '',
      away_score: '',
      status: 'scheduled',
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.home_team_id || !formData.away_team_id || !formData.stadium_id || !formData.date || !formData.time || !formData.stage) {
      toast({ title: 'Erro', description: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const data = {
        home_team_id: parseInt(formData.home_team_id),
        away_team_id: parseInt(formData.away_team_id),
        stadium_id: parseInt(formData.stadium_id),
        date: formData.date,
        time: formData.time,
        stage: formData.stage,
        group_name: formData.group_name || undefined,
        home_score: formData.home_score ? parseInt(formData.home_score) : undefined,
        away_score: formData.away_score ? parseInt(formData.away_score) : undefined,
        status: formData.status,
      };

      let result;
      if (editingMatch) {
        result = await api.updateMatch(editingMatch.id, data);
      } else {
        result = await api.createMatch(data);
      }

      if (result.error) {
        toast({ title: 'Erro', description: result.error, variant: 'destructive' });
      } else {
        toast({ title: 'Sucesso', description: editingMatch ? 'Jogo atualizado' : 'Jogo criado' });
        setIsDialogOpen(false);
        loadData();
      }
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao salvar jogo', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const result = await api.deleteMatch(deleteId);
      if (result.error) {
        toast({ title: 'Erro', description: result.error, variant: 'destructive' });
      } else {
        toast({ title: 'Sucesso', description: 'Jogo excluído' });
        loadData();
      }
    } catch (err) {
      toast({ title: 'Erro', description: 'Erro ao excluir jogo', variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  const phases = Object.keys(phaseLabels);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Gerenciar Jogos</h1>
          <p className="text-muted-foreground">
            {filteredMatches.length} jogos cadastrados
          </p>
        </div>
        <Button className="gold-gradient" onClick={handleNew}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Jogo
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por time ou estádio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={phaseFilter} onValueChange={setPhaseFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Fase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as fases</SelectItem>
            {phases.map((phase) => (
              <SelectItem key={phase} value={phase}>
                {phaseLabels[phase]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Confronto</TableHead>
              <TableHead>Estádio</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Fase</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMatches.slice(0, 20).map((match) => (
              <TableRow key={match.id}>
                <TableCell className="font-medium">{match.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{match.home_team_code || 'TBD'}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="font-medium">{match.away_team_code || 'TBD'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{match.stadium_name || 'TBD'}</p>
                    <p className="text-sm text-muted-foreground">{match.stadium_city}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{match.date ? new Date(match.date).toLocaleDateString('pt-BR') : '-'}</p>
                      <p className="text-sm text-muted-foreground">{match.time}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={match.stage === 'final' ? 'default' : 'secondary'}>
                    {phaseLabels[match.stage] || match.stage}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(match)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(match.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de Edição/Criação */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingMatch ? 'Editar Jogo' : 'Adicionar Jogo'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time da Casa *</Label>
                <Select value={formData.home_team_id} onValueChange={(v) => setFormData({ ...formData, home_team_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Visitante *</Label>
                <Select value={formData.away_team_id} onValueChange={(v) => setFormData({ ...formData, away_team_id: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Estádio *</Label>
              <Select value={formData.stadium_id} onValueChange={(v) => setFormData({ ...formData, stadium_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estádio" />
                </SelectTrigger>
                <SelectContent>
                  {stadiums.map((stadium) => (
                    <SelectItem key={stadium.id} value={stadium.id.toString()}>
                      {stadium.name} - {stadium.city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data *</Label>
                <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Horário *</Label>
                <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fase *</Label>
                <Select value={formData.stage} onValueChange={(v) => setFormData({ ...formData, stage: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a fase" />
                  </SelectTrigger>
                  <SelectContent>
                    {phases.map((phase) => (
                      <SelectItem key={phase} value={phase}>
                        {phaseLabels[phase]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Grupo</Label>
                <Input value={formData.group_name} onChange={(e) => setFormData({ ...formData, group_name: e.target.value })} placeholder="Ex: A" />
              </div>
            </div>
            {editingMatch && (
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Placar Casa</Label>
                  <Input type="number" value={formData.home_score} onChange={(e) => setFormData({ ...formData, home_score: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Placar Visitante</Label>
                  <Input type="number" value={formData.away_score} onChange={(e) => setFormData({ ...formData, away_score: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Agendado</SelectItem>
                      <SelectItem value="live">Ao Vivo</SelectItem>
                      <SelectItem value="finished">Finalizado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <Button onClick={handleSave} className="w-full" disabled={saving}>
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingMatch ? 'Atualizar' : 'Salvar'} Jogo
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert de Confirmação de Exclusão */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este jogo? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMatches;

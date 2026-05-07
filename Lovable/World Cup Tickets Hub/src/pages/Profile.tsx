import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Ticket, LogOut, Edit, QrCode, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { TeamFlag } from '@/components/TeamFlag';
import { api } from '@/lib/api';

interface BackendTicket {
  id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: string;
  created_at: string;
  category: string;
  match_date: string;
  match_time: string;
  stage: string;
  home_team: string;
  home_team_flag: string;
  away_team: string;
  away_team_flag: string;
  stadium_name: string;
  stadium_city: string;
}

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<BackendTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTickets = async () => {
      if (isAuthenticated) {
        const result = await api.getMyTickets();
        if (result.data?.tickets) {
          setTickets(result.data.tickets);
        }
        setLoading(false);
      }
    };
    loadTickets();
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-card border border-border p-6 sticky top-24">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <h1 className="font-display text-2xl">{user.name}</h1>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>

              {/* User Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Email</span>
                    <span className="text-sm">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Membro desde</span>
                    <span className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Ticket className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs text-muted-foreground block">Total de pedidos</span>
                    <span className="text-sm">{tickets.length} pedidos</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl mb-6">
              Meus <span className="gold-text">Ingressos</span>
            </h2>

            {loading ? (
              <div className="rounded-2xl bg-card border border-border p-12 text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-4">Carregando ingressos...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="rounded-2xl bg-card border border-border p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Ticket className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">Nenhum ingresso ainda</h3>
                <p className="text-muted-foreground mb-6">
                  Você ainda não comprou nenhum ingresso para a Copa 2026.
                </p>
                <Link to="/matches">
                  <Button className="gold-gradient hover:opacity-90">
                    Ver Jogos Disponíveis
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-2xl bg-card border border-border overflow-hidden"
                  >
                    {/* Ticket Header */}
                    <div className="flex items-center justify-between p-4 bg-secondary/50">
                      <div>
                        <span className="text-xs text-muted-foreground">Ingresso</span>
                        <span className="block font-mono text-sm">#{ticket.id}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground block">
                          {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          ticket.status === 'completed' ? 'bg-success/20 text-success' :
                          ticket.status === 'pending' ? 'bg-primary/20 text-primary' :
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {ticket.status === 'completed' ? 'Confirmado' :
                           ticket.status === 'pending' ? 'Pendente' : 'Cancelado'}
                        </span>
                      </div>
                    </div>

                    {/* Ticket Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {ticket.home_team_flag && (
                              <TeamFlag flag={ticket.home_team_flag} name={ticket.home_team} size="md" />
                            )}
                            <span className="font-medium">{ticket.home_team}</span>
                            <span className="text-muted-foreground">vs</span>
                            <span className="font-medium">{ticket.away_team}</span>
                            {ticket.away_team_flag && (
                              <TeamFlag flag={ticket.away_team_flag} name={ticket.away_team} size="md" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{ticket.stadium_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(ticket.match_date).toLocaleDateString('pt-BR')} • {ticket.match_time}
                          </p>
                          <p className="text-sm text-primary mt-1">{ticket.category} - {ticket.quantity}x ingressos</p>
                        </div>

                        {/* E-Ticket */}
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-lg bg-foreground p-2 mb-2">
                            <QrCode className="w-full h-full text-background" />
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Download className="w-3 h-3 mr-1" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Ticket Footer */}
                    <div className="flex items-center justify-between p-4 border-t border-border">
                      <span className="text-muted-foreground">Total pago</span>
                      <span className="font-display text-xl gold-text">
                        ${ticket.total_price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
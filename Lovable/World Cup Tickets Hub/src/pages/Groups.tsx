import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTeamsByGroup } from '@/data/teams';
import { getMatchesByGroup, formatMatchDate } from '@/data/matches';
import { TeamFlag } from '@/components/TeamFlag';

const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const Groups: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            <span className="gold-text">Grupos</span> da Copa 2026
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            12 grupos com 4 seleções cada. Os 2 primeiros de cada grupo avançam para a fase eliminatória.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {groups.map((group, index) => {
            const teams = getTeamsByGroup(group);
            const matches = getMatchesByGroup(group);
            
            return (
              <div
                key={group}
                className="rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Group Header */}
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-display text-2xl text-primary">{group}</span>
                      </div>
                      <div>
                        <h2 className="font-display text-xl">Grupo {group}</h2>
                        <span className="text-xs text-muted-foreground">{matches.length} jogos</span>
                      </div>
                    </div>
                    <Trophy className="w-5 h-5 text-primary/50" />
                  </div>
                </div>

                {/* Teams */}
                <div className="p-4 space-y-3">
                  {teams.map((team, teamIndex) => (
                    <div
                      key={team.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <span className="text-muted-foreground text-sm w-4">{teamIndex + 1}</span>
                      <TeamFlag flag={team.flag} name={team.name} size="md" />
                      <div className="flex-1">
                        <span className="font-medium text-sm">{team.name}</span>
                        {team.isTBD && (
                          <span className="text-xs text-primary ml-2">(Repescagem)</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{team.code}</span>
                    </div>
                  ))}
                </div>

                {/* Matches Preview */}
                {matches.length > 0 && (
                  <div className="border-t border-border p-4">
                    <div className="text-xs text-muted-foreground mb-2">Próximos jogos:</div>
                    <div className="space-y-2">
                      {matches.slice(0, 2).map((match) => {
                        const homeTeam = teams.find(t => t.id === match.homeTeamId);
                        const awayTeam = teams.find(t => t.id === match.awayTeamId);
                        
                        if (!homeTeam || !awayTeam) return null;

                        return (
                          <Link
                            key={match.id}
                            to={`/matches/${match.id}`}
                            className="flex items-center justify-between text-sm hover:text-primary transition-colors"
                          >
                            <div className="flex items-center gap-1">
                              <TeamFlag flag={homeTeam.flag} name={homeTeam.name} size="sm" />
                              <span className="text-muted-foreground mx-1">vs</span>
                              <TeamFlag flag={awayTeam.flag} name={awayTeam.name} size="sm" />
                            </div>
                            <span className="text-xs text-muted-foreground">{formatMatchDate(match.date)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="p-4 pt-0">
                  <Link to={`/matches?group=${group}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      <Ticket className="w-4 h-4 mr-2" />
                      Ver jogos do grupo
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-12 p-6 rounded-xl glass-card text-center">
          <h3 className="font-display text-xl mb-2">Formato da Copa 2026</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A Copa do Mundo 2026 terá 48 seleções divididas em 12 grupos de 4 equipes cada. 
            Os dois melhores de cada grupo avançam para as oitavas de final, totalizando 24 seleções 
            na fase eliminatória. Serão 104 jogos ao todo, incluindo a final no MetLife Stadium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Groups;

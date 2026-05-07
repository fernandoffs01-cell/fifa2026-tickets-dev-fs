import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { matches, phaseLabels, formatMatchDate } from '@/data/matches';
import { getTeamById, Team } from '@/data/teams';
import { getStadiumById } from '@/data/stadiums';
import { cn } from '@/lib/utils';
import { TeamFlag } from '@/components/TeamFlag';

const FeaturedMatches: React.FC = () => {
  // Featured group stage matches with real teams + final/semifinals with TBD
  const featuredMatchIds = [
    'match-c3', // Argentina vs França
    'match-d3', // Brasil vs Holanda
    'match-a5', // USA vs México
    'match-final', // Final TBD
    'match-sf-1', // Semi 1 TBD
    'match-b3', // Espanha vs Japão
  ];
  const featuredMatches = matches.filter(m => featuredMatchIds.includes(m.id));

  const renderTeam = (team: Team) => {
    if (team.isTBD) {
      return (
        <div className="text-center flex-1">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">{team.flag}</span>
          </div>
          <span className="font-medium text-sm text-muted-foreground">{team.name}</span>
        </div>
      );
    }
    return (
      <div className="text-center flex-1">
        <TeamFlag flag={team.flag} name={team.name} size="lg" className="mx-auto mb-2" />
        <span className="font-medium text-sm">{team.name}</span>
      </div>
    );
  };

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Não perca</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Jogos em Destaque</h2>
          </div>
          <Link to="/matches">
            <Button variant="outline" className="group">
              Ver todos os jogos
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMatches.map((match, index) => {
            const homeTeam = getTeamById(match.homeTeamId);
            const awayTeam = getTeamById(match.awayTeamId);
            const stadium = getStadiumById(match.stadiumId);

            if (!homeTeam || !awayTeam || !stadium) return null;

            const isFinal = match.phase === 'final';
            const isSemifinal = match.phase === 'semifinals';
            const isKnockout = match.phase !== 'group';

            return (
              <Link
                key={match.id}
                to={`/matches/${match.id}`}
                className={cn(
                  "group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]",
                  isFinal && "md:col-span-2 lg:col-span-1"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  isFinal ? "from-primary/20 via-secondary to-secondary" : "from-secondary to-secondary/80"
                )} />
                
                {/* Phase Badge */}
                <div className={cn(
                  "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium",
                  isFinal ? "bg-primary text-primary-foreground" :
                  isSemifinal ? "bg-primary/20 text-primary" :
                  isKnockout ? "bg-secondary text-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {phaseLabels[match.phase]}
                  {match.group && ` • Grupo ${match.group}`}
                </div>

                <div className="relative p-6 pt-14">
                  {/* Teams */}
                  <div className="flex items-center justify-between mb-6">
                    {renderTeam(homeTeam)}
                    <div className="px-4">
                      <span className="font-display text-2xl text-muted-foreground">VS</span>
                    </div>
                    {renderTeam(awayTeam)}
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatMatchDate(match.date)} • {match.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{stadium.name}, {stadium.city}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      A partir de ${stadium.sectors[2]?.price || 300}
                    </span>
                    <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <Ticket className="w-4 h-4" />
                      Comprar
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMatches;
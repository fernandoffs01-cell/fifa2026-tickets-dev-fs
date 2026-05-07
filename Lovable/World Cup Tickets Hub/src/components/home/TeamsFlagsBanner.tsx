import React from 'react';
import { Link } from 'react-router-dom';
import { getRealTeams } from '@/data/teams';
import { TeamFlag } from '@/components/TeamFlag';

const TeamsFlagsBanner: React.FC = () => {
  const teams = getRealTeams().filter(team => !team.isTBD);

  return (
    <section className="py-16 bg-card overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">48 Seleções</span>
          <h2 className="font-display text-4xl md:text-5xl mt-2">
            Participantes da <span className="gold-text">Copa 2026</span>
          </h2>
        </div>
      </div>

      {/* Infinite scrolling flags - Row 1 */}
      <div className="relative">
        <div className="flex animate-scroll-left gap-6 py-4">
          {[...teams, ...teams].map((team, index) => (
            <Link
              key={`row1-${team.id}-${index}`}
              to="/teams"
              className="flex-shrink-0 group"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                <TeamFlag flag={team.flag} name={team.name} size="lg" className="w-full h-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Infinite scrolling flags - Row 2 (reverse) */}
      <div className="relative mt-4">
        <div className="flex animate-scroll-right gap-6 py-4">
          {[...teams.slice().reverse(), ...teams.slice().reverse()].map((team, index) => (
            <Link
              key={`row2-${team.id}-${index}`}
              to="/teams"
              className="flex-shrink-0 group"
            >
              <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                <TeamFlag flag={team.flag} name={team.name} size="lg" className="w-full h-full" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 text-center">
        <Link 
          to="/teams" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Ver todas as seleções →
        </Link>
      </div>
    </section>
  );
};

export default TeamsFlagsBanner;

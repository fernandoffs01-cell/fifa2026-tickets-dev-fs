import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stadiums } from '@/data/stadiums';
import { getMatchesByStadium } from '@/data/matches';

type CountryFilter = 'all' | 'USA' | 'MEX' | 'CAN';

const countryLabels: Record<CountryFilter, string> = {
  all: 'Todos',
  USA: '🇺🇸 Estados Unidos',
  MEX: '🇲🇽 México',
  CAN: '🇨🇦 Canadá',
};

const Stadiums: React.FC = () => {
  const [countryFilter, setCountryFilter] = useState<CountryFilter>('all');

  const filteredStadiums = stadiums.filter(stadium => {
    if (countryFilter === 'all') return true;
    return stadium.countryCode === countryFilter;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-6xl mb-4">
            <span className="gold-text">Estádios</span> da Copa
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            16 estádios incríveis nos Estados Unidos, México e Canadá recebendo os melhores jogos de futebol do mundo.
          </p>
        </div>

        {/* Country Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(countryLabels) as CountryFilter[]).map((country) => (
            <Button
              key={country}
              variant={countryFilter === country ? 'default' : 'outline'}
              onClick={() => setCountryFilter(country)}
              className={countryFilter === country ? 'gold-gradient' : ''}
            >
              {countryLabels[country]}
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12 p-6 rounded-2xl glass-card">
          <div className="text-center">
            <div className="font-display text-3xl md:text-4xl gold-text">
              {filteredStadiums.length}
            </div>
            <div className="text-sm text-muted-foreground">Estádios</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl md:text-4xl gold-text">
              {(filteredStadiums.reduce((acc, s) => acc + s.capacity, 0) / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground">Capacidade Total</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl md:text-4xl gold-text">
              {filteredStadiums.reduce((acc, s) => acc + getMatchesByStadium(s.id).length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Jogos</div>
          </div>
        </div>

        {/* Stadiums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStadiums.map((stadium, index) => {
            const matchCount = getMatchesByStadium(stadium.id).length;
            
            return (
              <Link
                key={stadium.id}
                to={`/stadiums/${stadium.id}`}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:border-primary/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={stadium.image}
                    alt={stadium.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Country Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-card text-sm font-medium">
                    {stadium.countryCode === 'USA' ? '🇺🇸' : stadium.countryCode === 'MEX' ? '🇲🇽' : '🇨🇦'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl mb-1 group-hover:text-primary transition-colors">
                    {stadium.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {stadium.city}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">{stadium.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">{matchCount} jogos</span>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted-foreground block">A partir de</span>
                      <span className="text-lg font-bold text-primary">${stadium.sectors[2]?.price}</span>
                    </div>
                    <span className="flex items-center gap-1 text-sm text-primary font-medium">
                      Ver detalhes
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stadiums;
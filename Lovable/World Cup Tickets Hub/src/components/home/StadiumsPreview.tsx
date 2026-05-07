import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stadiums } from '@/data/stadiums';

const StadiumsPreview: React.FC = () => {
  // Show 4 featured stadiums
  const featuredStadiums = stadiums.slice(0, 4);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Onde tudo acontece</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Estádios Icônicos</h2>
          </div>
          <Link to="/stadiums">
            <Button variant="outline" className="group">
              Ver todos os estádios
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Stadiums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStadiums.map((stadium, index) => (
            <Link
              key={stadium.id}
              to={`/stadiums/${stadium.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={stadium.image}
                alt={stadium.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

              {/* Country Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-card text-xs font-medium">
                {stadium.country === 'Estados Unidos' ? '🇺🇸' : stadium.country === 'México' ? '🇲🇽' : '🇨🇦'} {stadium.countryCode}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl mb-1 group-hover:text-primary transition-colors">
                  {stadium.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  {stadium.city}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-foreground font-medium">{stadium.capacity.toLocaleString()}</span>
                  <span className="text-muted-foreground">lugares</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StadiumsPreview;

import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import trophyImage from '@/assets/world-cup-trophy.png';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        {/* Animated circles */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Trophy Image - Left Side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block z-0 opacity-20 pointer-events-none">
        <img 
          src={trophyImage} 
          alt="Taça da Copa do Mundo" 
          className="h-[45vh] w-auto object-contain -translate-x-1/4"
        />
      </div>

      {/* Trophy Image - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block z-0 opacity-20 pointer-events-none">
        <img 
          src={trophyImage} 
          alt="Taça da Copa do Mundo" 
          className="h-[45vh] w-auto object-contain translate-x-1/4"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Ingressos disponíveis</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">FIFA</span>
            <br />
            <span className="gold-text">WORLD CUP</span>
            <br />
            <span className="text-foreground">2026</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            O maior evento esportivo do planeta. 48 seleções, 16 estádios, 3 países.
            <br className="hidden md:block" />
            Garanta seu ingresso para a história.
          </p>

          {/* Host Countries */}
          <div className="flex justify-center gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card">
              <span className="text-3xl">🇺🇸</span>
              <span className="text-sm font-medium">EUA</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card">
              <span className="text-3xl">🇲🇽</span>
              <span className="text-sm font-medium">México</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-card">
              <span className="text-3xl">🇨🇦</span>
              <span className="text-sm font-medium">Canadá</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/matches">
              <Button size="lg" className="gold-gradient hover:opacity-90 text-primary-foreground glow-gold group w-full sm:w-auto">
                <Ticket className="w-5 h-5 mr-2" />
                Comprar Ingressos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/stadiums">
              <Button size="lg" variant="outline" className="group w-full sm:w-auto">
                <MapPin className="w-5 h-5 mr-2" />
                Explorar Estádios
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-5xl gold-text">48</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Seleções</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-5xl gold-text">16</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Estádios</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-5xl gold-text">104</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">Jogos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

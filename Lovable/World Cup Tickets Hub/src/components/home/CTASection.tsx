import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Shield, CreditCard, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Ingressos oficiais com garantia FIFA",
  },
  {
    icon: CreditCard,
    title: "Pagamento Fácil",
    description: "Cartão, Pix ou parcelamento",
  },
  {
    icon: Ticket,
    title: "E-Ticket",
    description: "Ingresso digital no seu celular",
  },
  {
    icon: Headphones,
    title: "Suporte 24/7",
    description: "Atendimento em português",
  },
];

const CTASection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-2xl glass-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl glass-card">
          <h2 className="font-display text-3xl md:text-5xl mb-4">
            Pronto para viver a
            <span className="gold-text"> Copa do Mundo</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Não perca a chance de assistir ao maior evento esportivo do planeta.
            Garanta seus ingressos agora e faça parte da história do futebol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/matches">
              <Button size="lg" className="gold-gradient hover:opacity-90 text-primary-foreground glow-gold w-full sm:w-auto">
                <Ticket className="w-5 h-5 mr-2" />
                Comprar Agora
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

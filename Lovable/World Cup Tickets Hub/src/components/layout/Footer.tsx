import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl text-gradient">FIFA 2026</span>
                <span className="block text-xs text-muted-foreground">World Cup Tickets</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Plataforma oficial de venda de ingressos para a Copa do Mundo FIFA 2026.
              EUA • México • Canadá
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/fifaworldcup" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/FIFAWorldCup" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/fifaworldcup" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/fifatv" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/matches" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Jogos
                </Link>
              </li>
              <li>
                <Link to="/groups" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Grupos
                </Link>
              </li>
              <li>
                <Link to="/qualified" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Classificados
                </Link>
              </li>
              <li>
                <Link to="/stadiums" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Estádios
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Seleções
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://www.fifa.com/fifaplus/en/help" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="https://www.fifa.com/tickets/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Reembolso
                </a>
              </li>
              <li>
                <a href="https://www.fifa.com/legal/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="https://www.fifa.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:suporte@fifa2026.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  suporte@fifa2026.com
                </a>
              </li>
              <li>
                <a href="tel:+18003432026" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  +1 (800) FIFA-2026
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>FIFA Headquarters<br />Zürich, Switzerland</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground text-center md:text-left space-y-1">
            <p>© 2026 FIFA World Cup. Todos os direitos reservados.</p>
            <p className="text-amber-500/80">
              ⚠️ Aplicação educacional fictícia desenvolvida para o evento <strong>TFTEC "Copa do Mundo Azure"</strong>.
              Não vinculada à FIFA ou a qualquer entidade oficial.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇺🇸</span>
            <span className="text-2xl">🇲🇽</span>
            <span className="text-2xl">🇨🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

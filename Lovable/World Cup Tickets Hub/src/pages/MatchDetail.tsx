import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Minus, Plus, ShoppingCart, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMatchById, phaseLabels, formatMatchDate } from '@/data/matches';
import { getTeamById } from '@/data/teams';
import { getStadiumById, Sector } from '@/data/stadiums';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { TeamFlag } from '@/components/TeamFlag';
import { api } from '@/lib/api';

interface TicketCategory {
  id: number;
  category: string;
  price: number;
  available_quantity: number;
  sold_quantity: number;
}

const MatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState<TicketCategory | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  const match = id ? getMatchById(id) : undefined;
  const homeTeam = match ? getTeamById(match.homeTeamId) : undefined;
  const awayTeam = match ? getTeamById(match.awayTeamId) : undefined;
  const stadium = match ? getStadiumById(match.stadiumId) : undefined;

  // Buscar categorias de ingressos do backend
  useEffect(() => {
    const fetchTicketCategories = async () => {
      if (!id || !stadium) return;
      
      setLoadingTickets(true);
      try {
        const result = await api.getMatchTickets(id);
        
        // Se a API retornar categorias, usar elas
        if (result.data?.tickets && result.data.tickets.length > 0) {
          setTicketCategories(result.data.tickets);
        } else {
          // Fallback para dados estáticos se não houver categorias no banco
          console.log('Usando setores estáticos como fallback');
          setTicketCategories(stadium.sectors.map((sector, index) => ({
            id: index + 1,
            category: sector.name,
            price: sector.price,
            available_quantity: match?.availableTickets?.[sector.id as keyof typeof match.availableTickets] || sector.capacity,
            sold_quantity: 0
          })));
        }
      } catch (error) {
        console.error('Erro ao buscar ingressos:', error);
        // Fallback para dados estáticos se a API falhar
        setTicketCategories(stadium.sectors.map((sector, index) => ({
          id: index + 1,
          category: sector.name,
          price: sector.price,
          available_quantity: match?.availableTickets?.[sector.id as keyof typeof match.availableTickets] || sector.capacity,
          sold_quantity: 0
        })));
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchTicketCategories();
  }, [id, stadium, match]);

  if (!match || !homeTeam || !awayTeam || !stadium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Jogo não encontrado</h1>
          <Link to="/matches">
            <Button>Voltar para jogos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedCategory) {
      toast({
        title: "Selecione um setor",
        description: "Por favor, escolha um setor antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    // Criar um setor compatível com a interface Sector
    const sectorForCart: Sector = {
      id: String(selectedCategory.id),
      name: selectedCategory.category,
      price: selectedCategory.price,
      capacity: selectedCategory.available_quantity,
      description: ''
    };

    addItem({
      match,
      stadium,
      homeTeam,
      awayTeam,
      sector: sectorForCart,
      ticketCategoryId: selectedCategory.id,
      quantity,
      unitPrice: selectedCategory.price,
    });

    toast({
      title: "Adicionado ao carrinho!",
      description: `${quantity}x ${selectedCategory.category} - ${homeTeam.name} vs ${awayTeam.name}`,
    });

    // Reset selection
    setSelectedCategory(null);
    setQuantity(1);
  };

  const totalPrice = selectedCategory ? selectedCategory.price * quantity : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Match Header */}
            <div className="rounded-3xl overflow-hidden bg-card border border-border">
              {/* Stadium Image */}
              <div className="relative h-48 md:h-64">
                <img
                  src={stadium.image}
                  alt={stadium.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Phase Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {phaseLabels[match.phase]}
                  {match.group && ` • Grupo ${match.group}`}
                </div>
              </div>

              {/* Teams */}
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center flex-1">
                    <TeamFlag flag={homeTeam.flag} name={homeTeam.name} size="xl" className="mx-auto mb-3" />
                    <h2 className="font-display text-2xl md:text-3xl">{homeTeam.name}</h2>
                    <span className="text-muted-foreground">{homeTeam.confederation}</span>
                  </div>
                  <div className="px-6">
                    <span className="font-display text-3xl md:text-4xl gold-text">VS</span>
                  </div>
                  <div className="text-center flex-1">
                    <TeamFlag flag={awayTeam.flag} name={awayTeam.name} size="xl" className="mx-auto mb-3" />
                    <h2 className="font-display text-2xl md:text-3xl">{awayTeam.name}</h2>
                    <span className="text-muted-foreground">{awayTeam.confederation}</span>
                  </div>
                </div>

                {/* Match Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground block">Data</span>
                      <span className="font-medium">{formatMatchDate(match.date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground block">Estádio</span>
                      <span className="font-medium">{stadium.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-xs text-muted-foreground block">Capacidade</span>
                      <span className="font-medium">{stadium.capacity.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sectors */}
            <div>
              <h3 className="font-display text-2xl mb-6">Escolha seu Setor</h3>
              {loadingTickets ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Carregando ingressos...</span>
                </div>
              ) : ticketCategories.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum ingresso disponível para este jogo.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ticketCategories.map((category) => {
                    const available = category.available_quantity;
                    const isSelected = selectedCategory?.id === category.id;
                    const isSoldOut = available === 0;

                    return (
                      <button
                        key={category.id}
                        onClick={() => !isSoldOut && setSelectedCategory(category)}
                        disabled={isSoldOut}
                        className={cn(
                          "relative p-6 rounded-2xl border-2 text-left transition-all duration-200",
                          isSelected
                            ? "border-primary bg-primary/10 glow-gold"
                            : isSoldOut
                            ? "border-border bg-muted/50 opacity-50 cursor-not-allowed"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        
                        <h4 className="font-display text-xl mb-2">{category.category}</h4>
                        <p className="text-sm text-muted-foreground mb-4">Categoria de ingresso</p>
                        
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-2xl font-bold text-primary">${category.price}</span>
                            <span className="text-muted-foreground text-sm">/ingresso</span>
                          </div>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            isSoldOut ? "bg-destructive/20 text-destructive" : "bg-success/20 text-success"
                          )}>
                            {isSoldOut ? 'Esgotado' : `${available.toLocaleString()} disponíveis`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card border border-border p-6">
              <h3 className="font-display text-xl mb-6">Resumo da Compra</h3>

              {selectedCategory ? (
                <>
                  {/* Selected Sector */}
                  <div className="p-4 rounded-xl bg-secondary/50 mb-6">
                    <span className="text-xs text-muted-foreground">Setor selecionado</span>
                    <h4 className="font-medium">{selectedCategory.category}</h4>
                    <span className="text-primary font-bold">${selectedCategory.price}/un</span>
                  </div>

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="text-sm text-muted-foreground mb-2 block">Quantidade</label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-display text-2xl w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground mt-2 block">Máximo 10 ingressos por compra</span>
                  </div>

                  {/* Total */}
                  <div className="border-t border-border pt-6 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-muted-foreground">Total</span>
                      <div className="text-right">
                        <span className="font-display text-3xl gold-text">${totalPrice.toLocaleString()}</span>
                        <span className="block text-xs text-muted-foreground">{quantity} {quantity === 1 ? 'ingresso' : 'ingressos'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full gold-gradient hover:opacity-90 text-primary-foreground"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Selecione um setor para continuar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
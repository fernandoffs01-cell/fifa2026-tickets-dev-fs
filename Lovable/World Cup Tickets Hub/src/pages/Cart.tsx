import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, ArrowLeft, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatMatchDate, phaseLabels } from '@/data/matches';
import { TeamFlag } from '@/components/TeamFlag';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-3xl mb-4">Carrinho Vazio</h1>
            <p className="text-muted-foreground mb-8">
              Você ainda não adicionou nenhum ingresso ao carrinho.
            </p>
            <Link to="/matches">
              <Button className="gold-gradient hover:opacity-90">
                <Ticket className="w-4 h-4 mr-2" />
                Ver Jogos Disponíveis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl">
              <span className="gold-text">Carrinho</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {totalItems} {totalItems === 1 ? 'ingresso' : 'ingressos'}
            </p>
          </div>
          <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar carrinho
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-card border border-border p-6 animate-fade-in"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Match Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {phaseLabels[item.match.phase]}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <TeamFlag flag={item.homeTeam.flag} name={item.homeTeam.name} size="md" />
                        <span className="font-medium">{item.homeTeam.code}</span>
                      </div>
                      <span className="text-muted-foreground">vs</span>
                      <div className="flex items-center gap-2">
                        <TeamFlag flag={item.awayTeam.flag} name={item.awayTeam.name} size="md" />
                        <span className="font-medium">{item.awayTeam.code}</span>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>{formatMatchDate(item.match.date)} • {item.match.time}</p>
                      <p>{item.stadium.name}, {item.stadium.city}</p>
                      <p className="text-primary font-medium">{item.sector.name}</p>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-display text-xl w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 10}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-muted-foreground block">${item.unitPrice}/un</span>
                      <span className="font-display text-2xl gold-text">${item.totalPrice.toLocaleString()}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display text-xl mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de serviço</span>
                  <span>${(totalPrice * 0.1).toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-display text-2xl gold-text">
                      ${(totalPrice * 1.1).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground block text-right">
                    {totalItems} {totalItems === 1 ? 'ingresso' : 'ingressos'}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full gold-gradient hover:opacity-90 text-primary-foreground mb-4"
                size="lg"
              >
                Finalizar Compra
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Link to="/matches">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Button>
              </Link>

              {!isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Você precisará fazer login para finalizar a compra
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
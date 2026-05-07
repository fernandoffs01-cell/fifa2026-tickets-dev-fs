import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, Check, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { TeamFlag } from '@/components/TeamFlag';
import { api } from '@/lib/api';

const Checkout: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated, addOrder } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const serviceFee = totalPrice * 0.1;
  const grandTotal = totalPrice + serviceFee;

  if (!isAuthenticated) {
    navigate('/login?redirect=/checkout');
    return null;
  }

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
              Adicione ingressos ao carrinho para continuar.
            </p>
            <Link to="/matches">
              <Button className="gold-gradient hover:opacity-90">
                Ver Jogos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Preparar items para a API do backend usando o ticketCategoryId do banco
      const purchaseItems = items.map(item => ({
        ticket_category_id: item.ticketCategoryId,
        quantity: item.quantity,
      }));

      // Chamar API do backend para registrar a compra
      const result = await api.purchaseTickets(purchaseItems);

      if (result.error) {
        toast({
          title: 'Erro na compra',
          description: result.error,
          variant: 'destructive',
        });
        setIsProcessing(false);
        return;
      }

      // Create tickets for confirmation page
      const purchasedTickets = items.map((item, index) => ({
        ticketId: `FIFA2026-${Date.now()}-${index + 1}`,
        matchId: item.match.id,
        homeTeam: item.homeTeam.name,
        awayTeam: item.awayTeam.name,
        homeFlag: item.homeTeam.flag,
        awayFlag: item.awayTeam.flag,
        stadium: item.stadium.name,
        city: item.stadium.city,
        date: item.match.date,
        time: item.match.time,
        sector: item.sector.name,
        quantity: item.quantity,
        buyerName: user?.name || '',
        buyerEmail: user?.email || '',
        purchaseDate: new Date(),
      }));

      // Create order locally for immediate display
      addOrder({
        items: items.map(item => ({
          matchId: item.match.id,
          sectorId: item.sector.id,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        })),
        totalPrice: grandTotal,
        status: 'confirmed',
        paymentMethod: 'credit_card',
      });

      clearCart();

      toast({
        title: 'Compra realizada!',
        description: 'Seus ingressos foram confirmados.',
      });

      // Navigate to confirmation page with tickets data
      navigate('/payment-confirmation', {
        state: {
          tickets: purchasedTickets,
          totalAmount: grandTotal,
        },
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao processar a compra. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/cart" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao carrinho
        </Link>

        <h1 className="font-display text-4xl mb-8">
          <span className="gold-text">Finalizar</span> Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* User Info */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h2 className="font-display text-xl mb-4">Dados do Comprador</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input value={user?.name} disabled className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user?.email} disabled className="bg-secondary/50" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl">Pagamento</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Nome no Cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="NOME COMPLETO"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="000"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6 p-4 rounded-xl bg-success/10 text-success">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">Pagamento seguro com criptografia SSL</span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full gold-gradient hover:opacity-90 text-primary-foreground"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">⚽</span>
                    Processando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Confirmar Pagamento de ${grandTotal.toLocaleString()}
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-card border border-border p-6">
              <h2 className="font-display text-xl mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <TeamFlag flag={item.homeTeam.flag} name={item.homeTeam.name} size="sm" />
                        <span>vs</span>
                        <TeamFlag flag={item.awayTeam.flag} name={item.awayTeam.name} size="sm" />
                      </div>
                      <span className="text-xs text-muted-foreground block">{item.sector.name}</span>
                      <span className="text-xs text-muted-foreground">{item.quantity}x ${item.unitPrice}</span>
                    </div>
                    <span className="font-medium">${item.totalPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxa de serviço (10%)</span>
                  <span>${serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-display text-2xl gold-text">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
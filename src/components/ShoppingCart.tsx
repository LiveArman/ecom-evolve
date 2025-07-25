import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag,
  Truck,
  Shield,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  variant?: { color: string; size: string };
  inStock: boolean;
}

interface ShoppingCartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const ShoppingCart = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShoppingCartProps) => {
  const [promoCode, setPromoCode] = useState("");

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to get started</p>
                <Button onClick={onClose}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold line-clamp-2">{item.name}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {item.variant && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.variant.color} - {item.variant.size}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-price">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm line-through text-muted-foreground">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              {/* Trust Badges */}
              <div className="flex justify-around text-center text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="h-5 w-5" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield className="h-5 w-5" />
                  <span>Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CreditCard className="h-5 w-5" />
                  <span>Easy Returns</span>
                </div>
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-success" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-price">${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 50 && (
                <div className="text-center text-sm text-muted-foreground bg-gradient-hero p-3 rounded-lg">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg" 
                variant="hero"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import { Minus, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store";
import { useCart } from "@/hooks/use-cart";

export default function CartModal() {
  const { isCartOpen, setCartOpen, setPaymentModalOpen } = useCartStore();
  const { items, updateQuantity, clearCart, total } = useCart();

  const serviceCharge = 500;
  const discount = 500;
  const grandTotal = total + serviceCharge - discount;

  const handleProceedToPayment = () => {
    setCartOpen(false);
    setPaymentModalOpen(true);
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={setCartOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold configurable-text-primary">Your cart</DialogTitle>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={clearCart} className="text-green-600 font-medium">
                Clear Cart
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.variation}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-semibold configurable-text-primary">{item.name}</h4>
                  <p className="text-sm configurable-text-secondary line-clamp-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="w-8 h-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                    <span className="font-bold configurable-text-primary">
                      Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  {item.variation && (
                    <p className="text-xs configurable-text-secondary mt-1">Variation: {item.variation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Promo Code */}
          <div>
            <label className="block text-sm font-medium configurable-text-primary mb-2">Promo code</label>
            <div className="flex space-x-2">
              <Input placeholder="Enter promo code" className="flex-1" />
              <Button className="configurable-primary text-white hover:bg-green-600">Apply</Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold configurable-text-primary mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="configurable-text-secondary">Sub Total</span>
                <span className="configurable-text-primary">Rs. {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="configurable-text-secondary">Service Charges</span>
                <span className="configurable-text-primary">Rs. {serviceCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="configurable-text-secondary">Discount</span>
                <span className="text-green-600">-Rs. {discount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="configurable-text-primary">Grand Total</span>
                  <span className="configurable-text-primary">Rs. {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleProceedToPayment}
            className="w-full configurable-primary text-white py-3 text-lg font-bold hover:bg-green-600"
            disabled={items.length === 0}
          >
            Place Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

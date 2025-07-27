import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";
import { useCart } from "@/hooks/use-cart";

export default function OrderConfirmationModal() {
  const { isOrderConfirmationOpen, setOrderConfirmationOpen } = useCartStore();
  const { clearCart } = useCart();

  const handleContinueShopping = () => {
    setOrderConfirmationOpen(false);
    clearCart();
  };

  const handleTrackOrder = () => {
    setOrderConfirmationOpen(false);
    clearCart();
    // Navigate to orders page
  };

  return (
    <Dialog open={isOrderConfirmationOpen} onOpenChange={setOrderConfirmationOpen}>
      <DialogContent className="max-w-md">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 configurable-primary rounded-full flex items-center justify-center mx-auto">
            <Check className="text-white" size={40} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold configurable-text-primary mb-2">Order Confirmed!</h3>
            <p className="configurable-text-secondary">
              Your order has been placed successfully. You will receive updates on your order status.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm configurable-text-secondary mb-1">Order ID</p>
            <p className="font-bold configurable-text-primary text-lg">#ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={handleTrackOrder}
              className="w-full configurable-primary text-white hover:bg-green-600"
            >
              Track Order
            </Button>
            <Button 
              onClick={handleContinueShopping}
              variant="outline"
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

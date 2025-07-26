import { Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

export default function AddToCartModal() {
  const { isAddToCartModalOpen, setAddToCartModalOpen, setCartOpen } = useCartStore();

  const handleViewCart = () => {
    setAddToCartModalOpen(false);
    setCartOpen(true);
  };

  return (
    <Dialog open={isAddToCartModalOpen} onOpenChange={setAddToCartModalOpen}>
      <DialogContent className="max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 configurable-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-white" size={32} />
          </div>
          <h3 className="text-xl font-bold configurable-text-primary mb-2">Added to Cart!</h3>
          <p className="configurable-text-secondary mb-6">Item has been added to your cart.</p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => setAddToCartModalOpen(false)} 
              variant="outline" 
              className="w-full"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={handleViewCart} 
              className="w-full configurable-primary text-white hover:bg-green-600"
            >
              View Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

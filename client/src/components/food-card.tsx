import { MenuItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";

interface FoodCardProps {
  item: MenuItem;
  variant?: "grid" | "list";
}

export default function FoodCard({ item, variant = "grid" }: FoodCardProps) {
  const { addItem, setAddToCartModalOpen } = useCartStore();

  const handleAddToCart = () => {
    addItem(item);
    setAddToCartModalOpen(true);
  };

  if (variant === "list") {
    return (
      <div className="food-card bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
          {item.discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {item.discount}% off
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold configurable-text-primary text-lg mb-2">{item.name}</h3>
          <p className="configurable-text-secondary text-sm mb-3">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold configurable-text-primary">Rs. {item.price}</span>
            <Button onClick={handleAddToCart} className="configurable-primary text-white hover:bg-green-600">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="food-card bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
        {item.discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white">
            {item.discount}% off
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold configurable-text-primary mb-2">{item.name}</h3>
        <p className="text-sm configurable-text-secondary mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold configurable-text-primary">Rs. {item.price}</span>
          <Button 
            onClick={handleAddToCart} 
            size="sm"
            className="configurable-primary text-white hover:bg-green-600"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

import { ConciergeBell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store";

export default function FloatingButtons() {
  const { setServiceModalOpen } = useCartStore();

  return (
    <Button
      onClick={() => setServiceModalOpen(true)}
      className="service-floating-btn w-14 h-14 configurable-primary text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
      size="icon"
    >
      <ConciergeBell size={24} />
    </Button>
  );
}

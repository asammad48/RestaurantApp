// Hook for orders (will be replaced with .NET API integration)
import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  status: string;
  tableNumber: number;
  items: string;
  total: string;
  paymentMethod: string | null;
  tip: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Sample order data for demonstration
const sampleOrders: Order[] = [
  {
    id: '1',
    status: 'preparing',
    tableNumber: 5,
    items: JSON.stringify([
      { id: 'pizza-combo-1', name: 'Pizza Combo', quantity: 1, price: '550.00' },
      { id: 'pasta-special-1', name: 'Pasta Special', quantity: 2, price: '450.00' }
    ]),
    total: '1450.00',
    paymentMethod: 'card',
    tip: '145.00',
    createdAt: new Date('2025-01-27T10:30:00'),
    updatedAt: new Date('2025-01-27T10:35:00'),
  },
  {
    id: '2',
    status: 'completed',
    tableNumber: 3,
    items: JSON.stringify([
      { id: 'burger-deluxe-1', name: 'Burger Deluxe', quantity: 2, price: '350.00' }
    ]),
    total: '700.00',
    paymentMethod: 'cash',
    tip: '70.00',
    createdAt: new Date('2025-01-27T09:15:00'),
    updatedAt: new Date('2025-01-27T09:45:00'),
  }
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual .NET API call
        // const response = await fetch('/api/orders');
        // const data = await response.json();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setOrders(sampleOrders);
        setError(null);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  return { orders, isLoading, error };
}
// Hook for menu items (will be replaced with .NET API integration)
import { useState, useEffect } from 'react';
import { sampleMenuItems } from '@/data/sample-data';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  discount: number | null;
  isRecommended: boolean | null;
  isDeal: boolean | null;
}

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const loadMenuItems = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual .NET API call
        // const response = await fetch('/api/menu-items');
        // const data = await response.json();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setMenuItems(sampleMenuItems);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  return { menuItems, isLoading, error };
}
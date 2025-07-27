// Shared schema types for both frontend and backend
// This file contains the data model definitions

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isRecommended: boolean;
  isDeal: boolean;
  discount?: number;
  originalPrice?: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  customerName: string;
  tableNumber: number;
  createdAt: string;
  notes?: string;
}

export interface OrderItem {
  menuItemId: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface ServiceRequest {
  id: string;
  type: 'water' | 'music' | 'assistance';
  tableNumber: number;
  status: 'pending' | 'in-progress' | 'completed';
  description?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  orderId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
    success: string;
    warning: string;
    error: string;
    food: {
      deal: string;
      recommended: string;
      category: string;
    };
  };
}
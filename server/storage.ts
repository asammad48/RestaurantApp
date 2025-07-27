import { type User, type InsertUser, type MenuItem, type InsertMenuItem, type Order, type InsertOrder, type ServiceRequest, type InsertServiceRequest, type Review, type InsertReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  
  // Orders
  getOrders(tableNumber?: number): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  
  // Service requests
  getServiceRequests(tableNumber?: number): Promise<ServiceRequest[]>;
  createServiceRequest(request: InsertServiceRequest): Promise<ServiceRequest>;
  updateServiceRequestStatus(id: string, status: string): Promise<ServiceRequest | undefined>;
  
  // Reviews
  getReviews(orderId?: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private menuItems: Map<string, MenuItem>;
  private orders: Map<string, Order>;
  private serviceRequests: Map<string, ServiceRequest>;
  private reviews: Map<string, Review>;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.serviceRequests = new Map();
    this.reviews = new Map();
    
    // Initialize with sample menu items
    this.initializeMenuItems();
  }

  private initializeMenuItems() {
    const sampleItems: InsertMenuItem[] = [
      {
        name: "Pizza Combo",
        description: "A juicy and flavorful pizza topped with marinated chicken fajita strips, bell peppers, onions, jalapeños, mozzarella cheese.",
        price: "550.00",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 10,
        isRecommended: true,
        isDeal: false,
      },
      {
        name: "Pasta Special",
        description: "Creamy pasta with grilled chicken, mushrooms, and fresh herbs in a rich sauce.",
        price: "450.00",
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 15,
        isRecommended: true,
        isDeal: false,
      },
      {
        name: "Burger Deluxe",
        description: "Juicy beef patty with fresh lettuce, tomatoes, cheese, and special sauce.",
        price: "350.00",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 20,
        isRecommended: true,
        isDeal: false,
      },
      {
        name: "Garden Salad",
        description: "Fresh mixed greens with cherry tomatoes, cucumber, and balsamic dressing.",
        price: "250.00",
        category: "Salads",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 0,
        isRecommended: true,
        isDeal: false,
      },
      {
        name: "Buffalo Wings",
        description: "Crispy chicken wings tossed in spicy buffalo sauce, served with ranch dressing.",
        price: "450.00",
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 0,
        isRecommended: false,
        isDeal: false,
      },
      {
        name: "Chicken Alfredo",
        description: "Tender chicken breast over fettuccine pasta in a rich and creamy alfredo sauce.",
        price: "650.00",
        category: "Pasta",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 0,
        isRecommended: false,
        isDeal: false,
      },
      {
        name: "Family Feast Deal",
        description: "2 Large Pizzas + Sides + Drinks. Perfect for families and groups.",
        price: "550.00",
        category: "Deals",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 0,
        isRecommended: false,
        isDeal: true,
      },
      {
        name: "Lunch Combo Deal",
        description: "Burger + Fries + Drink combo at special price.",
        price: "350.00",
        category: "Deals",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        discount: 0,
        isRecommended: false,
        isDeal: true,
      },
    ];

    sampleItems.forEach(item => {
      const id = randomUUID();
      const menuItem: MenuItem = { 
        ...item, 
        id,
        discount: item.discount ?? 0,
        isRecommended: item.isRecommended ?? false,
        isDeal: item.isDeal ?? false
      };
      this.menuItems.set(id, menuItem);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { 
      ...insertItem, 
      id,
      discount: insertItem.discount ?? 0,
      isRecommended: insertItem.isRecommended ?? false,
      isDeal: insertItem.isDeal ?? false
    };
    this.menuItems.set(id, item);
    return item;
  }

  async getOrders(tableNumber?: number): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    if (tableNumber) {
      return orders.filter(order => order.tableNumber === tableNumber);
    }
    return orders;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const now = new Date();
    const order: Order = { 
      ...insertOrder, 
      id, 
      status: insertOrder.status ?? "pending",
      paymentMethod: insertOrder.paymentMethod ?? null,
      tip: insertOrder.tip ?? "0",
      createdAt: now, 
      updatedAt: now 
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      const updatedOrder = { ...order, status, updatedAt: new Date() };
      this.orders.set(id, updatedOrder);
      return updatedOrder;
    }
    return undefined;
  }

  async getServiceRequests(tableNumber?: number): Promise<ServiceRequest[]> {
    const requests = Array.from(this.serviceRequests.values());
    if (tableNumber) {
      return requests.filter(request => request.tableNumber === tableNumber);
    }
    return requests;
  }

  async createServiceRequest(insertRequest: InsertServiceRequest): Promise<ServiceRequest> {
    const id = randomUUID();
    const request: ServiceRequest = { 
      ...insertRequest, 
      id,
      status: insertRequest.status ?? "pending",
      details: insertRequest.details ?? null,
      createdAt: new Date() 
    };
    this.serviceRequests.set(id, request);
    return request;
  }

  async updateServiceRequestStatus(id: string, status: string): Promise<ServiceRequest | undefined> {
    const request = this.serviceRequests.get(id);
    if (request) {
      const updatedRequest = { ...request, status };
      this.serviceRequests.set(id, updatedRequest);
      return updatedRequest;
    }
    return undefined;
  }

  async getReviews(orderId?: string): Promise<Review[]> {
    const reviews = Array.from(this.reviews.values());
    if (orderId) {
      return reviews.filter(review => review.orderId === orderId);
    }
    return reviews;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id,
      comment: insertReview.comment ?? null,
      createdAt: new Date() 
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();

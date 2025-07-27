import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertServiceRequestSchema, insertReviewSchema } from "@shared/schema";
import { getThemeColors, getAllThemes } from "./color-api";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Menu items
  app.get("/api/menu-items", async (req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu-items/:id", async (req, res) => {
    try {
      const item = await storage.getMenuItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch menu item" });
    }
  });

  // Orders
  app.get("/api/orders", async (req, res) => {
    try {
      const tableNumber = req.query.tableNumber ? parseInt(req.query.tableNumber as string) : undefined;
      const orders = await storage.getOrders(tableNumber);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.patch("/api/orders/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const order = await storage.updateOrderStatus(req.params.id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Service requests
  app.get("/api/service-requests", async (req, res) => {
    try {
      const tableNumber = req.query.tableNumber ? parseInt(req.query.tableNumber as string) : undefined;
      const requests = await storage.getServiceRequests(tableNumber);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service requests" });
    }
  });

  app.post("/api/service-requests", async (req, res) => {
    try {
      const validatedData = insertServiceRequestSchema.parse(req.body);
      const request = await storage.createServiceRequest(validatedData);
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid service request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create service request" });
    }
  });

  // Reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const orderId = req.query.orderId as string;
      const reviews = await storage.getReviews(orderId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Color theme API endpoints
  app.get("/api/colors", async (req, res) => {
    try {
      const theme = req.query.theme as string || 'default';
      const colors = getThemeColors(theme);
      res.json(colors);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch theme colors" });
    }
  });

  app.get("/api/themes", async (req, res) => {
    try {
      const themes = getAllThemes();
      res.json(themes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch available themes" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

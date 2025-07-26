import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/navbar";
import { Order } from "@shared/schema";
import { Link } from "wouter";

export default function Orders() {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const liveOrders = orders.filter(order => order.status !== 'completed');
  const completedOrders = orders.filter(order => order.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'pending': return 25;
      case 'preparing': return 60;
      case 'ready': return 90;
      case 'completed': return 100;
      default: return 0;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft size={20} />
                </Button>
              </Link>
              <span className="text-xl font-bold configurable-text-primary">Orders</span>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Tabs */}
        <div className="flex mb-8">
          <Button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-3 rounded-l-lg font-medium ${
              activeTab === 'live' 
                ? 'configurable-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Live Orders
          </Button>
          <Button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 rounded-r-lg font-medium ${
              activeTab === 'history' 
                ? 'configurable-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            History
          </Button>
        </div>
        
        {/* Live Orders Section */}
        {activeTab === 'live' && (
          <div className="space-y-4">
            {liveOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Clock className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-semibold configurable-text-primary mb-2">No Live Orders</h3>
                <p className="configurable-text-secondary">You don't have any active orders at the moment.</p>
              </div>
            ) : (
              liveOrders.map((order) => {
                const items = JSON.parse(order.items);
                return (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold configurable-text-primary text-lg">Order #{order.id.slice(-8).toUpperCase()}</h3>
                        <p className="configurable-text-secondary text-sm">
                          Placed on {new Date(order.createdAt || '').toLocaleDateString()} at {new Date(order.createdAt || '').toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="font-bold configurable-text-primary text-lg mt-1">Rs. {order.total}</p>
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="configurable-text-secondary">Order Progress</span>
                        <span className="configurable-text-secondary">Est. 15-20 mins</span>
                      </div>
                      <Progress value={getStatusProgress(order.status)} className="h-2" />
                    </div>
                    
                    {/* Order Items */}
                    <div className="space-y-3">
                      {items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <img src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium configurable-text-primary">{item.name}</h4>
                            <p className="text-sm configurable-text-secondary">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-medium configurable-text-primary">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
        
        {/* Order History Section */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <CheckCircle className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-semibold configurable-text-primary mb-2">No Order History</h3>
                <p className="configurable-text-secondary">You haven't completed any orders yet.</p>
              </div>
            ) : (
              completedOrders.map((order) => {
                const items = JSON.parse(order.items);
                return (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold configurable-text-primary text-lg">Order #{order.id.slice(-8).toUpperCase()}</h3>
                        <p className="configurable-text-secondary text-sm">
                          Completed on {new Date(order.updatedAt || '').toLocaleDateString()} at {new Date(order.updatedAt || '').toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          Completed
                        </Badge>
                        <p className="font-bold configurable-text-primary text-lg mt-1">Rs. {order.total}</p>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div className="space-y-3 mb-4">
                      {items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center space-x-3">
                          <img src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium configurable-text-primary">{item.name}</h4>
                            <p className="text-sm configurable-text-secondary">Qty: {item.quantity}</p>
                          </div>
                          <span className="font-medium configurable-text-primary">Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        View Receipt
                      </Button>
                      <Button className="flex-1 configurable-primary text-white hover:bg-green-600">
                        Reorder
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

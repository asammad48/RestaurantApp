import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart, Utensils, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FoodCard from "@/components/food-card";
import Footer from "@/components/footer";
import { Order, MenuItem } from "@shared/schema";
import { useCartStore } from "@/lib/store";
import { Link } from "wouter";

export default function Orders() {
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  const { setCartOpen } = useCartStore();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const { data: menuItems = [] } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items"],
  });

  const liveOrders = orders.filter(order => order.status !== 'completed');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const recommendedItems = menuItems.filter(item => item.isRecommended || (item.discount && item.discount > 0)).slice(0, 4);

  // Live orders data
  const mockOrders = [
    {
      id: '1',
      orderNumber: '#1247',
      time: 'Today, 2:30 PM',
      status: 'pending',
      items: [
        { name: '1 pasta', quantity: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80', price: 'Rs.18.00' },
        { name: '1 pasta', quantity: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80', price: 'Rs.18.00' }
      ],
      grandTotal: '$30.00'
    },
    {
      id: '2',
      orderNumber: '#1247',
      time: 'Today, 2:30 PM',
      status: 'pending',
      items: [
        { name: '1 pasta', quantity: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80', price: 'Rs.18.00' },
        { name: '1 pasta', quantity: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80', price: 'Rs.18.00' }
      ],
      grandTotal: '$30.00'
    },
    {
      id: '3',
      orderNumber: '#1247',
      time: 'Today, 2:30 PM',
      status: 'pending',
      items: [
        { name: '1 pasta', quantity: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80', price: 'Rs.18.00' },
        { name: '1 pasta', quantity: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80', price: 'Rs.18.00' }
      ],
      grandTotal: '$30.00'
    }
  ];

  // Recommended pizza data to match design
  const pizzaData = [
    {
      id: '1',
      name: 'Pizza Combo',
      description: 'A spicy and flavorful pizza topped with pizza sauce, cheese, and chili toppings.',
      price: 550.00,
      originalPrice: 'Rs. 550.00',
      discount: 10,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
      category: 'pizza',
      isRecommended: true,
      isDeal: true
    },
    {
      id: '2',
      name: 'Pizza Combo',
      description: 'A spicy and flavorful pizza topped with pizza sauce, cheese, and chili toppings.',
      price: 550.00,
      originalPrice: 'Rs. 550.00',
      discount: 10,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
      category: 'pizza',
      isRecommended: true,
      isDeal: true
    },
    {
      id: '3',
      name: 'Pizza Combo',
      description: 'A spicy and flavorful pizza topped with pizza sauce, cheese, and chili toppings.',
      price: 550.00,
      originalPrice: 'Rs. 550.00',
      discount: 10,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
      category: 'pizza',
      isRecommended: true,
      isDeal: true
    },
    {
      id: '4',
      name: 'Pizza Combo',
      description: 'A spicy and flavorful pizza topped with pizza sauce, cheese, and chili toppings.',
      price: 550.00,
      originalPrice: 'Rs. 550.00',
      discount: 10,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200',
      category: 'pizza',
      isRecommended: true,
      isDeal: true
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-lg font-bold text-green-600">RESTAURANT LOGO</div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCartOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300"
              >
                <ShoppingCart size={18} />
              </Button>
              <Badge className="bg-green-600 text-white px-4 py-2 rounded-full">
                Orders
              </Badge>
            </div>
          </div>
        </div>
      </nav>

      {/* Food Banner */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 flex">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" alt="Pizza slice" className="w-1/6 h-full object-cover opacity-80" />
            <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" alt="Pasta dish" className="w-1/6 h-full object-cover opacity-80" />
            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" alt="Salad bowl" className="w-1/6 h-full object-cover opacity-80" />
            <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" alt="Pancakes" className="w-1/6 h-full object-cover opacity-80" />
            <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" alt="Burger" className="w-1/6 h-full object-cover opacity-80" />
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" alt="Salad" className="w-1/6 h-full object-cover opacity-80" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/70 to-green-600/70"></div>
        </div>
        
        {/* Table Indicator */}
        <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white py-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Utensils size={20} />
            <span className="font-medium">You're at: TABLE #5</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* My Orders Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">My Orders</h2>
          
          {/* Order Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('live')}
              className={`px-6 py-3 font-medium border-b-2 ${
                activeTab === 'live' 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Live Order
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium border-b-2 ${
                activeTab === 'history' 
                  ? 'border-black text-black' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              History
            </button>
          </div>

          {/* Live Orders */}
          {activeTab === 'live' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{order.time}</p>
                      <p className="font-semibold text-gray-900">Order {order.orderNumber}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-lg" 
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mb-4 text-right">
                    <p className="font-bold text-gray-900">Total: {order.grandTotal}</p>
                  </div>

                  {/* Order Progress Stepper */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center w-full">
                        {/* Order Placed - Active */}
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1 h-0.5 bg-green-600 mx-2"></div>
                        
                        {/* Preparing - Active */}
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                        
                        {/* Ready - Inactive */}
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                        
                        {/* Delivered - Inactive */}
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span className="text-center">Order Placed</span>
                      <span className="text-center">Preparing</span>
                      <span className="text-center">Ready</span>
                      <span className="text-center">Delivered</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-3">
                    Proceed to payment
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="text-center py-12">
              <p className="text-gray-600">No order history available</p>
            </div>
          )}
        </div>

        {/* Recommended For You */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-6">Recommended For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzaData.map((pizza) => (
              <div key={pizza.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
                  {pizza.discount}% off
                </div>
                
                {/* Pizza Image */}
                <div className="relative h-40 bg-gray-100">
                  <img 
                    src={pizza.image} 
                    alt={pizza.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Pizza Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{pizza.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pizza.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold text-gray-900">
                      {pizza.originalPrice}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full py-2"
                    onClick={() => {
                      // Add to cart functionality would go here
                      console.log('Adding pizza to cart:', pizza.name);
                    }}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
        {/* Service Request Button */}
        <Button 
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => console.log('Service request')}
        >
          <User size={24} />
        </Button>
        
        {/* Food Order Button */}
        <Button 
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => console.log('Food order')}
        >
          <Utensils size={24} />
        </Button>
      </div>

      <Footer />
    </div>
  );
}

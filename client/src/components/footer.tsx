import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">LA PIZZA POPOLARE</h3>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <Youtube size={24} />
            </a>
          </div>
          <p className="text-gray-400">&copy; 2024 LA PIZZA POPOLARE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

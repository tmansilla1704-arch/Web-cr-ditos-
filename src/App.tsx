import React, { useState } from 'react';
import { ShoppingCart, Gamepad2, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Diamantes Free Fire', category: 'Free Fire', price: '$5.00', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
  { id: 2, name: 'Puntos Valorant', category: 'Valorant', price: '$10.00', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80' },
  { id: 3, name: 'Diamantes Mobile Legends', category: 'Mobile Legends', price: '$8.00', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80' },
  { id: 4, name: 'Robux Roblox', category: 'Roblox', price: '$15.00', image: 'https://images.unsplash.com/photo-1612287233302-3f1d53db71d0?w=500&q=80' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cart, setCart] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              DLC SHOPS
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl border border-slate-700 transition">
                <ShoppingCart className="w-5 h-5 text-blue-400" />
                <span className="font-bold">{cart.length}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/20 rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">
              Recargas Instantáneas y Seguras
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
              Obtén tus créditos, diamantes y pases para tus juegos favoritos al instante y al mejor precio.
            </p>
            <div className="flex justify-center max-w-md mx-auto relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar juego o recarga..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {['Todos', 'Free Fire', 'Valorant', 'Mobile Legends', 'Roblox'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition duration-300">
              <div className="h-48 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Verificado
                  </span>
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-bold mt-1 mb-3 text-slate-100">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-emerald-400">{product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 DLC SHOPS. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

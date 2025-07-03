import React from 'react';
import ProductCard from './components/ProductCard';
import { useLanguage } from './context/LanguageContext';
import './index.css';

// Sample data
const products = [
  {
    id: 1,
    name: {
      en: "iPhone 15",
      ar: "آيفون 15"
    },
    price: 999,
    original_price: 1199,
    type: "simple",
    image: "https://tradelinestores.s3.amazonaws.com/media/product_images/a9c305ac-6812-4cc0-80cb-a1f74d307715.png",
    is_featured: true,
    is_ai_suggested: true
  },
  {
    id: 2,
    name: {
      en: "T-Shirt",
      ar: "تي شيرت"
    },
    type: "variable",
    variations: [
      { price: 50 },
      { price: 75 },
      { price: 60 }
    ],
    image: "https://townteam.com/cdn/shop/files/TSH24SARO20987TM1-Olive.jpg?v=1747481883",
    is_featured: false,
    is_ai_suggested: false
  }
];

const App = () => {
  const { toggleLanguage, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {language === 'ar' ? 'إدارة المنتجات' : 'Product Management'}
          </h1>
          <button 
            onClick={toggleLanguage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
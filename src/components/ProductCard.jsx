// src/components/ProductCard.jsx
import React, { useState } from 'react';
import useCompareStore from '../stores/useCompareStore';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { t, language } = useLanguage();
  const { compareItems, addToCompare, removeFromCompare } = useCompareStore();
  const [isLiked, setIsLiked] = useState(false);

  const isInCompare = compareItems.some(item => item.id === product.id);
  const isVariable = product.type === 'variable';

  const handleCompareClick = () => {
    if (isInCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const renderPrice = () => {
    if (isVariable && product.variations) {
      const prices = product.variations.map(v => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return (
        <div className="price">
          {t('product.from')} {minPrice} {t('product.currency')} 
          {t('product.to')} {maxPrice} {t('product.currency')}
        </div>
      );
    }

    return (
      <div className="price">
        <span className="final-price">{product.price} {t('product.currency')}</span>
        {product.original_price && product.original_price > product.price && (
          <span className="original-price">
            <del>{product.original_price} {t('product.currency')}</del>
          </span>
        )}
      </div>
    );
  };

  const calculateDiscountPercentage = () => {
    if (!product.original_price || product.original_price <= product.price) return 0;
    const discount = product.original_price - product.price;
    return Math.round((discount / product.original_price) * 100);
  };

  const discountPercentage = calculateDiscountPercentage();

  return (
    <div className={`product-card ${language === 'ar' ? 'rtl' : ''}`}>
      <div className="badges">
        {product.is_featured && (
          <span className="featured-badge">{t('product.featured')}</span>
        )}
        {product.is_ai_suggested && (
          <span className="ai-badge">{t('product.ai_suggested')}</span>
        )}
      </div>

      <img 
        src={product.image} 
        alt={product.name[language] || product.name.en} 
        className="product-image"
      />

      <div className="product-info">
        <h3 className="product-name">{product.name[language] || product.name.en}</h3>
        <span className="product-type">{t(`product.${product.type}`)}</span>
        {renderPrice()}

        {discountPercentage > 0 && (
          <div className="discount-badge">
            {discountPercentage}% {t('product.discount')}
          </div>
        )}
      </div>

      <div className="product-actions">
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={() => setIsLiked(!isLiked)}
          aria-label={t('product.wishlist')}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>

        <button 
          className={`compare-button ${isInCompare ? 'active' : ''}`}
          onClick={handleCompareClick}
        >
          {t('product.compare')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/pricing';

const Product = ({ product }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  const { currency, conversionRate } = useSelector(state => state.location);

  useEffect(() => {
    const extractDirectUrl = (url) => {
      if (!url) return '';
      
      try {
        if (url.includes('imgurl=')) {
          const match = url.match(/imgurl=([^&]+)/);
          return match ? decodeURIComponent(match[1]) : url;
        }
        return url;
      } catch (error) {
        return '';
      }
    };

    const processedUrl = extractDirectUrl(product.image);
    setImageUrl(processedUrl);
    setImageError(false);
  }, [product.image]);

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = 'https://placehold.co/300x300?text=No+Image';
    }
  };

  // Format the price based on user's location
  const localPrice = formatPrice(product.price, currency, conversionRate);
  const showOriginalPrice = currency !== '₹' && conversionRate !== 1;

  return (
    <div className="my-3 p-3 rounded-lg shadow-md border border-gray-200">
      <Link to={`/product/${product._id}`}>
        <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4 flex items-center justify-center">
          <img 
            src={imageUrl || 'https://placehold.co/300x300?text=No+Image'} 
            alt={product.name}
            className={`w-full h-full ${imageError ? 'object-cover p-4' : 'object-contain p-4'}`}
            onError={handleImageError}
            loading="lazy"
            crossOrigin="anonymous"
          />
        </div>
      </Link>

      <div className="space-y-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="text-sm text-gray-600 space-y-1">
          <div>{product.platform}</div>
          <div>{product.duration}</div>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {localPrice}
          </span>
          {/* {showOriginalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Product;

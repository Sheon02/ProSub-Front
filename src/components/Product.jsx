import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/pricing';

const Product = ({ product }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  const locationState = useSelector(state => state.location);
  const { currency, conversionRate, countryCode } = locationState || {};

  useEffect(() => {
    const extractDirectUrl = (url) => {
      if (!url) return '';
      
      try {
        // Handle Google image proxy URLs
        if (url.includes('imgurl=')) {
          const match = url.match(/imgurl=([^&]+)/);
          return match ? decodeURIComponent(match[1]) : url;
        }
        
        // Handle other cases if needed
        return url;
      } catch (error) {
        console.error('Error processing image URL:', error);
        return '';
      }
    };

    if (product?.image) {
      const processedUrl = extractDirectUrl(product.image);
      console.log('Processed image URL:', processedUrl); // Debugging
      setImageUrl(processedUrl);
      setImageError(false);
    }
  }, [product?.image]);

  const handleImageError = (e) => {
    if (!imageError) {
      console.warn('Image failed to load, using fallback');
      setImageError(true);
      e.target.src = 'https://placehold.co/300x300?text=No+Image';
    }
  };

  // Format the price based on user's location
  const localPrice = formatPrice(product?.price, currency, conversionRate);
  const showOriginalPrice = currency !== '₹' && conversionRate !== 1;

  return (
    <div className="my-3 p-3 rounded-lg shadow-md border border-gray-200">
      <Link to={`/product/${product?._id}`}>
        <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4 flex items-center justify-center">
          <img 
            src={imageUrl || 'https://placehold.co/300x300?text=Loading...'} 
            alt={product?.name || 'Product image'}
            className={`w-full h-full ${imageError ? 'object-cover p-4' : 'object-contain p-4'}`}
            onError={handleImageError}
            loading="lazy"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>
      </Link>

      <div className="space-y-2">
        <Link to={`/product/${product?._id}`}>
          <h3 className="text-lg font-bold line-clamp-2">
            {product?.name || 'Product Name'}
          </h3>
        </Link>

        <div className="text-sm text-gray-600 space-y-1">
          <div>{product?.platform || ''}</div>
          <div>{product?.duration || ''}</div>
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-semibold">
            {localPrice || 'N/A'}
          </span>
          {showOriginalPrice && product?.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;

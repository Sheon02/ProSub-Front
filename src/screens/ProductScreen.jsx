import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getCountryCurrencyData } from '../utils/pricing';
import Magnet from '../animations/Magnet.jsx'; 
import { formatPrice } from '../utils/pricing';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Get location data from Redux store
  const locationState = useSelector((state) => state.location);
  const { currency, conversionRate, countryCode } = locationState || {};
  
  // Get currency data from location service
  const currencyData = getCountryCurrencyData(countryCode);

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
        console.error('Error processing image URL:', error);
        return '';
      }
    };

    if (product?.image) {
      const processedUrl = extractDirectUrl(product.image);
      setImageUrl(processedUrl);
      setImageError(false);
    }
  }, [product?.image]);

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = 'https://placehold.co/300x300?text=No+Image';
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 })); // Default quantity of 1
    navigate('/cart');
  };

  // Calculate local price
  const localPrice = formatPrice(product?.price, currency, conversionRate);

  return (
    <div className="container mx-auto px-4 py-6">
      <Link 
        to="/" 
        className="inline-block mb-4 px-4 py-2 bg-[#90aead] hover:bg-gray-300 rounded-lg transition"
      >
        ← Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col">
          {/* Top Row: Image + Price + Buy Button */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            {/* Image */}
            <div className="w-full md:w-1/3">
              <img 
                src={imageUrl || 'https://placehold.co/300x300?text=No+Image'} 
                alt={product.name} 
                className={`w-full rounded-lg ${imageError ? 'object-cover p-4' : 'object-contain'}`}
                onError={handleImageError}
                crossOrigin="anonymous"
                loading="lazy"
              />
            </div>

            {/* Price and Buy Button */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-4">
              <div className="text-2xl font-bold">
                {localPrice}
              </div>
              
              <Magnet
                magnetStrength={1.5}
                activeTransition="transform 0.2s ease-out"
                inactiveTransition="transform 0.3s ease-in-out"
              >
                <button
                  onClick={addToCartHandler}
                  className="py-2 px-6 rounded-lg bg-[#e64833] text-[#244855]"
                >
                  Buy Now
                </button>
              </Magnet>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-3x1 whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
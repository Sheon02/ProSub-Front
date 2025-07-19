import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useSelector } from 'react-redux';
import { formatPrice } from '../utils/pricing';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Tilt } from '../components/core/tilt'; // Import the Tilt component

const HomeScreen = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });
  const { currency, conversionRate } = useSelector(state => state.location);

  // Filter active products
  const activeProducts = data?.products?.filter(product => product.isActive) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
       <div className='flex justify-center items-center' ><Loader /></div>
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : activeProducts.length === 0 ? (
        <Message variant='info'>No active products available</Message>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeProducts.map((product) => {
            const localPrice = formatPrice(product.price, currency, conversionRate);
            const originalPrice = `₹${product.price.toFixed(2)}`;
            
            return (
              <Tilt 
                key={product._id} 
                rotationFactor={8} 
                isReverse
                className="h-full" // Ensure tilt covers entire card
              >
                <div className="h-full cursor-pointer"> {/* Wrapper for consistent height */}
                  <Product 
                    product={{
                      ...product,
                      displayPrice: localPrice,
                      originalPrice: currency !== '₹' ? originalPrice : undefined
                    }} 
                  />
                </div>
              </Tilt>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
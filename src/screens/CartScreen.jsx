import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { removeFromCart } from '../slices/cartSlice';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Magnet from '../animations/Magnet.jsx';
import { formatPrice } from '../utils/pricing';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, totalPrice, currency, conversionRate } = useSelector((state) => state.cart);
  const [email, setEmail] = useState(userInfo?.email || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to extract direct image URL
  const extractImageUrl = (url) => {
    if (!url) return 'https://placehold.co/400x400?text=No+Image';
    if (url.includes('imgurl=')) {
      const match = url.match(/imgurl=([^&]+)/);
      return match ? decodeURIComponent(match[1]) : url;
    }
    return url;
  };

  // Format price for display
  const getFormattedPrice = (price) => {
    return formatPrice(price, currency, conversionRate);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      const { data } = await axios.post('/api/payment/orders', {
        amount: totalPrice,
        currency: currency,
        receipt: `receipt_${Date.now()}`,
      }, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount.toString(),
        currency: data.currency,
        name: 'Premium',
        description: 'Order Payment',
        prefill: {
          name: userInfo?.name || 'Customer',
          email: email || 'premiumhelpdirect@gmail.com',
          contact: ''
        },
        theme: {
          color: '#3399cc'
        },
        handler: function(response) {
          navigate('/order-success', {
            state: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              amount: totalPrice,
              currency: currency,
              email,
              items: cartItems,
            }
          });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setError(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.response?.data?.error || error.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  const checkoutHandler = async () => {
    if (!userInfo) {
      navigate('/login?redirect=/cart');
    } else if (!email) {
      setError('Please enter your email for order updates');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
    } else {
      await displayRazorpay();
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const formattedTotalPrice = getFormattedPrice(totalPrice);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Cart Items */}
        <div className="lg:w-2/3">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          
          {error && (
            <Message variant="danger" onClose={() => setError(null)}>
              {error}
            </Message>
          )}

          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
            </Message>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => {
                const directImageUrl = extractImageUrl(item.image);
                const formattedPrice = getFormattedPrice(item.price);
                
                return (
                  <div key={item._id} className="border rounded-lg p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image Container with transparent background */}
                      <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-transparent">
                        <img 
                          src={directImageUrl}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          style={{ backgroundColor: 'transparent' }}
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/400x400?text=No+Image';
                          }}
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <Link 
                            to={`/product/${item._id}`} 
                            className="text-xl font-semibold hover:underline"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCartHandler(item._id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </div>
                        
                        <div className="mt-2 text-lg font-medium">
                          {formattedPrice}
                        </div>
                        
                        <div className="mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full inline-flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          Activation in 2 days
                        </div>
                        
                        {/* Email Input */}
                        <div className="mt-4">
                          <label htmlFor={`email-${item._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                            Email for product activation
                          </label>
                          <input
                            type="email"
                            id={`email-${item._id}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column - Summary */}
        <div className="lg:w-1/3 md:my-14">
          <div className="border rounded-lg shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'items'}):</span>
                <span className="font-medium">
                  {formattedTotalPrice}
                </span>
              </div>
              
              <div className="pt-4 border-t flex justify-center">
                <Magnet
                  magnetStrength={1.5}
                  activeTransition="transform 0.2s ease-out"
                  inactiveTransition="transform 0.3s ease-in-out"
                >
                  <button
                    onClick={checkoutHandler}
                    disabled={cartItems.length === 0 || !email || loading}
                    className={`py-3 px-8 rounded-lg text-lg ${
                      cartItems.length === 0 || !email || loading
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-[#e64833] text-[#244855]'
                    }`}
                  >
                    {loading ? (
                      <div className="flex flex-nowrap gap-4 overflow-x-auto">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : userInfo ? (
                      'Checkout'
                    ) : (
                      'Login to Checkout'
                    )}
                  </button>
                </Magnet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
import { useState, useEffect } from 'react';
import { FaUser, FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBox, FaPlusCircle, FaUsers, FaClipboardList, FaTimes, FaChevronDown, FaChevronUp, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';
import RotatingText from '../animations/RotatingText.jsx';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileAccountMenu, setShowMobileAccountMenu] = useState(false);

  useEffect(() => {
    setShowDropdown(false);
  }, [userInfo]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setShowMobileAccountMenu(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowMobileAccountMenu(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowDropdown(false);
    setShowMobileAccountMenu(false);
  }, [userInfo]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      navigate('/');
      toast.success('Logged out successfully');
    } catch (err) {
      if (err.status === 401) {
        dispatch(logout());
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
        navigate('/login');
        toast.info('Session expired - Please login again');
      } else {
        toast.error(err?.data?.message || 'Logout failed');
      }
    }
  };

  return (
    <nav className="bg-[#244855] border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-semibold text-[#fbe9d0]">
            Premium
          </span>
          <RotatingText
            texts={['Subscriptions', 'Deals','Accounts', 'Offers', 'Savings','Plans','Benefits','Perks','Rewards','Bonuses','Upgrade','Unlock','Enjoy','Streaming','Gaming','Software','Services','Content']}
            rotationInterval={2500}  // Slightly slower rotation
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            animatePresenceMode="wait"
            animatePresenceInitial={false}
            staggerDuration={0.02}  // Slightly faster stagger
            staggerFrom="first"
            transition={{
              type: "spring",
              damping: 20,          // Less damping for more fluid motion
              stiffness: 300,       // Softer spring
              mass: 0.5,           // Adds weight to the animation
              layout: {
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.4
              }
            }}
            loop={true}
            auto={true}
            splitBy="characters"
            mainClassName="ml-1 px-2 bg-[#fbe9d0] text-[#244855] h-[38px] flex items-center justify-center rounded-lg text-2xl font-semibold overflow-hidden"
            splitLevelClassName="inline-flex overflow-hidden"
            elementLevelClassName="inline-block"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#fbe9d0] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 hover:text-[#e64b33] " 
          aria-controls="navbar-default" 
          aria-expanded={mobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          )}
        </button>

        {/* Navigation Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#244855] ">
            <li>
              <Link 
                to="/" 
                className="block py-2 px-3 rounded text-[#244855] hover:text-[#874f41] hover:bg-gray-100 md:text-[#fbe9d0] md:hover:bg-transparent md:border-0 md:hover:text-[#e64b33] md:p-0"
                onClick={closeMobileMenu}
              >
                <FaHome className="inline mr-1 mb-[3px]" /> Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block py-2 px-3 text-[#244855] hover:text-[#874f41] rounded hover:bg-gray-100 md:text-[#fbe9d0] md:hover:bg-transparent md:border-0 md:hover:text-[#e64b33] md:p-0"
                onClick={closeMobileMenu}
              >
                <FaInfoCircle className="inline mr-1 mb-[3px]" /> About
              </Link>
            </li>
            
            {/* User Authentication Section */}
            <li className="relative">
              {userInfo ? (
                <>
                  {/* Desktop View - Dropdown */}
                  <div className="hidden md:block group bg-[#244855]">
                    <button
                      className="flex items-center py-2 px-3 text-[#244855] hover:text-[#874f41] rounded hover:bg-gray-100 md:hover:bg-transparent md:text-[#fbe9d0] md:border-0 md:hover:text-[#e64b33] md:p-0"
                      onClick={() => setShowDropdown(!showDropdown)}
                      type="button"
                    >
                      <FaUser className="mr-1" />
                      <span>Account</span>
                      <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <div className="px-4 py-3 text-sm text-gray-900">
                          <div>Welcome</div>
                          <div className="font-medium truncate">{userInfo.name}</div>
                          {userInfo.isAdmin && (
                            <div className="text-xs text-[#e64b33] mt-1">Admin</div>
                          )}
                        </div>
                        <ul className="py-2 text-sm text-gray-700">
                          {/* Profile Link */}
                          <li>
                            <Link
                              to="/profile"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setShowDropdown(false)}
                            >
                              <FaUserCircle className="inline mr-2 mb-[3px]" /> Profile
                            </Link>
                          </li>
                          
                          {/* My Orders Link (for non-admin) */}
                          {!userInfo.isAdmin && (
                            <li>
                              <Link
                                to="/myorders"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setShowDropdown(false)}
                              >
                                <FaClipboardList className="inline mr-2 mb-[3px]" /> My Orders
                              </Link>
                            </li>
                          )}
                          
                          {/* Admin-only links */}
                          {userInfo.isAdmin && (
                            <>
                              <li>
                                <Link
                                  to="/admin/products"
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <FaBox className="inline mr-2 mb-[3px]" /> View Products
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/admin/products/new"
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <FaPlusCircle className="inline mr-2 mb-[3px]" /> Add Product
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/admin/users"
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <FaUsers className="inline mr-2 mb-[3px]" /> Users
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/admin/orders"
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <FaClipboardList className="inline mr-2 mb-[3px]" /> All Orders
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/admin/neworders"
                                  className="block px-4 py-2 hover:bg-gray-100"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  <FaClipboardList className="inline mr-2 mb-[3px]" /> New Orders
                                </Link>
                              </li>
                              <li className="border-t border-gray-200"></li>
                            </>
                          )}
                          <li>
                            <button
                              onClick={logoutHandler}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[#e64b33]"
                            >
                              <FaSignOutAlt className="inline mr-2" /> Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Mobile View - Inline Menu with Welcome Message */}
                  <div className="md:hidden">
                    <button
                      className="flex items-center justify-between w-full py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-[#e64b33] p-0"
                      onClick={() => setShowMobileAccountMenu(!showMobileAccountMenu)}
                      type="button"
                    >
                      <span className="flex items-center">
                        <FaUser className="mr-1" />
                        Account
                      </span>
                      {showMobileAccountMenu ? (
                        <FaChevronUp className="ml-2" />
                      ) : (
                        <FaChevronDown className="ml-2" />
                      )}
                    </button>
                    {showMobileAccountMenu && (
                      <div className="pl-4 mt-2 space-y-2">
                        {/* Welcome Message - Same as desktop */}
                        <div className="px-3 py-2 text-sm text-[#244855]">
                          <div>Welcome</div>
                          <div className="font-medium text-[#244855] truncate">{userInfo.name}</div>
                          {userInfo.isAdmin && (
                            <div className="text-xs text-[#e64b33] mt-1">Admin</div>
                          )}
                        </div>
                        
                        {/* Profile Link */}
                        <Link
                          to="/profile"
                          className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                          onClick={closeMobileMenu}
                        >
                          <FaUserCircle className="inline mr-2 mb-[3px]" /> Profile
                        </Link>
                        
                        {/* My Orders Link (for non-admin) */}
                        {!userInfo.isAdmin && (
                          <Link
                            to="/myorders"
                            className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                            onClick={closeMobileMenu}
                          >
                            <FaClipboardList className="inline mr-2 mb-[3px]" /> My Orders
                          </Link>
                        )}
                        
                        {/* Admin-only links */}
                        {userInfo.isAdmin && (
                          <>
                            <Link
                              to="/admin/products"
                              className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                              onClick={closeMobileMenu}
                            >
                              <FaBox className="inline mr-2 mb-[3px]" /> View Products
                            </Link>
                            <Link
                              to="/admin/products/new"
                              className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                              onClick={closeMobileMenu}
                            >
                              <FaPlusCircle className="inline mr-2 mb-[3px]" /> Add Product
                            </Link>
                            <Link
                              to="/admin/users"
                              className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                              onClick={closeMobileMenu}
                            >
                              <FaUsers className="inline mr-2 mb-[3px]" /> Users
                            </Link>
                            <Link
                              to="/admin/orders"
                              className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                              onClick={closeMobileMenu}
                            >
                              <FaClipboardList className="inline mr-2 mb-[3px]" /> Orders
                            </Link>
                            <Link
                              to="/admin/neworders"
                              className="block py-2 px-3 text-[#244855] rounded hover:bg-gray-100 hover:text-[#e64b33]"
                              onClick={closeMobileMenu}
                            >
                              <FaClipboardList className="inline mr-2 mb-[3px]" /> New Orders
                            </Link>
                          </>
                        )}
                        <button
                          onClick={() => {
                            logoutHandler();
                            closeMobileMenu();
                          }}
                          className="block w-full text-left py-2 px-3 text-[#e64b33] rounded hover:bg-gray-100"
                        >
                          <FaSignOutAlt className="inline mr-2" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-[#244855] md:text-[#fbe9d0] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#e64b33] md:p-0"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
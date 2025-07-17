import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfileScreen = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name,
        email: userInfo.email,
        password: '',
        confirmPassword: ''
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Check if password field has input but confirm is empty or doesn't match
    if (formData.password) {
      if (!formData.confirmPassword) {
        toast.error('Please confirm your new password');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }
    
    // If only password is filled (without confirm)
    if (!formData.password && formData.confirmPassword) {
      toast.error('Please enter a new password');
      return;
    }

    try {
      const res = await updateProfile({
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined // Only send password if it's not empty
      }).unwrap();
      
      dispatch(setCredentials(res));
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 md:my-20 bg-[#fbe9d0] rounded-lg shadow-md">
      <h1 className="text-2xl text-[#244855] font-bold mb-6 text-center">User Profile</h1>
      
      <form onSubmit={submitHandler} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#244855] mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#244855] mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#244855] mb-1">
            New Password (leave blank to keep current)
          </label>
          <div className="relative">
            <input
              type={showPassword.password ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              minLength="6"
              style={{"-webkit-text-security": showPassword.password ? "none" : "disc"}}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword.password ? (
                <FaEyeSlash className="h-5 w-5 text-gray-500" />
              ) : (
                <FaEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Field - Only show if password has value */}
        {formData.password && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#244855] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                minLength="6"
                style={{"-webkit-text-security": showPassword.password ? "none" : "disc"}}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword.confirmPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Update Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loadingUpdateProfile}
            className={`w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
              loadingUpdateProfile 
                ? 'bg-[#ed9b76] cursor-not-allowed' 
                : 'bg-[#e64833] hover:bg-[#c12d1a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loadingUpdateProfile ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Update Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileScreen;
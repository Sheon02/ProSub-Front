import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSendOTPMutation, useVerifyOTPMutation, useUpdatePasswordMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { FaEnvelope, FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [sendOTP, { isLoading: loadingSendOTP }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: loadingVerifyOTP }] = useVerifyOTPMutation();
  const [updatePassword, { isLoading: loadingUpdatePassword }] = useUpdatePasswordMutation();

  const handleSendOTP = async () => {
    try {
      await sendOTP({ email: userInfo.email }).unwrap();
      setOtpSent(true);
      toast.success('OTP sent to your registered email');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await verifyOTP({ email: userInfo.email, otp }).unwrap();
      setOtpVerified(true);
      setOtpError('');
      toast.success('OTP verified successfully');
    } catch (err) {
      setOtpError(err?.data?.message || 'Invalid OTP');
      toast.error(err?.data?.message || 'Invalid OTP');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await updatePassword({ password }).unwrap();
      toast.success('Password updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h1>
      
      {!otpSent ? (
        <div className="text-center">
          <p className="mb-4">We'll send an OTP to your registered email for verification</p>
          <button
            onClick={handleSendOTP}
            disabled={loadingSendOTP}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center mx-auto"
          >
            {loadingSendOTP ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending OTP...
              </span>
            ) : (
              <span className="flex items-center">
                <FaEnvelope className="mr-2" /> Send OTP
              </span>
            )}
          </button>
        </div>
      ) : !otpVerified ? (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="mb-2 text-sm">Enter the OTP sent to your email</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="6-digit OTP"
              />
              <button
                onClick={handleVerifyOTP}
                disabled={loadingVerifyOTP}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
              >
                {loadingVerifyOTP ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FaCheck className="mr-2" /> Verify
                  </span>
                )}
              </button>
            </div>
            {otpError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <FaTimes className="mr-1" /> {otpError}
              </p>
            )}
          </div>
          <button
            onClick={handleSendOTP}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Resend OTP
          </button>
        </div>
      ) : (
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingUpdatePassword}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loadingUpdatePassword ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          >
            {loadingUpdatePassword ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePasswordScreen;
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from './slices/locationSlice';
import Silk from './animations/Silk.jsx';

const App = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location); // <-- get location from redux
  const [locationStatus, setLocationStatus] = useState('detecting');
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  const detectLocation = async () => {
  try {
    setLocationPermissionDenied(false);
    setLocationStatus('detecting');
    
    // Try HTML5 geolocation first (more accurate)
    if (navigator.geolocation) {
      setLocationStatus('requesting_permission');
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          (error) => {
            let errorMessage = 'Location detection failed';
            switch(error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Location permission denied';
                setLocationPermissionDenied(true);
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location services unavailable';
                break;
              case error.TIMEOUT:
                errorMessage = 'Location request timed out';
                break;
            }
            reject(new Error(errorMessage));
          },
          {
            timeout: 10000, // Increased timeout
            maximumAge: 60 * 60 * 1000,
            enableHighAccuracy: true
          }
        );
      });
      
      setLocationStatus('fetching_location_data');
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
      );
      
      if (!response.ok) throw new Error('Reverse geocoding failed');
      
      const data = await response.json();
      const country = data.address?.country;
      const county = data.address?.county || data.address?.state;
      
      if (country) {
        dispatch(setUserLocation({
          country,
          county,
          isDetected: true,
          method: 'gps',
          accuracy: position.coords.accuracy
        }));
        setLocationStatus('success');
        return;
      }
      throw new Error('No country data available');
    }
    throw new Error('Geolocation not supported');
  } catch (error) {
    console.log("Geolocation error:", error.message);
    
    if (locationPermissionDenied) {
      // Only show permission-related UI, don't fallback
      setLocationStatus('permission_denied');
      return;
    }
    
    setLocationStatus('fallback_ip');
    
    try {
      // Fallback to IP-based geolocation
      const ipResponse = await fetch('https://ipapi.co/json/');
      
      if (!ipResponse.ok) throw new Error('IP geolocation failed');
      
      const ipData = await ipResponse.json();
      
      if (ipData.country) {
        dispatch(setUserLocation({
          country: ipData.country_name,
          county: ipData.region,
          isDetected: true,
          method: 'ip',
          accuracy: 'low'
        }));
        setLocationStatus('success_ip');
        return;
      }
      throw new Error('No country data from IP');
    } catch (ipError) {
      console.log("IP geolocation failed:", ipError.message);
      setLocationStatus('error');
      dispatch(setUserLocation({
        isDetected: false,
        error: ipError.message
      }));
    }
  }
};
  
  useEffect(() => {
    detectLocation();
  }, [dispatch]);

  useEffect(() => {
    // Log location data whenever it changes
    console.log('Current location data:', location);
  }, [location]);


  const displayLocationData = () => {
  const store = require('./store').default; // Adjust path to your store file
  const locationState = store.getState().location;
  console.log('Current location data:', locationState);
};



  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Silk background animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-52">
        <Silk
          speed={5}
          scale={1}
          color="#b4dbda"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      <Header />
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto w-full">
          {locationPermissionDenied ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Please enable location access to see product prices in your country.
                    <button
                      onClick={detectLocation}
                      className="ml-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      Try Again
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          <div className="min-h-[calc(100vh-112px)]"> 
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeButton={false}
  closeOnClick={false}
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
  toastStyle={{
    backgroundColor: '#fbe9d0', // Cream background
    color: '#244855', // Dark teal text
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Subtle shadow
    margin: '8px', // Add some spacing
    width: 'auto', // Auto width
    maxWidth: 'calc(100% - 32px)' // Prevent too wide on mobile
  }}
  progressStyle={{
    background: '#e64833', // Red-orange progress bar
    height: '3px' // Thicker progress bar
  }}
  bodyStyle={{
    padding: '12px 16px', // Adjust padding
    margin: 0 // Remove default margins
  }}
/>
    </div>
  );
};

export default App;
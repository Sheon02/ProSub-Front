import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLocation } from './slices/locationSlice';
import Silk from './animations/Silk.jsx';

const App = () => {
  const dispatch = useDispatch();
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const locationData = useSelector((state) => state.location);

  const detectLocation = async () => {
    // Try Cloudflare GeoIP first
    try {
      const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
      if (!response.ok) throw new Error('Failed to fetch location');
      
      const text = await response.text();
      const loc = text.split('\n').find(line => line.startsWith('loc='))?.split('=')[1];
      
      if (loc) {
        dispatch(setUserLocation({
          countryCode: loc,
          isDetected: true,
          method: 'cloudflare',
          accuracy: 'country-level'
        }));
        return;
      }
      throw new Error('No location data in response');
    } catch (error) {
      console.log("Cloudflare method failed, trying alternative GeoIP services");
    }

    // Try alternative free GeoIP services
    const geoIpServices = [
      'https://ipapi.co/json/',
      'https://ipwho.is/',
      'https://freeipapi.com/api/json'
    ];

    for (const service of geoIpServices) {
      try {
        const response = await fetch(service);
        if (!response.ok) continue;
        
        const data = await response.json();
        if (data.country_code) {
          dispatch(setUserLocation({
            countryCode: data.country_code,
            isDetected: true,
            method: 'geoip-service',
            accuracy: 'country-level',
            service: service
          }));
          return;
        }
      } catch (error) {
        console.log(`GeoIP service ${service} failed`, error);
        continue;
      }
    }

    // Final fallback to browser geolocation API
    if ('geolocation' in navigator) {
      const handleGeolocationSuccess = (position) => {
        setShowLocationPrompt(false);
        dispatch(setUserLocation({
          coords: position.coords,
          isDetected: true,
          method: 'browser-geolocation',
          accuracy: position.coords.accuracy > 0 ? 
                   `${Math.round(position.coords.accuracy)} meters` : 'high'
        }));
      };

      const handleGeolocationError = (error) => {
        setShowLocationPrompt(true);
        dispatch(setUserLocation({
          isDetected: false,
          error: error.message
        }));
      };

      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError,
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      dispatch(setUserLocation({
        isDetected: false,
        error: 'No location methods available'
      }));
    }
  };

  const requestGeolocationPermission = () => {
    setShowLocationPrompt(false);
    detectLocation();
  };

  useEffect(() => {
    detectLocation();
  }, [dispatch]);

  useEffect(() => {
    console.log('Redux Location State Update:', {
      ...locationData,
      timestamp: new Date().toISOString()
    });

    if (locationData.isDetected) {
      console.group('Location Detection Successful');
      console.log('Method:', locationData.method);
      console.log('Country Code:', locationData.countryCode);
      if (locationData.coords) {
        console.log('Coordinates:', {
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
          accuracy: locationData.coords.accuracy
        });
      }
      console.log('Accuracy Level:', locationData.accuracy);
      if (locationData.service) {
        console.log('Service Used:', locationData.service);
      }
      console.groupEnd();
    } else if (locationData.error) {
      console.group('Location Detection Failed');
      console.error('Error:', locationData.error);
      console.log('Available Methods:', [
        'cloudflare',
        'ipapi.co',
        'ipwho.is',
        'freeipapi',
        'browser-geolocation'
      ]);
      console.groupEnd();
    }
  }, [locationData]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Location permission prompt banner */}
      {showLocationPrompt && (
        <div className="w-full bg-orange-100 text-orange-800 p-3 text-center sticky top-0 z-50 flex justify-between items-center">
          <span>Please enable location services for better experience</span>
          <button 
            onClick={requestGeolocationPermission}
            className="ml-4 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      )}

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
          backgroundColor: '#fbe9d0',
          color: '#244855',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          margin: '8px',
          width: 'auto',
          maxWidth: 'calc(100% - 32px)'
        }}
        progressStyle={{
          background: '#e64833',
          height: '3px'
        }}
        bodyStyle={{
          padding: '12px 16px',
          margin: 0
        }}
      />
    </div>
  );
};

export default App;
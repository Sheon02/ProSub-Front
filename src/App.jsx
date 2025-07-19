import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { useDispatch } from 'react-redux';
import { setUserLocation } from './slices/locationSlice';
import Silk from './animations/Silk.jsx';

const App = () => {
  const dispatch = useDispatch();

  const detectLocation = async () => {
    try {
      const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
      if (!response.ok) throw new Error('Failed to fetch location');
      
      const text = await response.text();
      const lines = text.split('\n');
      const locationData = {};
      
      lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) locationData[key] = value;
      });
      
      if (locationData.loc) {
        dispatch(setUserLocation({
          countryCode: locationData.loc,
          isDetected: true,
          method: 'cloudflare',
          accuracy: 'network'
        }));
      } else {
        throw new Error('No location data available');
      }
    } catch (error) {
      console.error("Location detection failed:", error);
      dispatch(setUserLocation({
        isDetected: false,
        error: error.message
      }));
    }
  };
  
  useEffect(() => {
    detectLocation();
  }, [dispatch]);

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
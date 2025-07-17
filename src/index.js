import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const ErrorBoundary = ({ children, fallback }) => {
  try {
    return children;
  } catch (error) {
    return fallback || <div style={{ color: 'red', padding: '20px' }}>Component error</div>;
  }
};

const lazyLoadComponent = (path) => {
  const Component = React.lazy(() => import(path).catch(() => ({
    default: () => <div>Failed to load component</div>
  })));

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={lazyLoadComponent('./screens/HomeScreen')} />
      <Route path='/product/:id' element={lazyLoadComponent('./screens/ProductScreen')} />
      <Route path='/cart' element={lazyLoadComponent('./screens/CartScreen')} />
      <Route path='/login' element={lazyLoadComponent('./screens/LoginScreen')} />
      <Route path='/register' element={lazyLoadComponent('./screens/RegisterScreen')} />

      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={lazyLoadComponent('./screens/ProfileScreen')} />
        <Route path='/placeorder' element={lazyLoadComponent('./screens/PlaceOrderScreen')} />
        <Route path='/order/:id' element={lazyLoadComponent('./screens/OrderScreen')} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path='/admin/orderlist' element={lazyLoadComponent('./screens/admin/OrderListScreen')} />
        <Route path='/admin/productlist' element={lazyLoadComponent('./screens/admin/ProductListScreen')} />
        <Route path='/admin/product/:id/edit' element={lazyLoadComponent('./screens/admin/ProductEditScreen')} />
        <Route path='/admin/userlist' element={lazyLoadComponent('./screens/admin/UserListScreen')} />
        <Route path='/admin/user/:id/edit' element={lazyLoadComponent('./screens/admin/UserEditScreen')} />
      </Route>
    </Route>
  )
);

const rootElement = document.getElementById('root');

if (!rootElement) {
  document.body.innerHTML = '<div style="color:red;padding:20px">Root element missing</div>';
} else {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary fallback={<div style={{ color: 'red', padding: '20px' }}>App error</div>}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

reportWebVitals();
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AboutScreen from './screens/AboutScreen';
import OrdersScreen from './screens/admin/OrdersScreen';
import NewOrderScreen from './screens/admin/NewOrderScreen';
import UserScreen from './screens/admin/UserScreen';
import ProductsAddScreen from './screens/admin/ProductsAddScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen'; 
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/about' element={<AboutScreen />} />
      <Route path='/myorders' element={<OrderListScreen />}/>
      <Route path='/forgotpassword' element={<ForgotPasswordScreen />}/>
      <Route path='/order-success' element={<OrderSuccessScreen />}/>

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/change-password' element={<ChangePasswordScreen />} /> {/* New route */}
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
      </Route>

      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/orders' element={<OrdersScreen />} />
        <Route path='/admin/neworders' element={<NewOrderScreen />} />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/users' element={<UserScreen />} />
        <Route path='/admin/products' element={<ProductListScreen />} />
        <Route path='/admin/products/new' element={<ProductsAddScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
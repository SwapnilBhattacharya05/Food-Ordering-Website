import './App.css';
import { Route, Routes } from "react-router-dom"
import "./components/Admin/Global/AdminScrollbar.css"
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import LoadingBar from 'react-top-loading-bar'
import About from './components/About/About';
import Profile from './components/Profile/Profile';
import Signup from './components/Signup/Signup';
import Faq from './components/Help/Faq';
import Contact from './components/Contact/Contact'

import AdminLogin from './components/Admin/Login/AdminLogin';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import AdminUsers from './components/Admin/Users/AdminUsers';
import AdminOrders from './components/Admin/Main/AdminOrders';
import AdminCoupon from './components/Admin/Main/AdminCoupons';
import AdminMenu from './components/Admin/Main/AdminMenu';
import AdminRestaurant from './components/Admin/Main/AdminRestaurants';
import AdminContact from './components/Admin/Main/AdminContact.jsx';

import RestaurantRegistration from './components/Restaurant/RestaurantRegistration';
import RestaurantDashboard from './components/Restaurant/RestaurantDashboard';
import RestaurantExtras from './components/Restaurant/Options/RestaurantExtras';
import RestaurantPage from './components/Restaurant/RestaurantPage';
import RestaurantLogin from './components/Restaurant/RestaurantLogin';
import RestaurantOrders from './components/Restaurant/Options/RestaurantOrders';
import RestaurantMenu from './components/Restaurant/Options/RestaurantMenu.jsx';

import { useAppContext } from './Context/AppContext';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Success from './components/Payment/Success';
import Cancel from './components/Payment/Cancel';
import TrackOrder from './components/TrackOrder/TrackOrder';


function App() {

  const { loadingProgress } = useAppContext();
  return (
    <div className="App">

      {/* TOAST */}
      <ToastContainer />


      {/* LOADING BAR */}
      <LoadingBar height={6} color={'black'} progress={loadingProgress} />

      {/* ROUTES */}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/help' element={<Faq />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/track-order/:orderId' element={<TrackOrder />} />

        {/* RESTAURANT PATHS */}
        <Route path='/restaurant-login' element={<RestaurantLogin />} />
        <Route path='/partner-with-us' element={<RestaurantRegistration />} />
        <Route path='/restaurant-dashboard' element={<RestaurantDashboard />} />
        <Route path='/RestaurantAddMenu' element={<RestaurantExtras />} />
        <Route path='/restaurant/:restaurantId' element={<RestaurantPage />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='/cancel' element={<Cancel />}></Route>
        <Route path='/track-order/:orderId' element={<TrackOrder />}></Route>
        <Route path='/RestaurantOrders' element={<RestaurantOrders />}></Route>
        <Route path='/RestaurantMenu' element={<RestaurantMenu />}></Route>

        {/* LOGIN SIGNUP PATHS */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* ADMIN PATHS */}
        <Route path='/AdminLogin' element={<AdminLogin />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/AdminUsers' element={<AdminUsers />} />
        <Route path='/AdminOrders' element={<AdminOrders />} />
        <Route path='/AdminCoupons' element={<AdminCoupon />} />
        <Route path='/AdminMenu' element={<AdminMenu />} />
        <Route path='/AdminRestaurants' element={<AdminRestaurant />} />
        <Route path='/AdminContact' element={<AdminContact />} />
      </Routes>
    </div>
  );
}

export default App;
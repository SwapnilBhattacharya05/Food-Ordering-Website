import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import LoadingBar from 'react-top-loading-bar'
import { useAppContext } from './Context/AppContext';
import { ToastContainer } from 'react-toastify';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load all route components
const Home = lazy(() => import('./components/Home/Home'));
const Search = lazy(() => import('./components/Search/Search'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Login = lazy(() => import('./components/Login/Login'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const Profile = lazy(() => import('./components/Profile/Profile'));
const Faq = lazy(() => import('./components/Help/Faq'));
const About = lazy(() => import('./components/About/About'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Success = lazy(() => import('./components/Payment/Success'));
const Cancel = lazy(() => import('./components/Payment/Cancel'));
const TrackOrder = lazy(() => import('./components/TrackOrder/TrackOrder'));
const RestaurantLogin = lazy(() => import('./components/Restaurant/RestaurantLogin'));
const RestaurantRegistration = lazy(() => import('./components/Restaurant/RestaurantRegistration'));
const RestaurantDashboard = lazy(() => import('./components/Restaurant/RestaurantDashboard'));
const RestaurantExtras = lazy(() => import('./components/Restaurant/Options/RestaurantExtras'));
const RestaurantPage = lazy(() => import('./components/Restaurant/RestaurantPage'));
const RestaurantOrders = lazy(() => import('./components/Restaurant/Options/RestaurantOrders'));
const AdminLogin = lazy(() => import('./components/Admin/Login/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/Admin/Dashboard/AdminDashboard'));
const AdminUsers = lazy(() => import('./components/Admin/Users/AdminUsers'));
const AdminOrders = lazy(() => import('./components/Admin/Main/AdminOrders'));
const AdminCoupon = lazy(() => import('./components/Admin/Main/AdminCoupons'));
const AdminMenu = lazy(() => import('./components/Admin/Main/AdminMenu'));
const AdminRestaurant = lazy(() => import('./components/Admin/Main/AdminRestaurants'));

function App() {

  const { loadingProgress } = useAppContext();

  return (
    <>
      <ToastContainer />
      <LoadingBar height={6} color={'black'} progress={loadingProgress} />
      <Suspense fallback={<LoadingSpinner fullScreen={true} size="large" message="Loading page..." />}>
        <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/help' element={<Faq />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='/cancel' element={<Cancel />}></Route>
        <Route path='/track-order/:orderId' element={<TrackOrder />}></Route>

        <Route path='/restaurant-login' element={<RestaurantLogin />} />
        <Route path='/partner-with-us' element={<RestaurantRegistration />} />
        <Route path='/restaurant-dashboard' element={<RestaurantDashboard />} />
        <Route path='/RestaurantAddMenu' element={<RestaurantExtras />} />
        <Route path='/restaurant/:restaurantId' element={<RestaurantPage />}></Route>
        <Route path='/RestaurantOrders' element={<RestaurantOrders />}></Route>

        <Route path='/Adminlogin' element={<AdminLogin />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/AdminUsers' element={<AdminUsers />} />
        <Route path='/AdminOrders' element={<AdminOrders />} />
        <Route path='/AdminCoupons' element={<AdminCoupon />} />
        <Route path='/AdminMenu' element={<AdminMenu />} />
        <Route path='/AdminRestaurants' element={<AdminRestaurant />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;

import './App.css';
import { Route, Routes } from "react-router-dom"
import "./components/Admin/Global/AdminScrollbar.css"
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import LoadingBar from 'react-top-loading-bar'
import { useAppContext } from './Context/AppContext';
import Signup from './components/Signup/Signup';
import Faq from './components/Help/faq';

import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import AdminUsers from './components/Admin/Users/AdminUsers';
import AdminOrders from './components/Admin/Main/AdminOrders';
import AdminCoupon from './components/Admin/Main/AdminCoupons';
import AdminMenu from './components/Admin/Main/AdminMenu';
import AdminExtras from './components/Admin/Main/AdminExtra';
import AdminRestaurant from './components/Admin/Main/AdminRestaurants';
import AdminFinance from './components/Admin/Graph/AdminFinance';
import { ToastContainer } from "react-toastify";

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
        <Route path='/search' element={<Search />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/help' element={<Faq />}></Route>

        {/* LOGIN SIGNUP PATHS */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>

        {/* ADMIN PATHS */}
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/AdminUsers' element={<AdminUsers />} />
        <Route path='/AdminOrders' element={<AdminOrders />} />
        <Route path='/AdminCoupons' element={<AdminCoupon />} />
        <Route path='/AdminMenu' element={<AdminMenu />} />
        <Route path='/AdminAddMenu' element={<AdminExtras />} />
        <Route path='/AdminRestaurants' element={<AdminRestaurant />} />
        <Route path='/AdminFinance' element={<AdminFinance />} />
      </Routes>
    </div>
  );
}

export default App;

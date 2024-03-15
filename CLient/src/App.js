import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./components/Admin/Global/AdminScrollbar.css"
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Help from './components/Help/Help';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import LoadingBar from 'react-top-loading-bar'
import { useAppContext } from './Context/AppContext';
import Signup from './components/Signup/Signup';

import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import AdminUsers from './components/Admin/Users/AdminUsers';
import AdminOrders from './components/Admin/Main/AdminOrders';
import AdminCoupon from './components/Admin/Main/AdminCoupons';
import AdminMenu from './components/Admin/Main/AdminMenu';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/search' element={<Search />}></Route>
        <Route path='/help' element={<Help />}></Route>
        <Route path='/cart' element={<Cart />}></Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>

        {/* ADMIN IMPORTS */}
        <Route exact path='/AdminDashboard' element={<AdminDashboard />} />
        <Route exact path='/AdminUsers' element={<AdminUsers />} />
        <Route exact path='/AdminOrders' element={<AdminOrders />} />
        <Route exact path='/AdminCoupons' element={<AdminCoupon />} />
        <Route exact path='/AdminMenu' element={<AdminMenu />} />
        <Route exact path='/AdminMenu' element={<AdminMenu />} />
      </Routes>
    </div>
  );
}

export default App;

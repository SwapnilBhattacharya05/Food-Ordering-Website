import './App.css';
import './components/Admin/Global/AdminScrollbar.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import RestaurantDashboard from './components/Admin/Dashboard/RestaurantDashboard'
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Help from './components/Help/Help';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import LoadingBar from 'react-top-loading-bar'
import { useAppContext } from './Context/AppContext';
import Signup from './components/Signup/Signup';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/AdminDashboard' element={<AdminDashboard />} />
        <Route exact path='/RestaurantDashboard' element={<RestaurantDashboard />} />
        <Route path='/search' element={<Search />}></Route>
        <Route path='/help' element={<Help />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;

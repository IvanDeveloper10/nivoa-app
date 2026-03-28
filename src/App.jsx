import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'; 
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UserProfile from './pages/UserProfile.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/shop' element={ <Shop /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/profile' element={ <UserProfile /> } />
      </Routes>
    </BrowserRouter>
  );
}
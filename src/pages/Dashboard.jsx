import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Orders from '../components/Orders.jsx';
import AddProducts from '../components/AddProducts.jsx';
import Products from '../components/Products.jsx';
import { auth } from '../utils/firebase.js';
import { db } from '../utils/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot} from 'firebase/firestore';


export default function Dashboard() {

  const [view, setView] = useState('dashboard');
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser && currentUser.email === 'ivandeveloper99@gmail.com') {
        console.log('Welcome Admin');
      } else {
        navigate('/');
      }
    });

    return () => adminAuth();
  }, []);

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setProductsCount(snapshot.size);
    });

    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      setOrdersCount(snapshot.size);
    });

    const unsubUsers = onSnapshot(collection(db, 'user_orders'), (snapshot) => {
      const uniqueUsers = new Set();

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.userId) {
          uniqueUsers.add(data.userId);
        }
      });
      setUsersCount(uniqueUsers.size);
    });

    return () => {
      unsubProducts();
      unsubOrders();
      unsubUsers();
    };
  }, []);

  const handleBackButton = () => {
    navigate('/')
  }

  return (
    <Fragment>
      <section className='w-full h-screen flex justify-between bg-zinc-950 text-fu'>
        <nav className='text-white pl-5 py-10'>
          <button className='w-full pl-4 flex items-center gap-2 hover:cursor-pointer hover:bg-zinc-100 hover:text-black hover:scale-95 py-2 rounded-lg transition-all' onClick={handleBackButton}>
            <i className='fi fi-rr-arrow-left flex justify-center items-center'></i> Back
          </button>
          <ul className='flex flex-col gap-2 mt-20'>
            <li onClick={() => setView('dashboard')} className='w-44 py-2 px-4 rounded-lg flex justify-start items-center gap-2 hover:bg-zinc-800 hover:cursor-pointer focus:bg-white'><i className='fi fi-rr-dashboard-panel flex justify-center items-center'></i>Dashboard</li>
            <li onClick={() => setView('orders')} className='w-44 py-2 px-4 rounded-lg flex justify-start items-center gap-2 hover:bg-zinc-800 hover:cursor-pointer'><i className='fi fi-rr-shipping-fast flex justify-center items-center'></i>Orders</li>
            <li onClick={() => setView('reports')} className='w-44 py-2 px-4 rounded-lg flex justify-start items-center gap-2 hover:bg-zinc-800 hover:cursor-pointer'><i className='fi fi-rr-big-data-analytics flex justify-center items-center'></i>Reports</li>
            <li onClick={() => setView('add-products')} className='w-44 py-2 px-4 rounded-lg flex justify-start items-center gap-2 hover:bg-zinc-800 hover:cursor-pointer'><i className='fi fi-rr-apps-add flex justify-center items-center'></i>Add Products</li>
            <li onClick={() => setView('products')} className='w-44 py-2 px-4 rounded-lg flex justify-start items-center gap-2 hover:bg-zinc-800 hover:cursor-pointer'><i className='fi fi-rr-box-open-full flex justify-center items-center'></i>Products</li>
            <hr className='text-purple-600 border-2 rounded-full' />
            <li className='w-44 py-2 px-4 rounded-lg flex justify-start items-center gap-2 hover:bg-zinc-800 hover:cursor-pointer'><i className='fi fi-rr-settings flex justify-center items-center'></i>Settings</li>
          </ul>
        </nav>

        <div className='bg-white w-7xl m-5 rounded-3xl flex justify-between'>
          {view === 'dashboard' && (
            <section className='p-10 w-full flex justify-around'>
              <div className='bg-zinc-800 text-white p-5 w-56 h-56 flex flex-col gap-5 justify-center items-center rounded-3xl shadow-2xl hover:scale-95 hover:cursor-pointer transition-all'>
                <main className='flex justify-center items-center gap-2'>
                  <i className='fi fi-rr-circle-user flex justify-center items-center text-2xl'></i> USERS
                </main>
                <h1 className='text-5xl'>{usersCount}</h1>
              </div>
              <div className='bg-zinc-800 text-white p-5 w-56 h-56 flex flex-col gap-5 justify-center items-center rounded-3xl shadow-2xl hover:scale-95 hover:cursor-pointer transition-all'>
                <main className='flex justify-center items-center gap-2'>
                  <i className='fi fi-rr-boxes flex justify-center items-center text-2xl'></i> PRODUCTS
                </main>
                <h1 className='text-5xl'>{productsCount}</h1>
              </div>
              <div className='bg-zinc-800 text-white p-5 w-56 h-56 flex flex-col gap-5 justify-center items-center rounded-3xl shadow-2xl hover:scale-95 hover:cursor-pointer transition-all'>
                <main className='flex justify-center items-center gap-2'>
                  <i className='fi fi-rr-truck-box flex justify-center items-center text-2xl'></i> ORDERS
                </main>
                <h1 className='text-5xl'>{ordersCount}</h1>
              </div>
            </section>
          )}
          {view === 'orders' && <Orders />}
          {view === 'add-products' && <AddProducts />}
          {view === 'products' && <Products />} 
        </div>

      </section>
    </Fragment>
  );
}
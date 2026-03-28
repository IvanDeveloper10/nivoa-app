import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Fragment, useEffect, useState } from 'react';
import { auth } from '../utils/firebase.js';
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [user, setUser] = useState(null);
  const [userAdmin, setUserAdmin] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if(currentUser && currentUser.email === 'ivandeveloper99@gmail.com') {
        setUserAdmin(true);
      } else {
        setUserAdmin(false);
      }

      setLoading(false);
    })

    return () => unsubscribe()
  }, [])

  if (loading) return null

  return (
    <Fragment>
      <header className='w-full sticky top-0 py-5 flex justify-around text-fu bg-zinc-900 text-white max-sm:hidden border-b-2 border-purple-600 z-50'>
        <div>
          LOGO
        </div>
        <nav className='flex gap-10'>
          <Link to={'/'} className='flex justify-center items-center gap-1'><i className='fi fi-rr-home flex justify-center items-center'></i>Home</Link>
          <label className='flex border-2 border-zinc-700 px-2 gap-1 rounded-full max-lg:hidden'><i className='fi fi-rr-search flex justify-center items-center'></i><input type='text' className='outline-none focus:outline-none focus:ring-0' /></label>
          <Link to={'/shop'} className='flex justify-center items-center gap-1'><i className='fi fi-rr-shopping-bag flex justify-center items-center'></i>Shop</Link>
          <Link to={'/'} className='flex justify-center items-center gap-1'><i className='fi fi-rr-headset flex justify-center items-center'></i>Contact</Link>
          {userAdmin && (
            <Link to={'/dashboard'} className='flex justify-center items-center gap-1'><i class='fi fi-rr-dashboard-panel flex justify-center items-center'></i>Dashboard</Link>
          )}
        </nav>
        {!user && (
          <span className='flex justify-center items-center gap-5 max-md:hidden'>
            <Link to={'/register'}>
              <button className='bg-zinc-700 text-white text-fu px-8 py-1 rounded-lg hover:scale-90 hover:cursor-pointer transition-all'>register</button>
            </Link>
            <Link to={'/login'}>
              <button className='bg-purple-600 text-white text-fu px-8 py-1 rounded-lg hover:scale-90 hover:cursor-pointer transition-all'>login</button>
            </Link>
          </span>
        )}

        {user && (
          <span className='flex justify-center items-center gap-5'>
            <Link to={'/profile'}>
              <i className='fi fi-rr-circle-user text-2xl flex justify-center items-center hover:cursor-pointer hover:scale-90 transition-all'></i>
            </Link>
            <i className='fi fi-rr-shopping-bag text-2xl flex justify-center items-center hover:cursor-pointer hover:scale-90 transition-all'></i>
          </span>
        )}
      </header>
    </Fragment>
  );
}
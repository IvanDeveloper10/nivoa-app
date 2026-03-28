import { Fragment, use } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if(!user) {
      navigate('/')
    } else {

    }
  });

  const handleSignOut = () => {
    signOut(auth).then(() => {
      alert('Cierre de sesion con exito');
    })
    .catch((err) => {
      alert(err);
    })
  }

  return (
    <Fragment>
      <Navbar />
      <section className='flex max-md:items-center max-md:justify-center text-fu py-10 max-md:flex-col'>
        <div className='flex flex-col justify-center items-center w-2/4 gap-2'>
          <img src='/image-user-profile.jpg' alt='Image User Profile' className='w-80 rounded-full' />
          <h1>IVAN DAVID PEREZ OSPINO</h1>
          <p>he/him</p>
          <div className='flex justify-center items-center gap-2'>
            <button className='bg-pink-200 text-black text-fu px-4 rounded-lg hover:scale-90 hover:cursor-pointer transition-all py-2 flex gap-2' onClick={handleSignOut}><i class='fi fi-rr-exit flex justify-center items-center'></i>sign out</button>
            <button className='bg-blue-200 text-black text-fu px-4 rounded-lg hover:scale-90 hover:cursor-pointer transition-all py-2 flex gap-2'><i className='fi fi-rr-edit flex justify-center items-center'></i>edit</button>
          </div>
        </div>
        <div className='w-2/4'>
          <h1 className='font-bold text-2xl'>Your Orders</h1>
        </div>
      </section>
    </Fragment>
  );
}
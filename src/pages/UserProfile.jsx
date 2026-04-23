import { Fragment, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editFirstname, setEditFirstname] = useState('');
  const [editLastname, setEditLastname] = useState('');
  const [editPhone, setEditPhone] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/');
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }

        const q = query(
          collection(db, 'user_orders'),
          where('userId', '==', user.uid)
        );

        const unsubscribeOrders = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(data);
        });

        return () => unsubscribeOrders();

      } catch (error) {
        alert(error);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        alert('Cierre de sesion con exito');
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        firstname: editFirstname,
        lastname: editLastname,
        phonenumber: editPhone
      });

      setUserData({
        ...userData,
        firstname: editFirstname,
        lastname: editLastname,
        phonenumber: editPhone
      });

      setEditMode(false);

    } catch (error) {
      alert(error);
    }
  };

  return (
    <Fragment>
      <Navbar />

      <section className='flex max-md:items-center max-md:justify-center text-fu py-10 max-md:flex-col h-screen'>
        
        <div className='flex flex-col justify-center items-center w-2/4 gap-2'>
          <img src='/user-profile.png' alt='Image  User Profile' className='w-80 rounded-full' />

          <h1>
            {userData 
              ? `${userData.firstname} ${userData.lastname}`.toUpperCase() 
              : 'Loading...'}
          </h1>

          <p>+57 {userData ? userData.phonenumber : '...'}</p>

          <div className='flex justify-center items-center gap-2'>
            <button 
              className='bg-pink-200 text-black px-4 rounded-lg hover:scale-90 hover:cursor-pointer transition-all py-2 flex gap-2' 
              onClick={handleSignOut}
            >
              <i className='fi fi-rr-exit flex justify-center items-center'></i>
              sign out
            </button>

            <button 
              onClick={() => {
                setEditMode(true);
                setEditFirstname(userData.firstname);
                setEditLastname(userData.lastname);
                setEditPhone(userData.phonenumber);
              }}
              className='bg-blue-200 text-black px-4 rounded-lg hover:scale-90 hover:cursor-pointer transition-all py-2 flex gap-2'
            >
              <i className='fi fi-rr-edit flex justify-center items-center'></i>
              edit
            </button>
          </div>
        </div>

        <div className='w-2/4 px-10'>
          <h1 className='font-bold text-2xl'>Your Orders</h1>

          {orders.length === 0 ? (
            <p className='text-gray-400'>You haven't orders yet</p>
          ) : (
            <div className='flex flex-col gap-4 max-h-[500] overflow-y-auto no-scrollbar'>
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className='bg-zinc-800 w-full p-4 rounded-xl shadow-lg flex flex-col gap-2 hover:scale-90 hover:cursor-pointer transition-all'
                >
                  <div className='flex justify-between items-center'>
                    <span className='text-sm text-gray-400'>
                      ORDER #{order.id.slice(0, 6)}
                    </span>

                    <span className='bg-purple-600 text-md px-3 py-1 rounded-full text-white'>
                      {order.status || 'pending'}
                    </span>
                  </div>

                  <h2 className='text-lg font-bold text-purple-300'>
                    Total: ${order.total}
                  </h2>

                  <span className='text-xs text-gray-400'>
                    {order.createdAt?.seconds
                      ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                      : new Date(order.createdAt).toLocaleDateString()
                    }
                  </span>

                  <div className='flex flex-col gap-1 mt-2 text-white'>
                    <h2 className='text-sm text-gray-400'>ITEMS:</h2>

                    <div className='w-full flex gap-2 overflow-scroll no-scrollbar whitespace-nowrap'>
                      {order.items?.map((item, index) => (
                        <div key={index} className='shrink-0'>
                          <img 
                            src={item.images?.[0]} 
                            alt='Item' 
                            className='w-20 rounded-xl' 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {editMode && (
        <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50 text-fu'>
          <div className='bg-white text-black p-6 rounded-2xl w-96 flex flex-col gap-4'>

            <h2 className='text-xl font-bold'>Edit Profile</h2>
            <input 
              type='text' 
              value={editFirstname}
              onChange={(e) => setEditFirstname(e.target.value)}
              className='bg-zinc-100 p-2 rounded-lg'
              placeholder='First Name'
            />
            <input 
              type='text' 
              value={editLastname}
              onChange={(e) => setEditLastname(e.target.value)}
              className='bg-zinc-100 p-2 rounded-lg'
              placeholder='Last Name'
            />
            <input 
              type='tel' 
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              className='bg-zinc-100 p-2 rounded-lg'
              placeholder='Phone'
            />
            <div className='flex justify-end gap-2'>
              <button 
                onClick={() => setEditMode(false)} 
                className='bg-gray-300 px-4 py-2 rounded-lg hover:scale-95 hover:cursor-pointer transition-all'>Cancel</button>

              <button 
                onClick={handleUpdateProfile} 
                className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:scale-95 hover:cursor-pointer transition-all'>Save</button>
            </div>

          </div>
        </div>
      )}

    </Fragment>
  );
}
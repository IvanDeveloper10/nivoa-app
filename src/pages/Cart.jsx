import { Fragment, useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    const q = query(
      collection(db, 'carts'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setCartItems(data);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'carts', id));
    } catch (error) {
      alert(error);
    }
  }

  const total = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity);
  }, 0);

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('The cart is vacio');
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        items: cartItems.map(item => ({
          productId: item.productId,
          title: item.title,
          price: item.price,
          image: item.image
        })),
        total: total,
        createdAt: new Date(),
        status: 'pending'
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);
      await addDoc(collection(db, 'user_orders'), {
        ...orderData,
        orderId: orderRef.id
      });

      const deletePromises = cartItems.map(item => 
        deleteDoc(doc(db, 'carts', item.id))
      );

      await Promise.all(deletePromises);
      alert('Orden realizada con exito');
    } catch (error) {
      alert(error);
    }

  }

  return (
    <Fragment>
      <Navbar />
      <section className='flex justify-between min-h-screen bg-zinc-900 text-white p-10 text-fu'>
        <main>
          <h1 className='text-3xl font-bold mb-8'>Your cart</h1>

        {cartItems.length === 0 ? (
          <p className='text-gray-400'>You don't have nothing in the cart</p>
        ) : (
          <div className='flex flex-col gap-6'>
            {cartItems.map(item => (
              <div key={item.id} className='flex justify-between items-center bg-zinc-800 p-5 rounded-xl w-xl'>
                <div className='flex gap-5 items-center'>
                  <img src={item.image} alt='Product' className='w-20 h-20 object-cover rounded-lg' />
                  <div>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <p className='text-gray-400'>${item.price}</p>
                    {/* <span className='text-xm'>Quantity: {item.quantity}</span> */}
                  </div>
                </div>
                <button onClick={() => handleDelete(item.id)} className='bg-rose-200 text-black px-4 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all'><i className='fi fi-rr-trash flex justify-center items-center'></i></button>
              </div>
            ))}
          </div>
        )}
        </main>
        <div className='flex flex-col gap-4'>
          <h2>Order Summary</h2>
          <h2>Total: ${total}</h2>
          <button onClick={handlePlaceOrder} className='py-2 w-96 rounded-xl bg-pink-600 hover:cursor-pointer hover:scale-90 transition-all'>Place Order</button>
        </div>
      </section>
    </Fragment>
  );
}
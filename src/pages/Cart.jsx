import { Fragment, useEffect, useState } from 'react';
import { db, auth } from '../utils/firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
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
        quantity: doc.data().quantity || 1,
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

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateDoc(doc(db, 'carts', id), {
        quantity: newQuantity
      });
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
          images: item.images,
          shortDescription: item.shortDescription,
          largeDescription: item.largeDescription,
          quantity: item.quantity,
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
      <section className='flex flex-col lg:flex-row gap-10 min-h-screen bg-zinc-900 text-white p-10 text-fu'>
        <main className='flex-1'>
          <h1 className='text-3xl font-bold mb-8'>Your cart</h1>

        {cartItems.length === 0 ? (
          <p className='text-gray-400'>You don't have nothing in the cart</p>
        ) : (
          <div className='flex flex-col gap-6'>
            {cartItems.map(item => (
              <div key={item.id} onClick={() => {
                  setSelectedProduct(item);
                  setCurrentImage(0);
                }} className='flex justify-between bg-zinc-800 p-5 rounded-3xl shadow-lg hover:scale-[0.98] transition-all w-96 hover:cursor-pointer'>
                <div className='flex gap-5 cursor-pointer'>
                  <img src={item.images?.[0]} alt='Product' className='w-24 h-24 object-cover rounded-xl' />
                  <div>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <p className='text-gray-400'>{item.price.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP'
                    })}</p>
                    <div className='flex items-center gap-2 mt-2'>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity - 1);
                      }} className='bg-zinc-700 px-2 rounded hover:cursor-pointer hover:scale-95 transition-all'>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity + 1);
                      }} className='bg-zinc-700 px-2 rounded hover:cursor-pointer hover:scale-95 transition-all'>+</button>
                    </div>
                  </div>
                </div>
                <div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }} className='bg-pink-600 text-white px-2 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all'><i className='fi fi-rr-trash flex justify-center items-center'></i></button>
                </div>
              </div>
            ))}
          </div>
        )}
        </main>
        <aside className='w-full lg:w-96 bg-zinc-800 p-6 rounded-2xl shadow-xl h-fit'>
          <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
          <div className='flex justify-between mb-2'>
            <span>Subtotal</span>
            <span>
              {total.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP'
              })}
            </span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Shipping</span>
            <span className='text-green-400'>Free</span>
          </div>
          <hr className='my-4 border-zinc-600' />
          <div className='flex justify-between text-lg font-bold'>
            <span>Total</span>
            <span className='text-purple-400'>
              {total.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP'
              })}
            </span>
          </div>
          <button onClick={handlePlaceOrder} className='mt-6 w-full bg-purple-600 py-3 rounded-xl font-bold hover:cursor-pointer hover:scale-95 transition-all'>Place Order</button>
        </aside>
      </section>
      {selectedProduct && (
        <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 text-fu' onClick={() => setSelectedProduct(null)}>
          <div className='bg-white text-black w-[800] max-w-[95%] h-[80%] rounded-2xl p-6 relative flex gap-6' onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className='absolute top-4 right-4 text-xl hover:text-red-600 hover:cursor-pointer hover:scale-95 transition-all'><i className='fi fi-rr-cross flex justify-center items-center'></i></button>
            <div className='w-1/2 flex flex-col items-center'>
              <img src={selectedProduct.images?.[currentImage] || selectedProduct.image} className='w-full h-80 object-cover rounded-xl' />
              {selectedProduct.images?.length > 1 && (
                <div className='flex justify-between w-full mt-3'>
                  <button onClick={() => setCurrentImage(prev => 
                    prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                  )} className='bg-zinc-800 text-white px-3 py-2 rounded-lg flex justify-center items-center hover:scale-95 hover:cursor-pointer transition-all'><i className='fi fi-rr-angle-left flex justify-center items-center'></i></button>
                  <button onClick={() => setCurrentImage(prev => 
                    prev === selectedProduct.images.length - 1 ? 0 : prev + 1
                  )} className='bg-zinc-800 text-white px-3 py-2 rounded-lg flex justify-center items-center hover:scale-95 hover:cursor-pointer transition-all'><i className='fi fi-rr-angle-right flex justify-center items-center'></i></button>
                </div>
              )}
              {selectedProduct.images?.length > 1 && (
                <div className='flex gap-2 mt-3'>
                  {selectedProduct.images.map((img, index) => (
                    <img key={index} src={img} onClick={() => setCurrentImage(index)} className={`w-14 h-14 rounded-lg cursor-pointer ${
                      currentImage === index ? 'border-2 border-purple-600' : ''
                    }`} />
                  ))}
                </div>
              )}
            </div>
            <div className='w-1/2 flex flex-col gap-4 overflow-scroll no-scrollbar px-4 py-4'>
              <h1 className='text-2xl font-bold'>{selectedProduct.title}</h1>
              <p className='text-gray-600'>{selectedProduct.shortDescription || 'No description avaible'}</p>
              <span className='text-2xl font-bold text-purple-600'>
                {selectedProduct.price.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                })}
              </span>
              <p className='text-gray-600 whitespace-pre-line'>{selectedProduct.largeDescription || 'No description avaible'}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
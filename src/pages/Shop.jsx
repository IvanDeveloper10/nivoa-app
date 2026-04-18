import { Fragment, useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { auth } from '../utils/firebase';
import { collection, onSnapshot, doc, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Shop() {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);
  
  const handleAddCart = async (product) => {
    const user = auth.currentUser;

    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await addDoc(collection(db, 'carts'), {
        userId: user.uid,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.images ? product.images[0]: '', 
        quantity: 1,
        createdAt: new Date()
      });

      alert('producto agregado al carrito');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Fragment>
      <Navbar />
      <section className='h-screen w-full text-fu flex bg-zinc-800'>
        <div className='text-white w-xs py-10 pl-5 flex flex-col gap-2'>
          <h1 className='font-bold'>Category</h1>
          <label className='flex items-center gap-1'><input type='checkbox' />Technology</label>
          <label className='flex items-center gap-1'><input type='checkbox' />Home</label>
          <hr className='text-purple-600 border-2 rounded-full' />
        </div>
        <div className='flex flex-wrap w-full h-3/4 bg-white rounded-xl m-10 gap-10 p-10 overflow-scroll no-scrollbar'>
          {products.map(product => (
            <div key={product.id} onClick={() => {
              setSelectedProduct(product);
              setCurrentImage(0);
            }} 
            className='flex flex-col bg-zinc-200 w-72 h-96 p-5 rounded-xl shadow-2xl gap-2 hover:cursor-pointer hover:scale-95 transition-all'>
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt='Product Image'
                  className='w-full h-48 object-cover rounded-lg mb-3' />
              )}
              <h2 className='font-bold'>
                {product.title}
              </h2>
              <p className='truncate w-full'>
                {product.shortDescription}
              </p>
              <div className='flex justify-between items-center'>
                <span>
                  <p className='text-gray-400 line-through text-sm'>${(product.price + 30000).toLocaleString('es-CO')}</p>
                  <h2 className='font-bold text-purple-600'>${product.price.toLocaleString('es-CO')}</h2>
                </span>
                <button onClick={() => handleAddCart(product)} className='flex justify-center gap-2 items-center bg-zinc-700 text-white px-3 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all'><i className='fi fi-rr-cart-arrow-down flex justify-center items-center'></i></button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedProduct && (
        <div className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 text-fu'>
          <div className='bg-white w-[800] max-w-[95%] h-3/4 rounded-2xl p-6 relative flex gap-6'>
            <button onClick={() => setSelectedProduct(null)} className='absolute top-4 right-4 text-black hover:text-red-500 text-xl hover:scale-95 hover:cursor-pointer transition-all'><i className='fi fi-rr-cross flex justify-center items-center'></i></button>
            <div className='w-1/2 flex flex-col items-center'>
              <img src={selectedProduct.images[currentImage]} alt='Image' className='w-full h-80 object-cover rounded-xl' />
              <div className='flex justify-between w-full mt-3'>
                <button onClick={() => setCurrentImage(prev => 
                  prev === 0 ? selectedProduct.images.length - 1 : prev - 1
                )} className='bg-zinc-800 text-white px-3 py-2 rounded-lg flex justify-center items-center hover:cursor-pointer hover:scale-95 transition-all'><i className='fi fi-rr-angle-left flex justify-center items-center'></i></button>
                <button onClick={() => setCurrentImage(prev => 
                  prev === selectedProduct.images.length -1 ? 0 : prev + 1
                )} className='bg-zinc-800 text-white px-3 py-2 rounded-lg flex justify-center items-center hover:cursor-pointer hover:scale-95 transition-all'><i className='fi fi-rr-angle-right flex justify-center items-center'></i></button>
              </div>
              <div className='flex gap-2 mt-3'>
                {selectedProduct.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`w-14 h-14 object-cover rounded-lg cursor-pointer border ${
                      currentImage === index ? 'border-purple-600' : ''
                    }`}
                    onClick={() => setCurrentImage(index)} />
                ))}
              </div>
            </div>
            <div className='w-1/2 flex flex-col gap-4 px-5 overflow-scroll no-scrollbar'>
              <h1 className='text-3xl font-bold'>{selectedProduct.title}</h1>
              <p className='text-gray-600'>{selectedProduct.shortDescription || 'No description short avaible'}</p>
              <span className='text-2xl font-bold text-purple-600'>{selectedProduct.price.toLocaleString('es-CO', {
                style: 'currency',
                currency: 'COP'
              })}</span>
              <span className='flex justify-between items-center my-5'>                
                <button onClick={() => handleAddCart(selectedProduct)} className='bg-black text-white py-3 px-4 rounded-xl hover:scale-95 transition-all hover:cursor-pointer flex justify-center items-center gap-1'><i className='fi fi-rr-shopping-cart flex justify-center items-center'></i>Add To Cart</button>
                <Link to={'/cart'}>
                  <button onClick={() => handleAddCart(selectedProduct)} className='bg-zinc-800 text-white py-3 px-4 rounded-xl hover:scale-95 transition-all hover:cursor-pointer flex justify-center items-center gap-1'>Buy Now <i className='fi fi-rr-arrow-right flex justify-center items-center'></i></button>
                </Link>
              </span>
              <p className='text-black'>{selectedProduct.largeDescription || 'No description large avaible'}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
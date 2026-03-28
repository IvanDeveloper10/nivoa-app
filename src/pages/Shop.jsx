import { Fragment, useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

export default function Shop() {

  const [products, setProducts] = useState([]);

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
        <div className='flex flex-wrap w-full h-2/3 bg-white rounded-xl m-10 gap-10 p-10 overflow-scroll no-scrollbar'>
          {products.map(product => (
            <div key={product.id} className='flex flex-col border bg-zinc-100 w-72 p-5 rounded-xl shadow-lg gap-2'>
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  onMouseOver={(e) => {
                    if (product.images[1]) e.currentTarget.src = product.images[1];
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.src = product.images[0];
                  }}
                  alt='Image'
                  className='w-full h-32 object-cover rounded-lg mb-3' />
              )}
              <h2>
                {product.title}
              </h2>
              <p>
                {product.description}
              </p>
              <span>
                {product.price}
              </span>
              <button className='flex justify-center gap-2 items-center bg-black w-full text-white p-2 rounded-xl hover:cursor-pointer hover:scale-90 transition-all'><i className='fi fi-rr-cart-arrow-down flex justify-center items-center'></i> Add To Cart</button>
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
}
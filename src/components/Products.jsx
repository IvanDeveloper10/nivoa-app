import { Fragment, useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

export default function Products() {

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

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch(err) {
      alert(err);
    }
  }

  return (
    <Fragment>
      <section className='p-10 flex flex-wrap gap-6 overflow-scroll no-scrollbar '>
        {products.map(product => (
          <div key={product.id} className='bg-zinc-100 w-72 h-96 p-5 rounded-xl shadow-lg'>
            <main className='flex justify-end items-center gap-2 mb-4'>
              <i className='fi fi-rr-pencil flex justify-center items-center bg-blue-600 p-2 rounded-lg text-xl hover:cursor-pointer hover:scale-95 transition-all text-white'></i>
              <i className='fi fi-rr-trash flex justify-center items-center bg-pink-600 p-2 rounded-lg text-xl hover:cursor-pointer hover:scale-95 transition-all  text-white' onClick={() => handleDeleteProduct(product.id)}></i>
            </main>
            {product.images && product.images.length > 0 && (
              <img 
                src={product.images[0]} 
                onMouseOver={(e) => {
                  if (product.images[1]) e.currentTarget.src = product.images[1];
                }} 
                onMouseOut={(e) => {
                  e.currentTarget.src = product.images[0]
                }}
                alt='Image' 
                className='w-full h-32 object-cover rounded-lg mb-3' />
              )}
            <h2 className='text-xl font-bold'>
              {product.title}
            </h2>
            <p>
              {product.shortDescription}
            </p>
            <span>
              ${product.price}
            </span>
          </div>
        ))}
      </section>
    </Fragment>
  );
}
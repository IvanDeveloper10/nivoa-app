import { Fragment } from 'react';

export default function ProductsMainPage() {
  return (
    <Fragment>
      <main className='my-10'>
        <h1 className='font-bold text-center text-fu'>Selection</h1>
        <h1 className='font-bold text-center text-fu text-6xl'>Catalog</h1>
        <h1 className='font-light text-center text-fu'>Explore our most sought-after and favorite products</h1>
      </main>
      <section className='h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 '>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 rounded-lg px-6 py-6 gap-3 hover:scale-95 hover:cursor-pointer transition-all'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Airpods Pro Image' className='w-full' />
          <span className='text-fu font-extrabold'>Airpods Pro</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center text-xl'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 rounded-lg px-6 py-6 gap-3 hover:scale-95 hover:cursor-pointer transition-all'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Airpods 3 Image' className='w-full' />
          <span className='text-fu font-extrabold'>Airpods 3 Premium</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 rounded-lg px-6 py-6 gap-3 hover:scale-90 hover:cursor-pointer transition-all'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Headphone Image' className='w-full' />
          <span className='text-fu font-extrabold'>Headphone</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu '><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 rounded-lg px-6 py-6 gap-3 hover:scale-90 hover:cursor-pointer transition-all'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Control PlayStation Image' className='w-full' />
          <span className='text-fu font-extrabold'>Control PlayStation 2</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 rounded-lg px-6 py-6 gap-3 hover:scale-90 hover:cursor-pointer transition-all'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Headphone M45 Image' className='w-full' />
          <span className='text-fu font-extrabold'>Headphone M45</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 rounded-lg px-6 py-6 gap-3 hover:scale-90 hover:cursor-pointer transition-all'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Airpods 3 Image' className='w-full' />
          <span className='text-fu font-extrabold'>Airpods 3 Premium</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 px-6 py-6 gap-3 hover:scale-90 hover:cursor-pointer transition-all rounded-lg'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Headphone Ambie Image' className='w-full' />
          <span className='text-fu font-extrabold'>Headphone Ambie</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
        <div className='flex flex-col justify-end items-start border-2 border-zinc-300 px-6 py-6 gap-3 hover:scale-90 hover:cursor-pointer transition-all rounded-lg'>
          <img src='https://firebasestorage.googleapis.com/v0/b/nivoa-320a4.firebasestorage.app/o/products%2F1774571090455_airpods-3.png?alt=media&token=36a3c869-2676-4d62-bf81-51e2481b10c0' alt='Mouse Keyboard Image' className='w-full' />
          <span className='text-fu font-extrabold'>Mouse + Keyboard</span>
          <span className='text-fu font-bold'>price</span>
          <button className='flex justify-center items-center gap-3 bg-black text-white w-full py-2 hover:scale-90 hover:cursor-pointer transition-all rounded-lg text-fu'><i className='fi fi-rr-shopping-cart-add flex justify-center items-center'></i>ADD TO CART</button>
        </div>
      </section>
      <div className='flex justify-center items-center'>
        <button className='bg-gray-200 text-fu px-10 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all flex justify-center items-center gap-3'>View All Products <i class='fi fi-rr-arrow-right flex justify-center items-center'></i></button>
      </div>
    </Fragment>
  );
}
import { Fragment } from 'react';

export default function Cards() {
  return (
    <Fragment>
      <section className='w-full h-full flex flex-col bg-zinc-800 text-white py-10 px-2'>

        <main className='my-10'>
          <h1 className='font-bold text-center text-fu'>Trust</h1>
          <h1 className='font-bold text-center text-fu text-6xl'>What defines us</h1>
          <h1 className='font-light text-center text-fu'>Prompt delivery to your door</h1>
        </main>

        <div className='flex justify-around flex-wrap gap-10'>
          <div className='flex flex-col rounded-lg border-2 border-zinc-700 w-96'>
            <main className='flex flex-col gap-2 p-5'>
              <h1 className='font-bold text-fu text-xl'>Secure Payments</h1>
              <p className='text-fu text-sm font-light'>The main payment methods are Nequi and Cash.</p>
            </main>
            <div className='h-full flex justify-end items-end'>
              <img src='/image-payment.jpg' alt='Image Payment' className='w-full rounded-b-lg' />
            </div>
          </div>

          <div className='flex flex-col rounded-lg border-2 border-zinc-700 w-96'>
            <main className='flex flex-col gap-2 p-5'>
              <h1 className='font-bold text-fu text-xl'>Secure Shipping</h1>
              <p className='text-fu text-sm font-light'>Shipments are made with certified and secure carriers.</p>
            </main>
            <div className='h-full flex justify-end items-end'>
              <img src='/image-shipping.jpg' alt='Image Shipping' className='w-full rounded-b-lg' />
            </div>
          </div>

          <div className='flex flex-col rounded-lg border-2 border-zinc-700 w-96'>
            <main className='flex flex-col gap-2 p-5'>
              <h1 className='font-bold text-fu text-xl'>Excellent Products</h1>
              <p className='text-fu text-sm font-light'>We have a catalog of products ready to ship for free.</p>
            </main>
            <div className='h-full flex justify-end items-end'>
              <img src='/image-product.jpg' alt='Image Product' className='w-full rounded-b-lg' />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
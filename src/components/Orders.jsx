import { Fragment } from 'react';

export default function Orders() {
  return (
    <Fragment>
      <div className='pl-20 pt-20'>
        <main>
          <h2 className='text-2xl font-extrabold my-5'>Orders</h2>
        </main>
        <div className='flex gap-20'>
          <div className='flex flex-col gap-10'>
            <h1 className='font-bold'>order</h1>
            <span>#08120</span>
            <span>#08120</span>
            <span>#08120</span>
            <span>#08120</span>
            <span>#08120</span>
            <span>#08120</span>
          </div>
          <div className='flex flex-col gap-10'>
            <h1 className='font-bold'>customer</h1>
            <span>Ivan Perez</span>
            <span>Lidia Ospino</span>
            <span>Dayana Ospino</span>
            <span>Ivan Perez</span>
            <span>Lidia Ospino</span>
            <span>Dayana Ospino</span>
          </div>
          <div className='flex flex-col gap-10'>
            <h1 className='font-bold'>status</h1>
            <span>completed</span>
            <span>delivered</span>
            <span>paid</span>
            <span>completed</span>
            <span>delivered</span>
            <span>paid</span>
          </div>
          <div className='flex flex-col gap-10'>
            <h1 className='font-bold'>total</h1>
            <span>$12.000</span>
            <span>$20.000</span>
            <span>$68.000</span>
            <span>$12.000</span>
            <span>$20.000</span>
            <span>$68.000</span>
          </div>
          <div className='flex flex-col gap-10'>
            <h1 className='font-bold'>date</h1>
            <span>8 june</span>
            <span>12 december</span>
            <span>8 june</span>
            <span>12 december</span>
            <span>8 june</span>
            <span>12 december</span>
          </div>
        </div>
      </div>

      <section className='bg-zinc-100 m-10 w-80 rounded-xl'>
        <main className='flex justify-between px-10'>
          <h1 className='text-center py-5 font-bold'>order information</h1>
          <i className='fi fi-rr-cross-circle flex justify-center items-center text-xl hover:cursor-pointer'></i>
        </main>
        <hr className='text-purple-600' />
        <div className='py-5'>
          <h1 className='text-center'>Iván Perez</h1>
          <div className='flex justify-center gap-8 items-center py-5'>
            <i className='fi fi-rr-envelope flex justify-center items-center bg-white p-3 rounded-full hover:cursor-pointer'></i>
            <i className='fi fi-rr-phone-flip flex justify-center items-center bg-white p-3 rounded-full hover:cursor-pointer'></i>
            <i className='fi fi-brands-whatsapp flex justify-center items-center bg-white p-3 rounded-full hover:cursor-pointer'></i>
          </div>
        </div>
        <hr className='text-purple-600' />
        <div className='px-10 flex flex-col gap-2 py-5'>
          <h1>order items</h1>
          <div className='bg-white rounded-lg p-2'>
            <h2>Airpods Pro x1</h2>
            <span>$40.000</span>
          </div>
          <div className='bg-white rounded-lg p-2'>
            <h2>Airpods 4th Gen</h2>
            <span>$100.000</span>
          </div>
        </div>
        <hr className='text-purple-600' />
        <div className='px-10 py-5'>
          <h1>total:</h1>
          <span>$140.000</span>
        </div>
      </section>
    </Fragment>
  );
}
import { Fragment } from 'react';

export default function Support() {
  return (
    <Fragment>
      <section className='w-full min-h-screen flex flex-col py-10 text-fu'>
        <main>
          <h2 className='text-2xl md:text-fu font-bold max-md:ml-10 md:ml-20 lg:ml-40 mb-10'>02 Support Always</h2>
        </main>
        <div className='flex flex-col lg:flex-row justify-around items-center px-6 md:px-10 lg:px-20 gap-10'>
          <div className='flex justify-center flex-col text-base md:text-fu gap-6 px-4 md:px-10 lg:px-20 w-full lg:w-1/2'>
            <h3 className='font-bold text-lg md:text-xl'>Support</h3>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold'>We're here when you need us</h1>
            <p className='text-base md:text-lg'>Questions, doubts, or problems? Our team responds tirelessly, at any time.</p>
            {/* <span className='flex gap-5 flex-wrap'>
              <button className='bg-gray-200 px-5 py-1 rounded-lg hover:scale-90 hover:cursor-pointer transition-all'>Discover</button>
              <button className='flex justify-center items-center gap-1 hover:scale-90 hover:cursor-pointer transition-all'>More<i class='fi fi-rr-angle-double-small-right flex justify-center items-center'></i></button>
            </span> */}
          </div>
          <div className='flex justify-center w-full lg:w-1/2'>
            <img src='/image-support.jpg' alt='Image Support' className='w-full max-w-md lg:max-w-full aspect-square object-cover rounded-lg' />
          </div>
        </div>
      </section>
      <hr className='text-gray-300'></hr>
    </Fragment>
  );
} 
import { Fragment } from 'react';

export default function Footer() {
  return (
    <Fragment>
      <footer className='w-full py-20 px-5 mt-10'>
        <div className='flex max-md:flex-col flex-wrap justify-around items-center gap-10'>
          <h1 className='text-fu'>NIVOA</h1>
          <ul className='flex max-md:flex-col max-md:gap-4 text-center gap-10 text-fu'>
            <li>home</li>
            <li>shop</li>
            <li>contact</li>
            <li>support</li>
          </ul>
          <div className='flex gap-2'>
            <i className='fi fi-brands-instagram text-xl'></i>
            <i className='fi fi-brands-twitter-alt text-xl'></i>
            <i class='fi fi-brands-facebook text-xl'></i>
            <i class='fi fi-brands-linkedin text-xl'></i>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
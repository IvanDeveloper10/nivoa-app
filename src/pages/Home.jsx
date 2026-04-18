import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ProductsMainPage from '../components/ProductsMainPage.jsx';
import Cards from '../components/Cards.jsx';
import FastDelivery from '../components/FastDelivery.jsx';
import Support from '../components/Support.jsx';
import Review from '../components/Review.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {

  const navigate = useNavigate();

  const handleExplorerRute = () => {
    navigate('/shop');
  }

  const handleRegisterRute = () => {
    navigate('/register');
  }

  return (
    <Fragment>
      <Navbar />
      <section className='w-full min-h-screen bg-zinc-900 text-white flex justify-center items-center border-b-2 border-purple-600 px-4'>
        <main className='flex flex-col lg:flex-row justify-between border-2 border-zinc-800 rounded-xl my-10 lg:m-20 w-full max-w-7xl'>
          <div className='flex flex-col gap-5 p-6 sm:p-10 w-full lg:w-2/4'>
            <h1 className='font-extrabold text-4xl sm:text-6xl lg:text-8xl text-fu'>The best awaits you in Nivoa</h1>
            <p className='text-base sm:text-lg text-fu'>Discover carefully selected products that will transform your day. Each item tells a story of quality and distinction.</p>
            <div className='flex flex-col sm:flex-row gap-5'>
              <button onClick={handleExplorerRute} className='bg-purple-600 px-6 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all text-fu'>Explorer</button>
              <button onClick={handleRegisterRute} className='bg-zinc-800 px-6 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all text-fu'>Register</button>
            </div>
          </div>
          <div className='flex justify-center lg:justify-end w-full lg:w-auto'>
            <div className='w-full lg:w-xl aspect-square'>
              <img src='/image-nivoa.png' alt='Image Nivoa' className='w-full h-full object-cover rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl rounded-br-xl' />
            </div>
          </div>
        </main>
      </section>

      {/* <div className='flex justify-around sm:hidden w-full fixed bottom-0 bg-purple-100'>
        <div className='p-4'>
          <i className='fi fi-rr-home text-xl'></i>
        </div>
        <div className='p-4'>
          <i className='fi fi-rr-shopping-cart text-xl'></i>
        </div>
        <div className='p-4'>
          <i className='fi fi-rr-user text-xl'></i>
        </div>
      </div> */}
      <Cards />
      <FastDelivery />
      <Support />
      <ProductsMainPage />
      <Review />
      <Footer />
    </Fragment>
  );
}
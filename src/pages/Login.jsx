import { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../utils/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function Login() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleButtonLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        alert(err);
      })
  }

  const handleBackButton = () => {
    return navigate('/')
  }

  return (
    <Fragment>
      <section className='w-full h-screen flex justify-between overflow-hidden text-fu'>
        <button onClick={handleBackButton} className='flex pl-4 items-center gap-2 absolute top-10 left-10 w-32 hover:bg-zinc-100 hover:cursor-pointer transition-all rounded-lg py-2'>
          <i className='fi fi-rr-arrow-left flex justify-center items-center'></i> Back
        </button>
        <div className='w-2/4 flex flex-col justify-center items-center gap-5 text-fu max-lg:w-full'>
          <h1 className='text-fu text-4xl font-bold text-center'>USER LOGIN</h1>
          <input type='text' placeholder='email' name='email' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setEmail(e.target.value)} />
          <input type={showPassword ? 'text': 'password'} placeholder='password' name='password' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setPassword(e.target.value)} />
          <label className='w-96'><input type='checkbox' onChange={() => setShowPassword(!showPassword)} /> Show password</label>
          <button className='bg-purple-600 py-2 text-fu text-white w-96 rounded-xl hover:cursor-pointer hover:scale-95 transition-all' onClick={handleButtonLogin}>submit</button>
          <span>Do you haven't an account? <Link to='/register' className='text-blue-600'>register</Link></span>
        </div>
        <div className='w-2/4 max-lg:hidden'>
          <img src='/image-auth.jpg' alt='Image Auth' />
        </div>
      </section>
    </Fragment>
  );
}
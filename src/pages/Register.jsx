import { Fragment, useState } from 'react';
import { auth } from '../utils/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase.js';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  const handleBackButton = () => {
    navigate('/')
  }

  const handleButtonRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        username: username,
        createdAt: new Date()
      })

      alert('User Register Correct')

      navigate('/')
    } catch(err) {
      alert(err)
    }
  }

  return (
    <Fragment>
      <section className='w-full h-screen flex justify-between overflow-hidden text-fu'>
        <button onClick={handleBackButton} className='flex pl-4 items-center gap-2 absolute top-10 left-10 w-32 hover:bg-zinc-100 hover:cursor-pointer transition-all rounded-lg py-2'>
          <i className='fi fi-rr-arrow-left flex justify-center items-center'></i> Back
        </button>
        <div className='w-2/4 flex flex-col justify-center items-center gap-5 text-fu max-lg:w-full'>
          <h1 className='text-fu text-4xl font-bold text-center'>USER REGISTER</h1>
          <input type='text' placeholder='email' name='email' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setEmail(e.target.value)} />
          <input type='text' placeholder='username' name='username' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setUsername(e.target.value)} />
          <input type={showPassword ? 'text' : 'password'} placeholder='password' name='passwoord' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setPassword(e.target.value)} />
          <label className='w-96 flex gap-2'><input type='checkbox' onChange={() => setShowPassword(!showPassword)} />Show password</label>
          <button className='bg-purple-600 py-2 text-fu text-white w-96 rounded-xl hover:cursor-pointer hover:scale-95 transition-all' onClick={handleButtonRegister}>submit</button>
          <span>Do you have an account? <Link to={'/login'} className='text-blue-600'>Sign In</Link></span>
        </div>
        <div className='w-2/4 max-lg:hidden'>
          <img src='/image-auth.jpg' alt='Image Auth' />
        </div>
      </section>
    </Fragment>
  );
}
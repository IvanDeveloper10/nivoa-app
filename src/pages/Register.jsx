import { Fragment, useState } from 'react';
import { auth, db } from '../utils/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errorModal, setErrorModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const passwordRules = {
    length: password.length >= 6,
    letter: /[a-zA-Z]/.test(password),
    number: /[0-9]/.test(password)
  }

  const isFormValid =
    email &&
    firstname &&
    lastname &&
    phonenumber.length === 10 &&
    passwordRules.length &&
    passwordRules.letter &&
    passwordRules.number;

  const handleButtonRegister = async () => {

    if (!isFormValid) {
      setErrorModal('Completa todos los campos correctamente');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        firstname,
        lastname,
        phonenumber,
        createdAt: new Date()
      });

      navigate('/');

    } catch (error) {
      setErrorModal(error.message);
    } finally {
      setLoading(false);
    }
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
        {errorModal && (
          <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-xl w-80 text-center shadow-xl'>
              <h2 className='text-xl font-bold mb-3 text-red-600'>Error</h2>
              <p className='text-gray-700'>{errorModal}</p>
              <button 
                onClick={() => setErrorModal(null)} 
                className='mt-4 bg-black text-white px-4 py-2 rounded-lg hover:scale-95 transition-all'
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className='w-2/4 flex flex-col justify-center items-center gap-4 max-lg:w-full'>
          <h1 className='text-4xl font-bold'>Register</h1>

          <input 
            type='email' 
            placeholder='Email' 
            className='bg-zinc-100 w-96 py-2 px-4 rounded-xl outline-none'
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type='text' 
            placeholder='First name' 
            className='bg-zinc-100 w-96 py-2 px-4 rounded-xl outline-none'
            onChange={(e) => setFirstname(e.target.value)}
          />

          <input 
            type='text' 
            placeholder='Last name' 
            className='bg-zinc-100 w-96 py-2 px-4 rounded-xl outline-none'
            onChange={(e) => setLastname(e.target.value)}
          />

          <input 
            type='tel' 
            placeholder='3001234567' 
            maxLength='10' 
            className='bg-zinc-100 w-96 py-2 px-4 rounded-xl outline-none'
            onChange={(e) => setPhonenumber(e.target.value)}
          />

          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder='Password' 
            className='bg-zinc-100 w-96 py-2 px-4 rounded-xl outline-none'
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className='w-96 flex gap-2 text-sm'>
            <input 
              type='checkbox' 
              onChange={() => setShowPassword(!showPassword)} 
            />
            Show password
          </label>

          <div className='w-96 text-sm'>
            <p className={`flex items-center gap-2 ${passwordRules.length ? 'text-green-600 line-through' : 'text-gray-500'}`}>
              <i className='fi fi-rr-check flex justify-center items-center'></i> At least 6 characters
            </p>
            <p className={`flex items-center gap-2 ${passwordRules.letter ? 'text-green-600 line-through' : 'text-gray-500'}`}>
              <i className='fi fi-rr-check flex justify-center items-center'></i> At least one letter
            </p>
            <p className={`flex items-center gap-2 ${passwordRules.number ? 'text-green-600 line-through' : 'text-gray-500'}`}>
              <i className='fi fi-rr-check flex justify-center items-center'></i> At least one number
            </p>
          </div>

          <button 
            disabled={!isFormValid || loading}
            onClick={handleButtonRegister}
            className={`w-96 py-2 rounded-xl text-white transition-all ${
              isFormValid 
              ? 'bg-purple-600 hover:scale-95 hover:cursor-pointer' 
              : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Creating...' : 'Register'}
          </button>

          <span>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-600'>
              Sign In
            </Link>
          </span>
        </div>

        <div className='w-2/4 max-lg:hidden'>
          <img src='/image-auth.jpg' alt='Image Auth' className='h-full w-full object-cover' />
        </div>

      </section>
    </Fragment>
  );
}
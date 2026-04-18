import { Fragment, useState } from 'react';
import { auth } from '../utils/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase.js';
import { doc, setDoc } from 'firebase/firestore';


export default function Register() {

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  
  const handleBackButton = () => {
    navigate('/')
  }

  const handleButtonRegister = async () => {
    const newErrors = {};
    if(!email) newErrors.email = true;
    if(!firstname) newErrors.username = true;
    if(!password) newErrors.password = true;

    if (!passwordRules.length || !passwordRules.letter || !passwordRules.number) {
      newErrors.passwordRules = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        createdAt: new Date()
      })

      alert('User Register Correct')

      navigate('/')
    } catch(err) {
      alert(err)
    }
  }

  const passwordRules = {
    length: password && password.length >= 6,
    letter: password && /[a-zA-z]/.test(password),
    number: password && /[0-9]/.test(password)
  }

  return (
    <Fragment>
      <section className='w-full h-screen flex justify-between overflow-hidden text-fu'>
        <button onClick={handleBackButton} className='flex pl-4 items-center gap-2 absolute top-10 left-10 w-32 hover:bg-zinc-100 hover:cursor-pointer transition-all rounded-lg py-2'>
          <i className='fi fi-rr-arrow-left flex justify-center items-center'></i> Back
        </button>
        <div className='w-2/4 flex flex-col justify-center items-center gap-5 text-fu max-lg:w-full'>
          <h1 className='text-fu text-4xl font-bold text-center'>USER REGISTER</h1>
          <input type='text' placeholder='gmail' name='email' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setEmail(e.target.value)} />
          <input type='text' placeholder='first name' name='firstname' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setFirstname(e.target.value)} />
          <input type='text' placeholder='last name' name='lastname' className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setLastname(e.target.value)} />
          <input type='tel' placeholder='3001234567' pattern='[0-9]{10}' maxLength='10' required className='outline-none bg-zinc-100 w-96 py-2 px-5 rounded-xl' onChange={(e) => setPhonenumber(e.target.value)} />
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
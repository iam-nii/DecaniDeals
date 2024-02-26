import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false); 
  const navigate = useNavigate();

  // Handles input changes for form data
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };
  
  const handleSumbit = async(e) =>{
    e.preventDefault(); // prevents the page from refreshin on submit
    
    try {
      setLoading(true);      
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if(data.success == false){
        setLoading(false);
        setError(data.message);
        return;
      } 
      // Set the loading to false  and redirect user to dashboard after successful sign up
      setLoading(false);   
      setError(null);      
      navigate('/sign-in')
        
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }
  
  return (
    <div className='mx-auto p-3 max-w-lg'>

      <h1 className='text-center font-bold text-3xl my-7'>
        SignUp
      </h1>

      <form onSubmit={handleSumbit} className='flex flex-col gap-4'>

        <input type="text" placeholder='Username' className=' focus:outline-none rounded-lg p-3 border' id='username' onChange={handleChange}/>

        <input type="email" placeholder='Email' className='focus:outline-none rounded-lg p-3 border' id='email' onChange={handleChange}/>

        <input type="password" placeholder='Password' className='focus:outline-none rounded-lg p-3 border' id='password' onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded uppercase hover:shadow-xl hover:opacity-95 disabled:opacity-80 disabled:shadow-none ' >{loading? 'Please wait...' : 'Sign Up'}</button>

      </form>

      {error && <p className='text-red-600 text-center mt-3'>{error}</p>}
      

      <div className='flex gap-2 mt-5'>

        <p>Have and account?</p>  

        <Link to={"/sign-in"}>
          <span className='text-blue-600'>Sign in </span>
        </Link>

      </div>
      </div>
  )
}

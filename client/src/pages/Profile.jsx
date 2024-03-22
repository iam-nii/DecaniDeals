import {useSelector} from 'react-redux';

export default function Profile(){
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="font-semibold text-4xl text-center my-9">Profile</h1>

      <form action=""className='flex flex-col gap-4'>
      <img src={currentUser.avatar} alt="profile" 
      className='rounded-full h-24 w-24 cursor-pointer mt-2 object-cover self-center'/>
      <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
        />
      <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
        />
      <input
          type='text'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
        />
        <button className='bg-slate-600 text-white uppercase p-3 rounded-lg disabled:opacity-80 hover:opacity-95'>update</button>
      </form>  
      <div className='flex mt-3 justify-between'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
        
      </div>  
    </div>
  )
}

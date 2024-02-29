

export default function SignIn() {
  return (
    <div className="mx-auto p-3 max-w-lg">
      <h1 className='text-center font-bold text-3xl my-7'>Sign in</h1>
      <form className='flex flex-col gap-4'>

          <input type="text" placeholder='username' className='rounded-lg p-3 focus:outline-none border'/>

          <input type="email" placeholder='email' className='rounded-lg p-3 focus:outline-none border'/>

          <input type="password" placeholder='password' className='rounded-lg p-3 focus:outline-none border'/>

          
          <button className="bg-slate-700 text-white p-3 rounded uppercase hover:shadow-xl hover:opacity-95 disabled:opacity-80 disabled:shadow-none"> Sign in</button>
        </form>
    </div>
  )
}

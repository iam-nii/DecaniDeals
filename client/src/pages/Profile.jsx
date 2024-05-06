import {useSelector} from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js';
import {useDispatch} from 'react-redux';
import {Link, useAsyncError} from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice.js';


export default function Profile(){

  const fileRef = useRef(null);
  const  [progress, setProgress]= useState(0);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);



  const [userListings,setUserListings] = useState([]);


  const dispatch = useDispatch();

  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is' + progress + '% done');
        setFilePerc(Math.round(progress));
    },(error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setFormData({ ...formData, avatar: downloadURL })
      ); 
    });
    
  };

  const handleInputChange = (e) =>{
    setFormData({...formData, [e.target.id]:  e.target.value})
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error))
    }

  }
  const handleDeleteUser = async () =>{
    try {
      dispatch(deleteUserStart());
      
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      });
      const data = await res.json();
      
      if(data.success == false){
        dispatch(deleteUserFailure(data.message));
        return
      }
      else{
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async ()=>{
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false){
        dispatch(signOutUserFailure(data.message))
      }
      else{
        dispatch(signOutUserSuccess(data));
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
      
    }
  }

  const handleShowLisings = async ()=>{
    setShowListingsError(false);
    try {
      const res =  await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setShowListingsError(true);
        return;
      }
      setUserListings(()=>{
        return [...data["Film"], ...data["Bag"]];
      });
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="font-semibold text-4xl text-center my-7">Profile</h1>

      <form onSubmit={handleSubmit} action=""className='flex flex-col gap-4'>
      <img src={formData.avatar || currentUser.avatar} alt="profile" onClick={()=>fileRef.current.click()}
      className='rounded-full h-24 w-24 cursor-pointer mt-2 object-cover self-center'/>
      <input onChange={(event)=>setFile(event.target.files[0])} type="file" ref={fileRef} hidden  accept='image/*'/>
      <p className='text-center'>{
      fileUploadError?<span className='text-red-600'>Error uploading imgae (Image must be less that 2mb)</span> 
      : 
      filePerc > 0 && filePerc < 100 ? <span className='text-slate-600 '>{`Uploading ${filePerc}%`}</span>
      :
       filePerc === 100 ? <span className='text-green-400'>Image successfully uploaded</span>
       :
       ""}
      </p>
      <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleInputChange}
        />
      <input
          type='email'
          placeholder='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleInputChange}
        />
      <input
          type='password  '
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleInputChange}
        />
        <button disabled={loading} className='bg-slate-600 text-white uppercase p-3 rounded-lg disabled:opacity-80 hover:opacity-95'>
          {
            loading ? 'Loading...':'Update' 
          }
        </button>
        <Link to={'/create-listing'} 
        className='p-3 rounded-lg bg-green-600 text-center uppercase text-white hover:opacity-85'>
          Create listing
        </Link>

      </form>  
      <div className='flex mt-3 justify-between'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>        
      </div>  
      <p className='text-red-600 mt-4'>{error? error: ''}</p>
      <p className='text-green-600 mt-4'>{updateSuccess? 'User successfully updated': ''}</p>    

      <button onClick={handleShowLisings} className='w-full text-green-400'>Show listings</button>
      {showListingsError && <p className='text-red-600 mt-5'>Error showing listings</p>}
      {
        userListings && userListings.length > 1 && 
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-center mt-7 text-2xl'>Your listings</h1>
          {userListings.map((listing)=>(
          <div key={listing._id} className='p-3 border flex rounded-lg justify-between items-center'>
            <Link to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain'/>
            </Link>
            <Link className='text-slate-700 font-semibold hover:underline flex-1 truncate' to={`/listing/${listing._id}`}>
              <p >{listing.name}</p>
            </Link>
            <div className="flex flex-col justify-between items-end">
              <button className='uppercase text-red-600'>Delete</button>
              <button className='uppercase text-green-600'>Edit</button>
            
          </div>
          </div>
          
          ))}

        </div>
         
      }
    </div>
  )
}

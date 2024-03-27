import {useSelector} from 'react-redux';
import { useRef,useState,useEffect } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase.js'


export default function Profile(){

  const fileRef = useRef(null);
  const  [progress, setProgress]= useState(0);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="font-semibold text-4xl text-center my-9">Profile</h1>

      <form action=""className='flex flex-col gap-4'>
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

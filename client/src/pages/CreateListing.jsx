import React, { useState } from 'react';
import {app} from '../firebase'
import { getStorage,getDownloadURL,ref,uploadBytesResumable } from 'firebase/storage'

export default function CreateListing() {

    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [loading,setLoading] = useState(false)
    const [imageUploadError, setImageUploadError] = useState(false);
    console.log(formData);

    const handleImageSubmit = (e) => {
        e.preventDefault();
        if(files.length > 0 && files.length + formData.imageUrls.length < 4){
            setLoading(true);
            setImageUploadError(false);
            const promises = [];

            for(let i=0; i<files.length; i++){
                promises.push(storeImage(files[i]));
            }
            
            Promise.all(promises).then((urls)=>{
                setFormData(
                    {
                        ...formData, imageUrls:formData.imageUrls.concat(urls)
                        
                    }                    
                );
                setImageUploadError(false);
                setLoading(false);
            }).catch((err)=>{
                setImageUploadError('Image upload failed (2mb max per iamge');
                setLoading(false);
            })
            
        }else if(files.length == 0){
            setImageUploadError('An image for the equipment must be selected')
            setLoading(false);
        }
        else{
            setImageUploadError('You can only select 3 images per equipment')
            setLoading(false);
        }
    };
    const storeImage = async (file) =>{
        return new Promise((resolve, reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) =>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error);

                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                        resolve(downloadURL);
                    })
                }
            )

        })
    }
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_,i) => i !== index),

        });
    }
    console.log(files)
  return (
    <main className='p-2 max-w-4xl mx-auto'>
        <h1 className='text-center m-7 text-xl font-semibold'>Добавить оборудование</h1>
        <form className='flex flex-col sm:flex-row m-9 gap-4'>
            <div className='flex flex-1 flex-col gap-4'>
                <input type="text" placeholder='Название' className='border p-3 rounded-lg' id='name' maxLength="62" minLength="10" required/>

                <textarea type="text" placeholder='Описание' required className='border p-3 rounded-lg' id='description'/>

                <input type="text" placeholder='Адрес' className='border p-3 rounded-lg' id='address' required/>

                <div className='flex flex-row gap-4'>
                    <div className='flex gap-2'>
                        <input type="radio" id='film' name='type' className='w-4'/>
                        <span>Пленка</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="radio" id='bag' name='type' className='w-4'/>
                        <span>Пакет</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                <div className='flex items-center gap-2'>
                    <input type="number" placeholder='0.00' id='price' className='min-w-20 p-3 rounded-lg border'/>
                    <span>&#8381;</span>
                </div>
                <div className='flex items-center gap-2'>
                <p className='flex flex-col items-center'>
                        Производительность 
                        <span>(кг/ч): </span>
                    </p>
                    <input type="number" placeholder='0' id='productionRate' className='w-14 p-3 rounded-lg border'/>
                    
                </div>
                <div id='filmOption'>
                    <div className='flex items-center gap-2'>
                    <p className='flex flex-col items-center'>Толщина пленки
                        <span>(мм):</span>
                        </p>
                        <input type="number" placeholder='0' id='filmThickness' className='w-14 p-3 rounded-lg border'/>                        
                    </div>
                </div>
                <div id='bagOption' className='flex gap-2 flex-row'>
                    <div className='flex items-center gap-2'>
                    <p className='flex flex-col items-center'>Ширина пакета
                        <span>(мм):</span>
                        </p>
                        <input type="number" placeholder='0' id='rubberWidth' className='w-14 p-3 rounded-lg border'/>
                        </div>
                    <div className='flex items-center gap-2'>
                    <p className='flex flex-col items-center'>Длина пакета 
                        <span>(мм):</span>
                        </p>
                        <input type="number" placeholder='0' id='rubberDepth' className=' w-14 p-3 rounded-lg border'/>
                        
                        
                    </div>

                </div>
                
                </div>
                
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Картинки:
                    <span className='font-normal text-gray-600 ml-2'>
                        Первая картинка будет облочной (макс 3)
                    </span>
                    </p>
                    <div className='flex gap-2'>
                        <input className='border p-3 border-gray-300 w-full rounded' onChange={(e)=>setFiles(e.target.files)}
                        type="file" id='images' accept='image/*' multiple />
                        <button
                        type='button'
                         onClick={handleImageSubmit}
                         className='p-3 text-green-700 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {
                                loading? 'Loading...': 'Upload'
                            }
                        </button>
                    </div>
                    <p className='text-red-600 text-sm'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) =>(
                            <div 
                            key={url}
                            className="flex justify-between p-3 border items-center">
                                
                                <img 
                                src={url} 
                                alt="equipment image"
                                className='w-20 h-20 object-contain rounded-lg'
                                />
                                <button 
                                type='button'
                                onClick={()=>handleRemoveImage(index)}
                                className='p-3 text-red-600 rounded-lg uppercase hover:opacity-65'> 
                                Delete
                                </button>
                            </div>
                            
                        ))
                    }
                    <button className='border rounded-lg uppercase p-3 text-white bg-slate-700 hover:opacity-95 disabled:opacity-80 mt-3'>Добавить</button>
            </div>
            
        </form>
    </main>
  )
}

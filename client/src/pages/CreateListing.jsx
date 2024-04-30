import React from 'react'

export default function CreateListing() {
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
                        <input className='border p-3 border-gray-300 w-full rounded'
                        type="file" id='images' accept='image/*' multiple />
                        <button className='p-3 text-green-700 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
                    <button className='border rounded-lg uppercase p-3 text-white bg-slate-700 hover:opacity-95 disabled:opacity-80 mt-3'>Добавить</button>
            </div>
        </form>
    </main>
  )
}

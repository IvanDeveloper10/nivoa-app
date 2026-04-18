import { Fragment, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';

export default function AddProducts() {

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [largeDescription, setLargeDescription] = useState('');
  const [price, setPrice] = useState('');

  const [images, setImages] = useState([])

  const handleSaveProducts = async () => {
    try {
      const imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);
        imageUrls.push(url);
      }

      await addDoc(collection(db, 'products'), {
        title: title,
        shortDescription: shortDescription,
        largeDescription: largeDescription,
        price: Number(price),
        images: imageUrls
      });

      alert('Producto guardado correctamente');

    } catch(err) {
      alert(err);
    }
  }

  const maxChars = 100;

  return (
    <Fragment>
      <section className='p-10 w-full flex'>
        <main className='w-2/4'>
          <h1 className='text-2xl font-bold text-purple-600'>Add Products</h1>
          <div className='flex flex-col gap-5 w-96'>
            <input type='text' placeholder='Title' className='bg-zinc-100 p-2 rounded-lg' onChange={(e) => setTitle(e.target.value)} />
            <textarea maxLength={maxChars} placeholder='Short Description' className='bg-zinc-100 h-32 resize-none p-2 rounded-lg no-scrollbar' onChange={(e) => setShortDescription(e.target.value)} />
            <span>{shortDescription.length}/{maxChars}</span>
            <input type='number' placeholder='Price' className='bg-zinc-100 p-2 rounded-lg' onChange={(e) => setPrice(e.target.value)} />
            <div>
              <input type='file' multiple onChange={(e) => setImages(Array.from(e.target.files))} className='hidden' id='fileinput' />
              <label htmlFor='fileinput' className='w-96 flex justify-center items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:cursor-pointer hover:scale-90 transition-all'>
                Upload Images
              </label>
              <div className='flex gap-2 mt-2'>
                {images.map((img, index) => (
                  <img key={index} src={URL.createObjectURL(img)} alt='Image Preview' className='w-20 h-20 object-cover rounded-lg' />
                ))}
              </div>
            </div>
            <div>
              <button className='bg-zinc-100 w-full py-2 hover:scale-95 hover:cursor-pointer transition-all rounded-lg' onClick={handleSaveProducts}>Save Product</button>
            </div>
          </div>
        </main>
        <div>
          <textarea placeholder='Large Description' className='bg-zinc-100 h-96 w-96 p-2 rounded-lg resize-none no-scrollbar' onChange={(e) => setLargeDescription(e.target.value)}></textarea>
        </div>
      </section>
    </Fragment>
  );
}
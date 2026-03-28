import { Fragment, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';

export default function AddProducts() {

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

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
        description: description,
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
      <section className='p-10'>
        <main>
          <h1 className='text-2xl font-bold'>Add Products</h1>
          <div className='flex flex-col gap-5'>
            <input type='text' placeholder='Title' className='bg-zinc-100 p-2 rounded-lg' onChange={(e) => setTitle(e.target.value)} />
            <textarea maxLength={maxChars} placeholder='Description' className='bg-zinc-100 h-32 resize-none p-2 rounded-lg' onChange={(e) => setDescription(e.target.value)} />
            <span>{description.length}/{maxChars}</span>
            <input type='number' placeholder='Price' className='bg-zinc-100 p-2 rounded-lg' onChange={(e) => setPrice(e.target.value)} />
            <div>
              <input type='file' multiple onChange={(e) => setImages(Array.from(e.target.files))} className='border p-2 rounded-lg hover:cursor-pointer' />
            </div>
            <div>
              <button className='bg-zinc-100 w-full py-2 hover:scale-95 hover:cursor-pointer transition-all rounded-lg' onClick={handleSaveProducts}>Save Product</button>
            </div>
          </div>
        </main>
        <div>

        </div>
      </section>
    </Fragment>
  );
}
import { useState } from 'react';

import type { ProductWithImage } from '@/interfaces';

interface Props {
    product: ProductWithImage
}


export const ProductCard = ({ product}: Props) => {

//cortamos por un coma en medio de las imagenes:
const images = product.images.split(',').map(img => {
    return img.startsWith('http')
    ? img
    : `${import.meta.env.PUBLIC_URL}/images/products/${img}`
})

const [currentImage, setCurrentImage] = useState(images[0])


    return (
        <a href={`/products/${product.slug}`} className="card bg-base-100 w-[320px] lg:w-96 h-auto shadow-xl">
  <figure>
    <img
    className='rounded-3xl'
      src={currentImage}
      alt={product.title}
      onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
      onMouseLeave={() => setCurrentImage(images[0])}
    />
  </figure>
  <div className="card-body h-[200px] flex flex-col">
    <h2 className="card-title">{product.title}</h2>
    <p>{product.tags}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Add to card</button>
    </div>
  </div>
</a>
    )
}
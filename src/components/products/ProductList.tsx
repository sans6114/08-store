import type { ProductWithImage } from '@/interfaces';

import { ProductCard } from './ProductCard';

interface Props {
    products: ProductWithImage[]
}



export const ProductList = ({ products }: Props) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-4'>
            {
                products.map((producto) => (

                    <ProductCard key={producto.id} product={producto} />
                ))
            }
        </div>
    )
}
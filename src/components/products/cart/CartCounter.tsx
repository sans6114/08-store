import { useEffect } from 'react';

import { itemsInCart } from '@/store';
import { CartCookie } from '@/utils';
import { useStore } from '@nanostores/react';

export const CartCounter = () => {
    const $itemsInCart = useStore(itemsInCart);

useEffect(() => {
  const cart = CartCookie.getCart()
itemsInCart.set(cart.length)
}, [])



    return (
        <a className='relative inline-block' href="/cart">
            {
                ($itemsInCart > 0) && (
            <span className="absolute -top2 -right-2 flex justify-center items-center bg-blue-600 text-white text-xs rounded-full w-4 h-4 p-2">
            {$itemsInCart}
            </span>

                )
            }
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M16 6V4H8v2M7 18c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m10 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-9.8-3.2v-.1l.9-1.7h7.4c.7 0 1.4-.4 1.7-1l3.9-7l-1.7-1l-3.9 7h-7L4.3 2H1v2h2l3.6 7.6L5.2 14c-.1.3-.2.6-.2 1c0 1.1.9 2 2 2h12v-2H7.4c-.1 0-.2-.1-.2-.2"></path></svg>
        </a>
    )
}
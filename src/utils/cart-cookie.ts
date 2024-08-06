import Cookies from 'js-cookie';

import type { CartItem } from '@/interfaces';

export class CartCookie {
    static getCart(): CartItem[] {

        const cart = JSON.parse(Cookies.get('cart') ?? '[]')
        return cart
    }

    static addItem(cartItem: CartItem): CartItem[] {

        const cart = CartCookie.getCart()
        const exist = cart.find(Item => cartItem.productId && Item.size === cartItem.size)
        if (exist) {
            exist.quantity += cartItem.quantity
        } else {
            cart.push(cartItem)
        }

        Cookies.set('cart', JSON.stringify(cart))
        return cart
    }

    static removeItem(productId: string, size: string): CartItem[] {
        const cart = CartCookie.getCart()
        //      console.log(productId, size)
        //mi solcuion
        //const ItemToRemove = cart.findIndex(item => productId && size === item.productId && item.size)
        const updatedCart = cart.filter(item => !(item.productId === productId && item.size === size));
        //console.log(updatedCart)

        Cookies.set('cart', JSON.stringify(updatedCart))
        return updatedCart
    }
}
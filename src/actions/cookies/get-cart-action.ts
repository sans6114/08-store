import { defineAction } from 'astro:actions';
import {
  db,
  eq,
  inArray,
  ProductImage,
  Products,
} from 'astro:db';

import type { CartItem } from '@/interfaces';

export const getCart = defineAction({
    accept: 'json',
    //input: z.any(): acciones tienen acceso a las cookies,
    handler: async (_, {cookies}) => {
    
        const cart = JSON.parse(cookies.get('cart')?.value ?? '[]') as CartItem[]

        if(!cart) {
            return []
        }

//products
        const productId = cart.map(cartItem => cartItem.productId)
        const dbProducts = await db.select()
          .from(Products)
          .innerJoin(ProductImage, eq(Products.id, ProductImage.productId))
          .where(
           inArray(Products.id, productId)
          );
        

          console.log(dbProducts)



      return { ok: true, msg: 'Usuario cerrado' }
    }
  })
  
  
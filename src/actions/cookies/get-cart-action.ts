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
  handler: async (_, { cookies }) => {

    const cart = JSON.parse(cookies.get('cart')?.value ?? '[]') as CartItem[]

    if (!cart) {
      return []
    }

    //products
    const productIds = cart.map((item) => item.productId);
    const dbProducts = await db.select().from(Products).innerJoin(ProductImage, eq(Products.id, ProductImage.productId)).where(inArray(Products.id, productIds));


    console.log(dbProducts)



    return cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Products.id === item.productId);
      if (!dbProduct) {
        throw new Error(`Product with id ${item.productId} not found`);
      }

      const { title, price, slug } = dbProduct.Products;
      const image = dbProduct.ProductImage.image;

      return {
        productId: item.productId,
        title: title,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith('http')
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        price: price,
        slug: slug,
      };
    });
  },
})


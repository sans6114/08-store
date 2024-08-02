import {
  defineAction,
  z,
} from 'astro:actions';
import {
  db,
  eq,
  ProductImage,
  Products,
} from 'astro:db';

export const getProductBySlug = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (slug) => {

        const [product] = await db.select().from(Products).where(eq(Products.slug, slug))


        if (!product) {
            throw new Error('slug not found')
        }


        const images = await db.select().from(ProductImage).where(eq(ProductImage.id, product.id))




        return { 
            product: product,
            images: images.map(img => img.image) 
        }
    }
})


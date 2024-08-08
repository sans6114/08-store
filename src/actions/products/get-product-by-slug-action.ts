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

//creo mi nuevo producto
const newProduct = {
  id: '',
  description: 'Descripción del producto a crear',
  gender: 'men',
  price: 100,
  sizes: 'XS, S, M',
  slug: 'nuevo-producto',
  stock: 0,
  tags: 'shirt, men, nuevo',
  title: 'Nuevo Producto',
  type: 'shirts',

}



export const getProductBySlug = defineAction({
  accept: 'json',
  input: z.string(),
  handler: async (slug) => {

    if (slug === 'new') {
      return {
        product: newProduct,
        images: []
      }
    }

    //retono producto con equal

    const [product] = await db.select().from(Products).where(eq(Products.slug, slug))


    if (!product) {
      throw new Error('slug not found')
    }

    //retorno imagenes
    const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id))

    return {
      product: product,
      images: images.map(img => img.image)
    }
  }
})


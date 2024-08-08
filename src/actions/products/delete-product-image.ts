import {
  defineAction,
  z,
} from 'astro:actions';
import {
  db,
  eq,
  ProductImage,
} from 'astro:db';
import { getSession } from 'auth-astro/server';

import { uploadToCloud } from '@/utils/image-upload';

export const deleteProductImage = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (imageId, context) => {

        const userSession = await getSession(context.request);
        const user = userSession?.user;
        if (!user) {
            throw new Error("usuario no autorizado");
        }
        //imprimo usuario y verifico su existencia console.log(user)
        const [productImage] = await db.select().from(ProductImage).where(eq(ProductImage.id, imageId))

        if (!productImage) {
            throw new Error('image with this id not found')
        }


        const deleted = await db.delete(ProductImage).where(eq(ProductImage.id, imageId))


//esto en app real no se necesota ya que todas van por cloudinary/servicio de hosting
        if(productImage.image.includes('hhtp')){
            await uploadToCloud.deleteImage(productImage.image)
        }

        return {ok:true}
    }
})


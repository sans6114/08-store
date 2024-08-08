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
import { getSession } from 'auth-astro/server';
import { v4 as UUID } from 'uuid';

import { uploadToCloud } from '@/utils/image-upload';

const MAX_FILE_SIZE = 5_000_000; // 5 mb
const ACCEPTED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg+xml",
];

export const postProductUpdated = defineAction({
    accept: "form",
    input: z.object({
        id: z.string().optional(),
        description: z.string(),
        gender: z.string(),
        price: z.number(),
        sizes: z.string(),
        slug: z.string(),
        stock: z.number(),
        tags: z.string(),
        title: z.string(),
        type: z.string(),
        imageFiles: z
            .array(
                z
                    .instanceof(File)
                    .refine((file) => file.size < MAX_FILE_SIZE, "iMAGEN MAYOR A 5MB")
                    .refine((file) => {
                        return ACCEPTED_TYPES.includes(file.type);
                    }, "SOLO IMAGENES CON FORMATO VALIDO")
            )
            .optional(),
    }),
    handler: async (form, context) => {
        const userSession = await getSession(context.request);
        const user = userSession?.user;
        if (!user) {
            throw new Error("usuario no autorizado");
        }
        //imprimo usuario y verifico su existencia console.log(user)

        const { id = UUID(), imageFiles, ...rest } = form;
        rest.slug = rest.slug.toLowerCase().replaceAll(" ", "-").trim();
        //crear
        const product = {
            id: id,
            user: user.id || "", //otra opcion es poner ! al final como diciendo "TS", tyo confio que esto jamás sera undefined,
            ...rest,
        };

        const queries: any = []




        //updated product in database, si no existe el form.id es porque mi producto no existe
        const secureURLS:string[] = []
        if (!form.id) {
            queries.push(
                db.insert(Products).values(product))
        } else {
            queries.push(
                db.update(Products).set(product).where(eq(Products.id, id))
            )
        }
        if(form.imageFiles && form.imageFiles.length > 0 && form.imageFiles[0].size > 0){
            const urls = await Promise.all(
            form.imageFiles.map(file => uploadToCloud.uploadImages(file))
            )
            secureURLS.push(...urls)
        }


        secureURLS.forEach(url => {
            const imageObjt = {
            id: UUID(),
			image: url,
			productId: product.id,
            }

            queries.push(db.insert(ProductImage).values(imageObjt))
        })
        // imageFiles?.forEach(async (imageFile) => {
        //     if (imageFile.size < 0) return

            


        //     const url = await uploadToCloud.uploadImages(imageFile)
        // })


        await db.batch(queries)

        return product;
    },
});

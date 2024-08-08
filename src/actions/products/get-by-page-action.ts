import {
  defineAction,
  z,
} from 'astro:actions';
import {
  count,
  db,
  ProductImage,
  Products,
  sql,
} from 'astro:db';

import type { ProductWithImage } from '@/interfaces';

export const getProductsByPage = defineAction({
    accept: 'json',
    input: z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(12)
    }),
    handler: async ({ page, limit }) => {

        page = page < 0 ? 1 : page

        const [totalRecords] = await db.select({ count: count() }).from(Products)
        const totalPages = Math.ceil(totalRecords.count / limit)
        if (page > totalPages) {
            return {
                products: [] as ProductWithImage[],
                totalPages: totalPages
            }
        }

        const productsQuery = sql`
select a.*,
( select GROUP_CONCAT(image,',') from 
( select * from ${ProductImage} where productId = a.id limit 2 )
 ) as images
from ${Products} a
LIMIT ${limit} OFFSET ${(page - 1) * limit};
`

        const { rows } = await db.run(productsQuery)


        // const productos = await db.select().from(Products).innerJoin(ProductImage, eq(Products.id, ProductImage.productId)).limit(limit).offset((page - 1) * 12)KC
const products = rows.map(product => { 
    return {
        ...product,
        images: product.images ? product.images : 'no-image.png'
    }
}) as unknown as ProductWithImage[]

        return {
            products: products,//rows as unknown as ProductWithImage[],
            totalPages: totalPages
        }

    }
})



import {
  db,
  ProductImage,
  Products,
  Role,
  User,
} from 'astro:db';
import bcrypt from 'bcryptjs';
import { v4 as UUID } from 'uuid';

import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	const roles = [
		{ id: 'admin', name: 'Administrador' },
		{ id: 'user', name: 'Usuario de sistema' },
	]
	//admin
	const jhonDoe = {
		id: UUID(),
		name: 'Jhon Doe',
		email: 'Jhon@google.com',
		password: bcrypt.hashSync('123456'),
		role: 'admin'
	}
	//user
	const martinDoe = {
		id: UUID(),
		name: 'Martin Doe',
		email: 'martin@google.com',
		password: bcrypt.hashSync('123456'),
		role: 'user'
	}

await db.insert(Role).values(roles)
await db.insert(User).values([jhonDoe, martinDoe])

const queries: any = []


seedProducts.forEach((p) => {
	const product = {
		id: UUID(),
		description: p.description,
		gender: p.gender,
		price: p.price,
		sizes: p.sizes.join(','),
		slug: p.slug,
		stock: p.stock,
		tags: p.tags.join(','),
		title: p.title,
		type: p.type,
		user: jhonDoe.id
	}

	queries.push(db.insert(Products).values(product));


	p.images.forEach((img) => {
		const image = {
			id: UUID(),
			image: img,
			productId: product.id,
		}
		queries.push(db.insert(ProductImage).values(image));

	})
})

await db.batch(queries)
}

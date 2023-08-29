import { Knex } from 'knex';
import { BaseDatabase } from '../BaseDatabase';
import { Product } from '../../Models/Product';
import { ProductDescription } from '../../Models/ProductDescription';

export class ProductData extends BaseDatabase {
	insertProduct = async (product: Product) => {
		try {
			await this.connection('metabum_products').insert({
				id: product.getId(),
				name: product.getName(),
				brand: product.getBrand(),
				src: product.getProductImg(),
				price: product.getPrice(),
				quantity: product.getQuantity(),
				tags: product.getTags(),
				department: product.getDepartment(),
				small_src: product.getProductImg().replace('_gg.jpg', '_p.jpg'),
				medium_src: product.getProductImg().replace('_gg.jpg', '_m.jpg'),
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addImg = async (id: string, productId: string, img: string) => {
		try {
			await this.connection('metabum_product_images').insert({
				id: id,
				product_id: productId,
				small_img: img.replace('_gg.jpg', '_p.jpg'),
				medium_img: img.replace('_gg.jpg', '_m.jpg'),
				big_img: img,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductImgs = async (productId: string) => {
		try {
			const response = await this.connection('metabum_product_images').where(
				{
					product_id: productId,
				}
			);
			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	addDescription = async (description: ProductDescription) => {
		try {
			await this.connection('metabum_products_description').insert({
				id: description.getId(),
				product_id: description.getProductId(),
				title: description.getTitle(),
				description: description.getDescription(),
				img: description.getImg(),
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getDescriptions = async (productId: string) => {
		try {
			const response = await this.connection(
				'metabum_products_description'
			).where({
				product_id: productId,
			});

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProducts = async (orderBy: string, limit: number) => {
		try {
			const response = await this.connection('metabum_products')
				.limit(limit ? limit : 20)
				.orderBy('created_at', orderBy);

			return response;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductById = async (productId: string) => {
		try {
			const result = await this.connection('metabum_products').where({
				id: productId,
			});

			return result[0];
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getFilteredCatalog = async (
		word: string,
		name?: string,
		brand?: string,
		department?: string,
		orderBy?: string,
		limit?: number
	) => {
		try {
			let query: Knex.QueryBuilder<any, any[]> = this.connection(
				'metabum_products'
			).where('tags', 'LIKE', `%${word},%`);

			if (brand) query = query.andWhere('brand', brand);
			if (department) query = query.andWhere('department', department);
			if (name) query = query.andWhere('name', 'like', `%${name}%`);

			query.orderBy('price', orderBy).limit(limit ? limit : 20);

			const result = await query;

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductByBrand = async (brand: string) => {
		try {
			const result = await this.connection('metabum_products').where({
				brand: brand,
			});

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	getProductByName = async (productName: string) => {
		try {
			const result = await this.connection('metabum_products')
				.where('tags', 'like', `%${productName}%`)
				.or.where('name', 'like', `%${productName}%`);

			return result;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editPrice = async (price: number, productId: string) => {
		try {
			const response = await this.connection('metabum_products')
				.update({ price: price })
				.where({ id: productId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editQuantity = async (productId: string, quantity: number) => {
		try {
			await this.connection('metabum_products')
				.update({ quantity: quantity })
				.where({ id: productId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	editDescription = async (
		descriptionId: string,
		title?: string,
		description?: string,
		img?: string
	) => {
		try {
			await this.connection('metabum_products_description')
				.update({
					title: title,
					description: description,
					img: img,
				})
				.where({
					id: descriptionId,
				});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteDescription = async (descriptionId: string) => {
		try {
			await this.connection('metabum_products_description').delete().where({
				id: descriptionId,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteProduct = async (productId: string) => {
		try {
			await this.connection('metabum_products')
				.delete()
				.where({ id: productId });
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	deleteProductImg = async (id: string) => {
		try {
			await this.connection('metabum_product_images').delete().where({
				id: id,
			});
		} catch (error: any) {
			throw new Error(error.message);
		}
	};
}

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
				small_img: `${img}p.jpg`,
				medium_img: `${img}m.jpg`,
				big_img: `${img}gg.jpg`,
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

	getProducts = async () => {
		try {
			const response = await this.connection('metabum_products');

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

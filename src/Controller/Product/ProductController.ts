import { Request, Response } from 'express';
import { CustomError } from '../../Models/CustomError';
import { ProductBusiness } from '../../Business/Product/ProductBusiness';

export class ProductController {
	constructor(private productBusiness: ProductBusiness) {}

	insertProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { name, brand, src, price, quantity, tags, department } =
				req.body;
			await this.productBusiness.insertProduct(
				name,
				brand,
				src,
				price,
				quantity,
				tags,
				department,
				token
			);

			res.status(201).send('Product added to stock');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { title, description, img } = req.body;
			const { productId } = req.params;

			await this.productBusiness.addDescription(
				token,
				productId,
				title,
				description,
				img
			);

			res.status(201).send('Description added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	addImg = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { img } = req.body;
			const { productId } = req.params;

			await this.productBusiness.addImg(token, productId, img);

			res.status(201).send('Extra img added');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProductImgs = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;
			const response = await this.productBusiness.getProductImgs(productId);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getDescriptions = async (req: Request, res: Response) => {
		try {
			const { productId } = req.params;
			const response = await this.productBusiness.getDescriptions(productId);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProducts = async (req: Request, res: Response) => {
		try {
			const { orderBy, limit } = req.query;
			const response = await this.productBusiness.getProducts(
				orderBy as string,
				Number(limit)
			);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProductById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const response = await this.productBusiness.getProductById(id);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getFilteredCatalog = async (req: Request, res: Response) => {
		try {
			const { word } = req.params;
			const { name, brand, department, order, by, limit } = req.query;

			const response = await this.productBusiness.getFilteredCatalog(
				word,
				name as string,
				brand as string,
				department as string,
				order as string,
				by as string,
				Number(limit)
			);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	getProductByBrand = async (req: Request, res: Response) => {
		try {
			const { brand } = req.params;
			const response = await this.productBusiness.getProductByBrand(brand);

			// res.setHeader('Cache-Control', 'public, max-age=43200');
			res.status(200).send(response);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editPrice = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { price } = req.body;

			await this.productBusiness.editPrice(token, price, productId);

			res.status(200).send(`The product price was updated to ${price}`);
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editQuantity = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			const { quantity } = req.body;

			await this.productBusiness.editQuantity(token, productId, quantity);

			res.status(200).send('The product quantity was updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	editDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { descriptionId } = req.params;
			const { title, description, img } = req.body;

			await this.productBusiness.editDescription(
				token,
				descriptionId,
				title,
				description,
				img
			);

			res.status(200).send('Description updated');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteProductImg = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { id } = req.params;
			await this.productBusiness.deleteProductImg(token, id);

			res.status(200).send('Image deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteDescription = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { descriptionId } = req.params;
			await this.productBusiness.deleteDescription(token, descriptionId);

			res.status(200).send('Description deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};

	deleteProduct = async (req: Request, res: Response) => {
		try {
			const token: string = req.headers.authorization as string;
			const { productId } = req.params;
			await this.productBusiness.deleteProduct(token, productId);

			res.status(200).send('Product deleted');
		} catch (error: any) {
			if (error instanceof CustomError) {
				res.status(error.statusCode).send(error.message);
			} else {
				res.status(404).send(error.message);
			}
		}
	};
}

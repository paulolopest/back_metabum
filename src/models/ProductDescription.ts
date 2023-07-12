export class ProductDescription {
	constructor(
		private id: string,
		private productId: string,
		private title: string,
		private description: string,
		private img: string
	) {}

	getId(): any {
		return this.id;
	}
	getProductId(): string {
		return this.productId;
	}
	getTitle(): string {
		return this.title;
	}
	getDescription(): string {
		return this.description;
	}
	getImg(): string {
		return this.img;
	}
}

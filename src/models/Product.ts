export class Product {
	constructor(
		private id: string,
		private name: string,
		private brand: string,
		private src: string,
		private price: number,
		private quantity: number,
		private tags: string,
		private description: string
	) {}

	getId(): any {
		return this.id;
	}
	getName(): any {
		return this.name;
	}
	getBrand(): any {
		return this.brand;
	}
	getProductImg(): any {
		return this.src;
	}
	getPrice(): any {
		return this.price;
	}
	getQuantity(): any {
		return this.quantity;
	}
	getTags(): any {
		return this.tags;
	}
	getDescription(): any {
		return this.description;
	}
}

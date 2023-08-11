export class Cart {
	constructor(
		private userId: string,
		private productId: string,
		private productSrc: string,
		private productName: string,
		private productPrice: string,
		private quantity: number,
		private productBrand: string
	) {}

	public getUserId(): string {
		return this.userId;
	}
	public getProductId(): string {
		return this.productId;
	}
	public getProductSrc(): string {
		return this.productSrc;
	}
	public getProductName(): string {
		return this.productName;
	}
	public getProductPrice(): string {
		return this.productPrice;
	}
	public getQuantity(): number {
		return this.quantity;
	}
	public getProductBrand(): string {
		return this.productBrand;
	}
}

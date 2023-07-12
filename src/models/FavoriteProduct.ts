export class FavoriteProduct {
	constructor(
		private userId: string,
		private productId: string,
		private productSrc: string,
		private productName: string,
		private productBrand: string,
		private productPrice: number
	) {}

	public getUserId(): string {
		return this.userId;
	}
	public getProductId(): string {
		return this.productId;
	}
	public getSrc(): string {
		return this.productSrc;
	}
	public getName(): string {
		return this.productName;
	}
	public getBrand(): string {
		return this.productBrand;
	}
	public getPrice(): number {
		return this.productPrice;
	}
}

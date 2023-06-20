export class Cart {
	constructor(
		private id: string,
		private userId: string,
		private productId: string,
		private quantity: number
	) {}

	public getId(): string {
		return this.id;
	}
	public getUserId(): string {
		return this.userId;
	}
	public getProductId(): string {
		return this.productId;
	}
	public getQuantity(): number {
		return this.quantity;
	}
}

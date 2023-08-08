export class ProductEvaluation {
	constructor(
		private id: string,
		private productId: string,
		private userId: string,
		private userName: string,
		private rating: number,
		private pros: string,
		private cons: string,
		private description: string
	) {}

	getId(): any {
		return this.id;
	}
	getProductId(): string {
		return this.productId;
	}
	getUserId(): string {
		return this.userId;
	}
	getUserName(): string {
		return this.userName;
	}
	getRating(): number {
		return this.rating;
	}
	getPros(): string {
		return this.pros;
	}
	getCons(): string {
		return this.cons;
	}
	getDescription(): string {
		return this.description;
	}
}

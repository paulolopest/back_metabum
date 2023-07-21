export class TechnicalInformation {
	constructor(
		private id: string,
		private productId: string,
		private title: string,
		private info: JSON
	) {}

	public getId(): string {
		return this.id;
	}
	public getProductId(): string {
		return this.productId;
	}
	public getTitle(): string {
		return this.title;
	}
	public getInfo(): JSON {
		return this.info;
	}
}

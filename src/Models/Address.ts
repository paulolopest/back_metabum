export class Address {
	constructor(
		private id: string,
		private userId: string,
		private zipCode: number,
		private identification: string,
		private street: string,
		private number: number,
		private neighborhood: string,
		private city: string,
		private uf: string,
		private complement: string | undefined,
		private reference: string | undefined
	) {}

	getId(): string {
		return this.id;
	}
	getUserId(): string {
		return this.userId;
	}
	getZipCode(): number {
		return this.zipCode;
	}
	getIdentification(): string {
		return this.identification;
	}
	getStreet(): string {
		return this.street;
	}
	getNumber(): number {
		return this.number;
	}
	getNeighborhood(): string {
		return this.neighborhood;
	}
	getCity(): string {
		return this.city;
	}
	getUf(): string {
		return this.uf;
	}
	getComplement(): string | undefined {
		return this.complement;
	}
	getReference(): string | undefined {
		return this.reference;
	}
}

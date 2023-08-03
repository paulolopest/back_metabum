export class Address {
	constructor(
		private id: string,
		private userId: string,
		private zipCode: number,
		private identification: string,
		private street: string,
		private number: number,
		private complement: string | null,
		private reference: string | null,
		private neighborhood: string,
		private city: string,
		private uf: string
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
	getComplement(): string | null {
		return this.complement;
	}
	getReference(): string | null {
		return this.reference;
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
}

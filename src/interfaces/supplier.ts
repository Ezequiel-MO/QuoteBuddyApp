export interface ISupplier {
	_id?: string
	name: string
	vendorId?: string
	VATNr?: string
	contactPerson?: string
	contactNumber?: string
	contactEmail?: string
	address?: string
	city?: string
	postalCode?: string
	IBAN?: string
	country?: string
	isDeleted: boolean
	softDelete: () => Promise<void>
}

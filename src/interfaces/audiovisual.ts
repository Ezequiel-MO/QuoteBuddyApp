export interface IAudiovisualEquipment {
	id?: string
	name: string
	quantity: number
	dailyRate?: number
	halfDayRate?: number
	setupCost?: number
	staffCost?: number
	transportationCost?: number
	notes?: string
}

export interface IAudiovisual {
	_id?: string
	name: string
	city: string
	textContent?: string
	suppliers?: string[]
	equipmentList: IAudiovisualEquipment[]
	imageContentUrl: string[]
	location: {
		type: string
		coordinates?: number[]
	}
}

export interface IGift {
	name: string
	qty: number
	price: number
	textContent: string
	imageContentUrl: string[]
	setImgUrl(files: { location: string }[]): void
}

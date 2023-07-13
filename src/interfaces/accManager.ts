export interface IAccManager {
	firstName: string
	familyName: string
	email: string
	imageContentUrl: string[]
	setImgUrl(files: { location: string }[]): void
}

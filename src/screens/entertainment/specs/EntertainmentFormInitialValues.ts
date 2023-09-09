import { IEntertainment } from 'src/interfaces/entertainment'

export const getInitialValues = (entertainmentShow: IEntertainment) => {
	return {
		vendor: entertainmentShow?.vendor ?? '',
		city: entertainmentShow?.city ?? '',
		name: entertainmentShow?.name ?? '',
		contact: entertainmentShow?.contact ?? '',
		email: entertainmentShow?.email ?? '',
		category: entertainmentShow?.category ?? '',
		duration: entertainmentShow?.duration ?? '',
		nrArtists: entertainmentShow?.nrArtists ?? '',
		textContent: entertainmentShow?.textContent ?? ''
	}
}

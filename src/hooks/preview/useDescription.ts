import { useCurrentProject } from 'src/hooks' //
import { IHotel, IEvent, IRestaurant, IEntertainment } from 'src/interfaces'

type Item = IHotel | IEvent | IRestaurant | IEntertainment

export const useDescription = (item: Item) => {
	const { currentProject } = useCurrentProject()
	const { languageVendorDescriptions } = currentProject
	let description = item.textContent ? item.textContent : ''

	if (languageVendorDescriptions === 'en') {
		return { description }
	}
	//check item.availableLanguages exists before accessing it

	if (
		item.availableLanguages &&
		item.availableLanguages.includes(languageVendorDescriptions)
	) {
		const descriptionsMap = new Map(Object.entries(item.descriptions))
		const text = descriptionsMap.get(languageVendorDescriptions)
		description = text ? String(text) : ''
		return { description }
	}
	return { description }
}

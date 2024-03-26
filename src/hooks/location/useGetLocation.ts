import { useFindByName } from '../useFindByName'
import { useGetLocations } from './useGetLocations'

export const useGetLocation = (locationName = 'Barcelona') => {
	const { locations } = useGetLocations()

	const { selectedOption, loading } =
		locations && useFindByName(locations, locationName)

	return {
		selectedOption,
		loading
	}
}

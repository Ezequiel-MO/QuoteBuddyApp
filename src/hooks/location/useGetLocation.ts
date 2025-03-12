import { useApiFetch } from '@hooks/fetchData'
import { ILocation } from '@interfaces/location'

export function useGetLocation(locationName: string) {
	const encodedLocationName = encodeURIComponent(locationName || '')
	const url = locationName ? `locations?name=${encodedLocationName}` : ''

	const { data: locations, isLoading } = useApiFetch<ILocation[]>(
		url,
		0,
		!!locationName
	)

	const selectedOption = locations && locations.length > 0 ? locations[0] : null

	return { selectedOption, loading: isLoading }
}

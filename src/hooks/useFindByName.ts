import { useState, useEffect } from 'react'
import { IEvent, IGift, IHotel, IRestaurant } from '../interfaces'
import { ILocation } from '../interfaces/location'

type IOption = IHotel | IEvent | IRestaurant | ILocation | IGift

interface UseFindByNameReturn {
	selectedOption?: IOption
	loading: boolean
}

export const useFindByName = (
	options: IOption[],
	name: string
): UseFindByNameReturn => {
	const [selectedOption, setSelectedOption] = useState<IOption | undefined>(
		options[0]
	)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const foundOption: IOption | undefined = options.find(
			(option) => option.name === name
		)
		if (foundOption) {
			setSelectedOption(foundOption)
		}
		setLoading(false)
	}, [name, options])

	return {
		selectedOption,
		loading
	}
}

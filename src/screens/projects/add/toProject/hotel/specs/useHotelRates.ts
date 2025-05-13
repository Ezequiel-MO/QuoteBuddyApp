/**
 * @file useHotelRates.ts
 * @description Custom hook to manage the state of hotel rates for a form.
 * It provides the rates object and a handler to update them.
 */

import { useState } from 'react'

import {
	IHotelPrice,
	EditableHotelPriceFieldKey
} from '../../../../../../interfaces'
import { starterHotelPrice } from '@constants/starterObjects'

/**
 * @interface UseHotelRatesReturn
 * @description Defines the shape of the object returned by the useHotelRates hook.
 * @property {IHotelPrice} hotelRates - The current state of the hotel rates, using the centrally defined IHotelPrice.
 * @property {(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void} handleChange - Function to handle changes in form inputs and update the hotelRates state.
 * @property {React.Dispatch<React.SetStateAction<IHotelPrice>>} setHotelRates - Setter function to directly update the hotel rates state if needed.
 */
export interface UseHotelRatesReturn {
	hotelRates: IHotelPrice
	handleChange: (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void
	setHotelRates: React.Dispatch<React.SetStateAction<IHotelPrice>>
}

/**
 * @constant initialHotelRates
 * @description The initial state for hotel rates, with all values set to 0.
 * Conforms to the IHotelPrice interface (excluding _id for initial form state,
 * though IHotelPrice allows _id to be optional).
 */
const initialHotelRates: IHotelPrice = {
	...starterHotelPrice
}

/**
 * @function useHotelRates
 * @description A custom React hook to manage and update hotel rates.
 * @returns {UseHotelRatesReturn} An object containing the `hotelRates` state (typed as IHotelPrice),
 * a `handleChange` function to update them, and `setHotelRates` for direct updates.
 *
 * @example
 * const { hotelRates, handleChange, setHotelRates } = useHotelRates();
 */
export const useHotelRates = (): UseHotelRatesReturn => {
	const [hotelRates, setHotelRates] = useState<IHotelPrice>(initialHotelRates)

	/**
	 * @function handleChange
	 * @description Handles input changes for hotel rate fields.
	 * It updates the corresponding field in the `hotelRates` state.
	 * Values are parsed as numbers. If parsing fails (e.g., for an empty or invalid string),
	 * it defaults to 0.
	 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} event - The input change event.
	 */
	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = event.target
		// Use the imported EditableHotelPriceFieldKey for stronger typing of fieldName
		const fieldName = name as EditableHotelPriceFieldKey

		// Parse the value to a number. If it's empty or invalid, default to 0.
		// This ensures that the state always holds numbers.
		const numericValue = value.trim() === '' ? 0 : parseFloat(value)
		const finalValue = isNaN(numericValue) ? 0 : numericValue

		setHotelRates((prevState) => ({
			...prevState,
			[fieldName]: finalValue
		}))
	}

	return { hotelRates, handleChange, setHotelRates }
}

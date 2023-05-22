import { useCallback } from 'react'
import {
	validateUpdate,
	validateUpdateImages,
	validateUpdateTextContent
} from '../screens/projects/render/hotel/hotelModal/helperHotelModal'

export const useModalValidation = ({
	isChecked,
	textContent,
	changedImages,
	originalImages
}) => {
	const validate = useCallback(() => {
		const validateIsChecked = validateUpdate(isChecked)
		const originalTextContent = textContent
			?.replace(/&lt;/g, '<')
			?.replace(/&gt;/g, '>')
		const validateChangedTextContent = validateUpdateTextContent(
			originalTextContent,
			textContent
		)
		const validateChangedImages = validateUpdateImages(
			originalImages,
			changedImages
		)
		return (
			validateIsChecked || validateChangedTextContent || validateChangedImages
		)
	}, [isChecked, textContent, changedImages, originalImages])

	return { validate }
}

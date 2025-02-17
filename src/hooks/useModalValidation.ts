import { useCallback } from 'react';
import {
	validateUpdate,
	validateUpdateImages,
	validateUpdateTextContent
} from '../screens/projects/render/hotel/hotelModal/helperHotelModal';


interface UseModalValidationProps {
	isChecked?: Record<string, any>;
	screenTextContent?: string;
	textContent?: string;
	changedImages?: string[];
	originalImages?: string[]
}


export const useModalValidation = ({
	isChecked = {},
	screenTextContent = '',
	textContent = '',
	changedImages = [],
	originalImages = []
}: UseModalValidationProps) => {
	const validate = useCallback(() => {
		const validateIsChecked = validateUpdate(isChecked);
		const originalTextContent = screenTextContent
			?.replace(/&lt;/g, '<')
			?.replace(/&gt;/g, '>');
		const validateChangedTextContent = validateUpdateTextContent(
			originalTextContent,
			textContent
		);
		const validateChangedImages = validateUpdateImages(
			originalImages,
			changedImages
		);
		return (validateIsChecked || validateChangedTextContent || validateChangedImages)
	}, [isChecked, textContent, changedImages, originalImages])

	return { validate }
}


/**
 * Checks if at least one checkbox is selected (true) in the provided object.
 * Useful for determining if any item in a group has been checked.
 *
 * @param isChecked - An object where keys are identifiers and values are booleans indicating checked state
 * @returns True if at least one value is true, false otherwise
 */
export function validateUpdate(isChecked: Record<string, boolean>): boolean {
	for (const key in isChecked) {
		if (isChecked[key] === true) {
			return true
		}
	}
	return false
}

/**
 * Determines if the text content has changed between the original and updated values.
 *
 * @param originalTextContent - The original string value before update
 * @param updateTextContent - The new string value after update
 * @returns True if the text content has changed, false otherwise
 */
export function validateUpdateTextContent(
	originalTextContent: string,
	updateTextContent: string
): boolean {
	return originalTextContent !== updateTextContent
}

/**
 * Checks if the images array has changed in length or content.
 *
 * @param originalImages - The original array of image URLs or identifiers
 * @param updateImages - The updated array of image URLs or identifiers
 * @returns True if the arrays differ in length or content, false otherwise
 */
export function validateUpdateImages(
	originalImages: string[],
	updateImages: string[]
): boolean {
	if (originalImages.length !== updateImages.length) {
		return true
	}
	return originalImages.some((el, index) => el !== updateImages[index])
}

/**
 * Modal style configuration for positioning and appearance.
 *
 * @remarks
 * This object is intended for use with Material-UI or similar modal components.
 */
export const styleModal: {
	position: 'absolute'
	top: string
	left: string
	transform: string
	width: string
	height: string
	bgcolor: string
	border: string
	boxShadow: number
	p: number
} = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	height: '90%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 2
}

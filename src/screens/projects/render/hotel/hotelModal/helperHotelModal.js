export function validateUpdate(isChecked) {
	for (let i in isChecked) {
		if (isChecked[i] === true) {
			return true
		}
	}
	return false
}

export function validateUpdateTextContent(
	originalTextContent,
	updateTextContent
) {
	return originalTextContent !== updateTextContent
}

export function validateUpdateImages(originalImages, updateImages) {
	if (originalImages.length !== updateImages.length) {
		return true
	}
	const areDifferent = originalImages.some(
		(el, index) => el !== updateImages[index]
	)
	return areDifferent
}

export const styleModal = {
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

export const hasMeaningfulText = (str?: string) => {
	if (!str) return false
	const textContent = str.replace(/<[^>]*>/g, '').trim()
	return textContent.length > 0
}

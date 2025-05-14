/**
 * Checks if the original text content and the updated text content are different.
 * Useful for determining if a text field has been modified in a form.
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

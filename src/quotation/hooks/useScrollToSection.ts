import { useRef, useCallback } from 'react'
import { useQuotation } from '../context/QuotationContext'

interface ScrollOptions {
	behavior?: ScrollBehavior
	offset?: number
	highlightDuration?: number
}

export const useScrollToSection = () => {
	const { state, dispatch } = useQuotation()
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const scrollToSection = useCallback(
		(sectionId: string, options: ScrollOptions = {}) => {
			const {
				behavior = 'smooth',
				offset = -100,
				highlightDuration = 1500
			} = options

			const element = document.getElementById(sectionId)

			if (element) {
				// Calculate position
				const elementPosition = element.getBoundingClientRect().top
				const offsetPosition = elementPosition + window.pageYOffset + offset

				// Perform scroll
				window.scrollTo({
					top: offsetPosition,
					behavior
				})

				// Update active section in context
				dispatch({ type: 'SET_ACTIVE_SECTION', payload: sectionId })
				dispatch({ type: 'MARK_SECTION_VISITED', payload: sectionId })

				// Add a temporary highlight class and remove it after a delay
				element.classList.add('section-highlight')

				// Clear previous timeout if it exists
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current)
				}

				// Set new timeout to remove highlight
				timeoutRef.current = setTimeout(() => {
					element.classList.remove('section-highlight')
				}, highlightDuration)
			}
		},
		[dispatch]
	)

	return scrollToSection
}

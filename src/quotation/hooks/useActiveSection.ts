import { useEffect } from 'react'
import { useQuotation } from '../context/QuotationContext'

export const useActiveSection = (sectionIds: string[]) => {
	const { dispatch } = useQuotation()

	useEffect(() => {
		// Observe all sections for intersection with the viewport
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// If section is at least 30% visible in viewport
					if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
						dispatch({
							type: 'SET_ACTIVE_SECTION',
							payload: entry.target.id
						})
					}
				})
			},
			{
				rootMargin: '-10% 0px -70% 0px', // Adjust these values to define the "active" region
				threshold: [0.3, 0.5, 0.7] // Multiple thresholds for better accuracy
			}
		)

		// Observe all section elements
		sectionIds.forEach((id) => {
			const element = document.getElementById(id)
			if (element) {
				observer.observe(element)
			}
		})

		// Track scroll progress
		const handleScroll = () => {
			sectionIds.forEach((id) => {
				const element = document.getElementById(id)
				if (element) {
					const rect = element.getBoundingClientRect()
					const windowHeight = window.innerHeight

					// Calculate progress through section (0-100%)
					if (rect.height > 0) {
						let progress = 0

						// If element is above viewport
						if (rect.bottom <= 0) {
							progress = 100
						}
						// If element is below viewport
						else if (rect.top >= windowHeight) {
							progress = 0
						}
						// If element is partially visible
						else if (rect.top < 0) {
							progress = Math.min(100, (Math.abs(rect.top) / rect.height) * 100)
						} else {
							progress = Math.min(
								100,
								((windowHeight - rect.top) / rect.height) * 100
							)
						}

						dispatch({
							type: 'SET_SECTION_PROGRESS',
							payload: {
								section: id,
								progress: Math.round(progress)
							}
						})
					}
				}
			})
		}

		window.addEventListener('scroll', handleScroll)

		// Cleanup
		return () => {
			sectionIds.forEach((id) => {
				const element = document.getElementById(id)
				if (element) {
					observer.unobserve(element)
				}
			})
			window.removeEventListener('scroll', handleScroll)
		}
	}, [sectionIds, dispatch])
}

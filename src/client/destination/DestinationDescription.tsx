import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ILocation } from '../../interfaces/location'

interface DestinationDescriptionProps {
	locationObj: ILocation
}

export const DestinationDescription: React.FC<DestinationDescriptionProps> = ({
	locationObj
}) => {
	const [textArray, setTextArray] = useState<string[]>([])
	const [isExpanded, setIsExpanded] = useState(false)
	const { textContent, name } = locationObj || {}

	// Parse text content from HTML
	useEffect(() => {
		if (!textContent) return

		try {
			const parser = new DOMParser()
			const htmlDoc = parser.parseFromString(
				decodeURIComponent(textContent),
				'text/html'
			)
			const paragraphs = htmlDoc.getElementsByTagName('p')

			let texts: string[] = []
			for (let i = 0; i < paragraphs.length; i++) {
				let paragraphText = paragraphs[i].innerText.trim()
				// Highlight keywords in uppercase
				paragraphText = paragraphText.replace(
					/\b([A-Z]{2,})\b/g,
					'<span class="font-bold text-indigo-600 dark:text-indigo-400">$1</span>'
				)
				texts.push(paragraphText)
			}
			setTextArray(texts)
		} catch (error) {
			console.error('Error parsing destination description:', error)
			// Fallback if parsing fails
			setTextArray([textContent])
		}
	}, [textContent])

	// Calculate whether we need to show "Read More"
	// Only show for more than 2 paragraphs
	const needsExpansion = textArray.length > 2

	// Determine which paragraphs to show
	const visibleParagraphs =
		needsExpansion && !isExpanded ? textArray.slice(0, 2) : textArray

	return (
		<div className="w-full">
			{/* Section Header */}
			<div className="bg-gradient-to-r from-orange-600 to-slate-700 text-white-0 p-6">
				<div className="container mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold flex items-center">
						<Icon icon="mdi:information-outline" className="w-8 h-8 mr-3" />
						<span>{name || 'Destination'} Overview</span>
					</h2>
				</div>
			</div>

			{/* Content */}
			<div className="p-6 md:p-8">
				<div className="max-w-4xl mx-auto">
					{visibleParagraphs.length > 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="space-y-6"
						>
							{visibleParagraphs.map((text, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
								>
									<p
										className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 first-letter:text-3xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-indigo-500"
										dangerouslySetInnerHTML={{ __html: text }}
									/>
								</motion.div>
							))}

							{/* Read More / Read Less button */}
							{needsExpansion && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
									className="mt-4 text-center"
								>
									<button
										onClick={() => setIsExpanded(!isExpanded)}
										className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-200"
									>
										<span>{isExpanded ? 'Show Less' : 'Read More'}</span>
										<Icon
											icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
											className="ml-2 w-5 h-5"
										/>
									</button>
								</motion.div>
							)}
						</motion.div>
					) : (
						<div className="text-center py-10">
							<Icon
								icon="mdi:text-box-outline"
								className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
							/>
							<p className="text-gray-500 dark:text-gray-400">
								No description available for this destination.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default DestinationDescription

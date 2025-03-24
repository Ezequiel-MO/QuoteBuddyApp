import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ILocation } from '../../interfaces/location'

interface Props {
	locationObj: ILocation
}

// Icons that best represent common fact categories
const factIcons: { [key: string]: string } = {
	// Geography related
	population: 'mdi:account-group',
	area: 'mdi:map-marker-radius',
	language: 'mdi:translate',
	currency: 'mdi:currency-usd',
	timezone: 'mdi:clock-time-eight',
	// Tourism related
	attractions: 'mdi:star-circle',
	hotels: 'mdi:bed',
	restaurants: 'mdi:silverware-fork-knife',
	activities: 'mdi:hiking',
	events: 'mdi:calendar-star',
	// Business related
	industries: 'mdi:factory',
	economy: 'mdi:chart-line',
	companies: 'mdi:office-building',
	infrastructure: 'mdi:road-variant',
	transportation: 'mdi:train-car',
	// Default icon
	default: 'mdi:information'
}

// Function to determine the best icon for a fact based on its title
const getFactIcon = (title: string): string => {
	const lowerTitle = title.toLowerCase()

	// Check if title contains any of our keywords
	for (const [key, icon] of Object.entries(factIcons)) {
		if (lowerTitle.includes(key)) {
			return icon
		}
	}

	return factIcons.default
}

export const DestinationFacts: React.FC<Props> = ({ locationObj }) => {
	const { inFigures, name } = locationObj || {}

	// Animation variants for the container
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	}

	// Animation variants for each fact card
	const factVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 25
			}
		}
	}

	return (
		<div className="w-full">
			{/* Section Header */}
			<div className="bg-gradient-to-r from-slate-600 to-slate-800 text-white-0 p-6">
				<div className="container mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold flex items-center">
						<Icon icon="mdi:list-box-outline" className="w-8 h-8 mr-3" />
						<span>{name || 'Destination'} Key Facts</span>
					</h2>
				</div>
			</div>

			{/* Content */}
			<div className="p-6 md:p-8">
				{inFigures && inFigures.length > 0 ? (
					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.1 }}
					>
						{inFigures.map((fact, index) => (
							<motion.div
								key={index}
								variants={factVariants}
								className="bg-white-0 dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-600"
							>
								<div className="bg-gradient-to-br from-indigo-50/10 to-indigo-50/5 dark:from-gray-800 dark:to-gray-700 p-4 flex gap-4 items-start">
									<div className="bg-orange-500 text-white-0 p-3 rounded-lg shadow-md">
										<Icon icon={getFactIcon(fact.title)} className="w-6 h-6" />
									</div>

									<div className="flex-1">
										<h3 className="font-semibold text-lg text-gray-800 dark:text-white-0 mb-1">
											{fact.title}
										</h3>
										<p className="text-gray-600 dark:text-gray-300">
											{fact.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				) : (
					<div className="text-center py-10">
						<Icon
							icon="mdi:information-outline"
							className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
						/>
						<p className="text-gray-500 dark:text-gray-400">
							No key facts available for this destination.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default DestinationFacts

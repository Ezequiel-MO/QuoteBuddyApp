import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Spinner } from '@components/atoms'
import { useCurrentProject, useGetLocation } from '../../hooks'
import { ILocation } from '../../interfaces/location'
import { IProject } from '@interfaces/project'
import DestinationHeader from './DestinationHeader'
import DestinationDescription from './DestinationDescription'
import DestinationFacts from './DestinationFacts'
import DestinationTable from './DestinationTable'
import DestinationGallery from './DestinationGallery'
import { Icon } from '@iconify/react'

// Animation variants for staggered children
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1
		}
	}
}

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 25
		}
	}
}

export const Destination: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { groupLocation } = currentProject || {}
	const { selectedOption, loading } = useGetLocation(groupLocation)
	const [activeSection, setActiveSection] = useState<string | null>(null)

	// Loading state with animated spinner
	if (loading || !selectedOption || !selectedOption?.imageContentUrl) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
				<Spinner />
				<p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
					Loading destination information...
				</p>
			</div>
		)
	}

	// Navigation links for sections
	const sections = [
		{ id: 'overview', name: 'Overview', icon: 'mdi:information-outline' },
		{ id: 'facts', name: 'Key Facts', icon: 'mdi:list-box-outline' },
		{ id: 'details', name: 'Event Details', icon: 'mdi:calendar-check' },
		{ id: 'gallery', name: 'Gallery', icon: 'mdi:image-multiple-outline' }
	]

	return (
		<div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
			{/* Hero Header */}
			<DestinationHeader
				groupLocation={groupLocation}
				imageUrl={selectedOption.imageContentUrl[0]}
			/>

			{/* Section Navigation */}
			<div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md py-2 px-4 mb-6">
				<div className="container mx-auto">
					<nav className="flex overflow-x-auto hide-scrollbar">
						{sections.map((section) => (
							<a
								key={section.id}
								href={`#${section.id}`}
								className={`flex items-center px-4 py-2 mx-1 whitespace-nowrap rounded-lg text-sm font-medium transition-all ${
									activeSection === section.id
										? 'bg-indigo-500 text-white'
										: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
								}`}
								onClick={() => setActiveSection(section.id)}
							>
								<Icon icon={section.icon} className="mr-2 h-5 w-5" />
								{section.name}
							</a>
						))}
					</nav>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 pb-16">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="space-y-12"
				>
					{/* Overview Section */}
					<motion.section
						id="overview"
						variants={itemVariants}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
					>
						<DestinationDescription locationObj={selectedOption as ILocation} />
					</motion.section>

					{/* Facts Section */}
					<motion.section
						id="facts"
						variants={itemVariants}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
					>
						<DestinationFacts locationObj={selectedOption as ILocation} />
					</motion.section>

					{/* Details Section */}
					<motion.section
						id="details"
						variants={itemVariants}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
					>
						<DestinationTable locationObj={selectedOption as ILocation} />
					</motion.section>

					{/* Gallery Section */}
					<motion.section
						id="gallery"
						variants={itemVariants}
						className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
					>
						<DestinationGallery images={selectedOption.imageContentUrl} />
					</motion.section>
				</motion.div>
			</div>

			{/* Floating scroll to top button */}
			<button
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className="fixed bottom-8 right-8 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 z-10"
				aria-label="Scroll to top"
			>
				<Icon icon="mdi:arrow-up" className="w-6 h-6" />
			</button>
		</div>
	)
}

export default Destination

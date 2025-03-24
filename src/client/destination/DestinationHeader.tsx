import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

interface Props {
	groupLocation: string
	imageUrl?: string
}

export const DestinationHeader: React.FC<Props> = ({
	groupLocation,
	imageUrl
}) => {
	const [offset, setOffset] = useState(0)

	// Parallax effect on scroll
	useEffect(() => {
		const handleScroll = () => {
			setOffset(window.pageYOffset)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className="relative w-full h-96 sm:h-[450px] md:h-[500px] overflow-hidden">
			{/* Background Image with Parallax Effect - improved for dark mode */}
			<div
				className="absolute inset-0 bg-cover bg-center z-0"
				style={{
					backgroundImage: `url(${imageUrl || '/api/placeholder/1000/500'})`,
					transform: `translateY(${offset * 0.4}px)`,
					// Adjusted brightness to be lighter in dark mode
					filter: 'brightness(0.85)'
				}}
			/>

			{/* Content Container with Background for Better Text Readability */}
			<div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl backdrop-blur-sm bg-black/10 dark:bg-black/5 p-6 sm:p-8 rounded-2xl shadow-lg"
				>
					<motion.h1
						className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white-0 drop-shadow-lg"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						// Added strong text shadow for better contrast
						style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
					>
						{groupLocation}
					</motion.h1>

					<motion.div
						className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<div className="flex items-center bg-indigo-600/90 dark:bg-orange-500/90 text-white-0 px-4 py-2 rounded-full shadow-md">
							<Icon icon="mdi:map-marker" className="w-6 h-6 mr-2" />
							<span className="text-lg font-medium">
								Corporate Events Destination
							</span>
						</div>

						<div className="hidden sm:flex items-center bg-pink-600/90 dark:bg-pink-500/90 text-white-0 px-4 py-2 rounded-full shadow-md">
							<Icon icon="mdi:star" className="w-6 h-6 mr-2" />
							<span className="text-lg font-medium">Premium Experience</span>
						</div>
					</motion.div>

					<motion.p
						className="text-lg md:text-xl max-w-2xl mx-auto text-white-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						// Added text shadow for better contrast
						style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
					>
						Discover the perfect setting for your next corporate event
					</motion.p>
				</motion.div>

				{/* Scroll Indicator - improved visibility */}
				<motion.div
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
				>
					<div className="bg-indigo-500/80 p-2 rounded-full shadow-lg">
						<Icon icon="mdi:chevron-down" className="w-8 h-8 text-white-0" />
					</div>
				</motion.div>
			</div>
		</div>
	)
}

export default DestinationHeader

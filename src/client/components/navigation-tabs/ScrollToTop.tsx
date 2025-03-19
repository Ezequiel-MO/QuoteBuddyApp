import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useDarkMode } from 'src/hooks'

interface ScrollToTopProps {
	showAfterHeight?: number // When to show the button (in pixels)
	animation?: 'fade' | 'slide' // Animation style
	hideOnMobile?: boolean // Whether to hide on mobile
	color?: string // Custom color (overrides theme)
	size?: 'small' | 'medium' | 'large' // Size of the button
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
	showAfterHeight = 300,
	animation = 'fade',
	hideOnMobile = true,
	color,
	size = 'medium'
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)
	const [isDarkMode] = useDarkMode()

	// Default theme colors based on the current theme
	const themeColor = isDarkMode ? '#ea5933' : '#ea5933' // Orange from your theme
	const finalColor = color || themeColor

	// Calculate scroll progress and visibility
	useEffect(() => {
		const handleScroll = () => {
			// Get current scroll position
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop

			// Calculate if we should show the button
			setIsVisible(scrollTop > showAfterHeight)

			// Calculate scroll progress percentage
			const scrollHeight =
				document.documentElement.scrollHeight - window.innerHeight
			const progress = scrollTop / scrollHeight
			setScrollProgress(progress)
		}

		// Add scroll listener
		window.addEventListener('scroll', handleScroll)

		// Initial check
		handleScroll()

		// Clean up
		return () => window.removeEventListener('scroll', handleScroll)
	}, [showAfterHeight])

	// Smooth scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	// Animation variants
	const buttonVariants = {
		hidden: animation === 'fade' ? { opacity: 0 } : { opacity: 0, y: 20 },
		visible: animation === 'fade' ? { opacity: 1 } : { opacity: 1, y: 0 },
		exit: animation === 'fade' ? { opacity: 0 } : { opacity: 0, y: 20 }
	}

	// Size variations for the button
	const sizeMap = {
		small: {
			buttonSize: 'p-2',
			svgSize: 'w-8 h-8',
			iconSize: 'w-4 h-4',
			radius: 15,
			strokeWidth: 2
		},
		medium: {
			buttonSize: 'p-3',
			svgSize: 'w-10 h-10',
			iconSize: 'w-5 h-5',
			radius: 18,
			strokeWidth: 2.5
		},
		large: {
			buttonSize: 'p-4',
			svgSize: 'w-12 h-12',
			iconSize: 'w-6 h-6',
			radius: 22,
			strokeWidth: 3
		}
	}

	const sizeConfig = sizeMap[size]

	// Circle circumference for progress indicator
	const circleCircumference = 2 * Math.PI * sizeConfig.radius
	const strokeDashoffset = circleCircumference * (1 - scrollProgress)

	// Hide on mobile if specified
	const responsiveClasses = hideOnMobile ? 'hidden md:block' : 'block'

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className={`fixed bottom-20 right-4 z-40 ${responsiveClasses}`}
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={buttonVariants}
					transition={{
						duration: 0.3,
						type: 'spring',
						stiffness: 300,
						damping: 25
					}}
				>
					<button
						onClick={scrollToTop}
						className={`relative rounded-full bg-white dark:bg-gray-800 shadow-lg focus:outline-none group ${sizeConfig.buttonSize}`}
						aria-label="Scroll to top"
					>
						{/* Progress circle */}
						<svg
							className={`absolute top-0 left-0 transform -rotate-90 ${sizeConfig.svgSize}`}
							viewBox={`0 0 ${sizeConfig.radius * 2 + 10} ${
								sizeConfig.radius * 2 + 10
							}`}
						>
							<circle
								cx={sizeConfig.radius + 5}
								cy={sizeConfig.radius + 5}
								r={sizeConfig.radius}
								fill="none"
								stroke={isDarkMode ? '#444' : '#eee'}
								strokeWidth={sizeConfig.strokeWidth - 0.5}
							/>
							<circle
								cx={sizeConfig.radius + 5}
								cy={sizeConfig.radius + 5}
								r={sizeConfig.radius}
								fill="none"
								stroke={finalColor}
								strokeWidth={sizeConfig.strokeWidth}
								strokeDasharray={circleCircumference}
								strokeDashoffset={strokeDashoffset}
								strokeLinecap="round"
								className="transition-all duration-300 ease-out"
							/>
						</svg>

						{/* Icon */}
						<motion.div
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.9 }}
							className="relative z-10"
						>
							<Icon
								icon="heroicons:arrow-up"
								className={`${sizeConfig.iconSize} text-gray-700 dark:text-gray-200 group-hover:text-orange-500`}
							/>
						</motion.div>
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default ScrollToTop

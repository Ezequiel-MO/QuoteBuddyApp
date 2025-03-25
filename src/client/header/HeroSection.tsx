import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCurrentProject } from 'src/hooks'

const HeroSection = () => {
	const { currentProject } = useCurrentProject()
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start']
	})

	// Parallax effect values
	const y = useTransform(scrollYProgress, [0, 1], [0, 300])
	const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

	// Get the first image from the project for the background
	const backgroundImage =
		currentProject.imageContentUrl?.[0] ||
		currentProject.hotels?.[0]?.imageContentUrl?.[0]

	return (
		<div
			ref={ref}
			className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
		>
			{/* Background Image with Parallax */}
			<motion.div
				className="absolute inset-0 w-full h-full"
				style={{
					y,
					backgroundImage: `url(${
						backgroundImage || '/placeholder-destination.jpg'
					})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					filter: 'brightness(0.7)'
				}}
			/>

			{/* Overlay gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />

			{/* Content */}
			<motion.div
				className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
				style={{ opacity }}
			>
				<motion.h1
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-4xl md:text-5xl lg:text-6xl font-bold text-white-0 mb-4"
				>
					{currentProject.groupName}
				</motion.h1>

				<motion.div
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="text-xl md:text-2xl text-white-0 max-w-3xl"
				>
					{currentProject.groupLocation} • {currentProject.arrivalDay} to{' '}
					{currentProject.departureDay}
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				animate={{
					y: [0, 10, 0],
					opacity: [0.3, 1, 0.3]
				}}
				transition={{
					repeat: Infinity,
					duration: 2
				}}
			>
				<svg
					className="w-8 h-8 text-white-0"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</motion.div>
		</div>
	)
}

export default HeroSection

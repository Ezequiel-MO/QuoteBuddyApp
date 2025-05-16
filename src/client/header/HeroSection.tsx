import { useRef, useEffect } from 'react' // Added useEffect
import { motion, useScroll, useTransform } from 'framer-motion'
import { useCurrentProject, useGetLocation } from 'src/hooks' // Assuming these are your custom hooks

// --- IMPORTANT: Define the start and end times for your video segment here ---
const VIDEO_SEGMENT_START_SECONDS = 5
const VIDEO_SEGMENT_END_SECONDS = 17
// --- Adjust the values above to match the desired portion of your video ---

const HeroSection = () => {
	const { currentProject } = useCurrentProject()
	const { selectedOption } = useGetLocation(currentProject?.groupLocation)
	const sectionRef = useRef(null) // Ref for the main section div (for scroll)
	const videoRef = useRef<HTMLVideoElement>(null) // Ref for the video element

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start']
	})

	const y = useTransform(scrollYProgress, [0, 1], [0, 300])
	const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

	const videoUrl = selectedOption?.heroVideoUrl
	const imageFallbackUrl =
		selectedOption?.imageContentUrl?.[0] ||
		currentProject?.hotels?.[0]?.imageContentUrl?.[0] ||
		'/placeholder-destination.jpg'

	useEffect(() => {
		const videoElement = videoRef.current
		if (videoElement && videoUrl) {
			const handleTimeUpdate = () => {
				if (videoElement.currentTime >= VIDEO_SEGMENT_END_SECONDS) {
					videoElement.currentTime = VIDEO_SEGMENT_START_SECONDS
					videoElement
						.play()
						.catch((error) =>
							console.error('Error trying to play video in loop:', error)
						)
				}
				// Optional: If video somehow seeks before start, force it to start
				// else if (videoElement.currentTime < VIDEO_SEGMENT_START_SECONDS) {
				//   videoElement.currentTime = VIDEO_SEGMENT_START_SECONDS;
				// }
			}

			const handleLoadedMetadata = () => {
				// Start the video from the defined segment start time
				videoElement.currentTime = VIDEO_SEGMENT_START_SECONDS
				videoElement
					.play()
					.catch((error) =>
						console.error('Error trying to play video initially:', error)
					)
			}

			videoElement.addEventListener('timeupdate', handleTimeUpdate)
			videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
			// Attempt to play when component mounts and video is ready
			// videoElement.play().catch(error => console.error("Error attempting to play video on mount:", error));

			return () => {
				// Cleanup: remove event listeners when component unmounts or videoUrl changes
				videoElement.removeEventListener('timeupdate', handleTimeUpdate)
				videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
			}
		}
	}, [videoUrl]) // Re-run effect if videoUrl changes

	return (
		<div
			ref={sectionRef} // Changed from ref to sectionRef for clarity
			className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden"
		>
			{videoUrl ? (
				<motion.video
					ref={videoRef} // Assign ref to the video element
					className="absolute inset-0 w-full h-full object-cover"
					style={{
						y,
						filter: 'brightness(0.7)'
					}}
					src={videoUrl}
					muted // Muted is essential for autoplay in most browsers
					loop={false} // Disable native loop, we are handling it manually for the segment
					autoPlay // Autoplay will attempt to play, might be overridden by loadedmetadata handler
					playsInline
					poster={imageFallbackUrl}
					key={videoUrl} // Important for re-initialization if URL changes
					onCanPlay={() => {
						// Ensure video starts at the correct segment point
						if (
							videoRef.current &&
							videoRef.current.currentTime < VIDEO_SEGMENT_START_SECONDS
						) {
							videoRef.current.currentTime = VIDEO_SEGMENT_START_SECONDS
						}
						videoRef.current
							?.play()
							.catch((error) => console.error('Error in onCanPlay:', error))
					}}
				>
					Your browser does not support the video tag.
				</motion.video>
			) : (
				<motion.div
					className="absolute inset-0 w-full h-full"
					style={{
						y,
						backgroundImage: `url(${imageFallbackUrl})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						filter: 'brightness(0.7)'
					}}
				/>
			)}

			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />

			<motion.div
				className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
				style={{ opacity: contentOpacity }}
			>
				<motion.h1
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-4xl md:text-5xl lg:text-6xl font-bold text-white-0 mb-4"
				>
					{currentProject?.groupName || 'Event Title'}
				</motion.h1>

				<motion.div
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="text-xl md:text-2xl text-white-0 max-w-3xl"
				>
					{currentProject?.groupLocation || 'Location'} •{' '}
					{currentProject?.arrivalDay || 'Start Date'} to{' '}
					{currentProject?.departureDay || 'End Date'}
				</motion.div>
			</motion.div>

			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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

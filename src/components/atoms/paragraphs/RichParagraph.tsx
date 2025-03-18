import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { IClientCompany } from '@interfaces/clientCompany'
import { IProject } from '@interfaces/project'
import { useCurrentProject, useFontFamily } from 'src/hooks'
import { AnimatePresence, motion } from 'framer-motion' // If available

interface RichParagraphProps {
	text: string
	isActive?: boolean
}

export const RichParagraph: React.FC<RichParagraphProps> = ({
	text = '',
	isActive = true
}) => {
	const [isCopied, setIsCopied] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [canReadMore, setCanReadMore] = useState(false)

	if (!text) {
		return null
	}

	// Extract necessary data from hooks
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientCompany } = currentProject as {
		clientCompany: IClientCompany[]
	}

	const ref = useRef<HTMLDivElement>(null)

	// Clean HTML entities from the text
	const cleanedText = text
		.replace(/\\/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')

	// Ensure all links in the content open in a new tab and style specific links
	useEffect(() => {
		if (ref.current) {
			const elements = ref.current.querySelectorAll('*')
			elements.forEach((element: Element) => {
				element.classList.add('dark:text-white-0')
				if (element.tagName === 'A') {
					element.setAttribute('target', '_blank')
					element.setAttribute('rel', 'noopener noreferrer')
					element.classList.add(
						'text-orange-500',
						'hover:text-orange-600',
						'transition-colors',
						'duration-200'
					)

					if (element.textContent === 'VIRTUAL VISIT') {
						element.classList.add(
							'inline-flex',
							'items-center',
							'gap-1',
							'font-medium',
							'underline'
						)
						// Add icon to virtual visit links
						const icon = document.createElement('span')
						icon.innerHTML =
							'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12L13 4V8C13 8 4 9.5 4 19.5C4 19.5 7.5 14 13 14V18L21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
						icon.className = 'inline-block'
						element.appendChild(icon)
					}
				}
			})
		}
	}, [cleanedText])

	// Check if text exceeds 4 lines whenever the component becomes active
	useEffect(() => {
		if (ref.current) {
			const checkCanReadMore = () => {
				const computedStyle = window.getComputedStyle(ref.current!)
				const lineHeight = parseFloat(computedStyle.lineHeight!)
				const maxHeight = lineHeight * 4
				const actualHeight = ref.current!.scrollHeight

				setCanReadMore(actualHeight > maxHeight)
			}

			checkCanReadMore()
		}
	}, [isActive, cleanedText, isExpanded])

	// Handle text copy functionality
	const handleCopyClick = async () => {
		if (ref.current) {
			const textToCopy = ref.current.innerText || ''
			try {
				await navigator.clipboard.writeText(textToCopy)
				setIsCopied(true)
				setTimeout(() => {
					setIsCopied(false)
				}, 2000)
			} catch (err) {
				console.error('Failed to copy text: ', err)
			}
		}
	}

	// Handle read more / read less toggle
	const toggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation() // Prevent triggering the copy
		setIsExpanded(!isExpanded)
	}

	// Animation variants for framer-motion
	const containerVariants = {
		normal: {
			backgroundColor: 'rgba(249, 250, 251, 0)',
			boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
		},
		hovered: {
			backgroundColor: 'rgba(249, 250, 251, 0.8)',
			boxShadow:
				'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
		}
	}

	const copyButtonVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
	}

	const copyIconVariants = {
		initial: { scale: 1 },
		copied: { scale: [1, 1.5, 1], transition: { duration: 0.5 } }
	}

	const MotionComponent = motion ? motion.div : 'div'

	return (
		<MotionComponent
			className="relative rounded-lg transition-all duration-300 dark:bg-gray-800/50 p-5 group"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			variants={containerVariants}
			initial="normal"
			animate={isHovered ? 'hovered' : 'normal'}
			onClick={handleCopyClick}
		>
			{/* Text Content */}
			<div
				ref={ref}
				className={`prose prose-orange prose-lg max-w-none dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 ${
					!isExpanded ? 'line-clamp-4' : ''
				} w-full leading-relaxed`}
				dangerouslySetInnerHTML={{ __html: cleanedText }}
				aria-expanded={isExpanded}
			></div>

			{/* "Read More..." / "Read Less" Button */}
			{canReadMore && (
				<button
					className="mt-3 text-orange-500 hover:text-orange-600 flex items-center gap-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md px-2 py-1 transition-all duration-200"
					onClick={toggleExpand}
					aria-expanded={isExpanded}
				>
					{isExpanded ? (
						<>
							<span>Read Less</span>
							<Icon icon="mdi:chevron-up" width={16} height={16} />
						</>
					) : (
						<>
							<span>Read More</span>
							<Icon icon="mdi:chevron-down" width={16} height={16} />
						</>
					)}
				</button>
			)}

			{/* Copy Button */}
			<AnimatePresence>
				{isHovered && (
					<MotionComponent
						className="absolute top-2 right-2 z-10"
						variants={copyButtonVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<button
							onClick={(e) => {
								e.stopPropagation() // Prevent triggering the main copy handler
								handleCopyClick()
							}}
							className="flex items-center gap-1.5 py-1.5 px-3 bg-gray-800 dark:bg-gray-700 text-white-0 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 shadow-md"
							aria-label="Copy text to clipboard"
							title="Copy to clipboard"
						>
							<MotionComponent
								variants={copyIconVariants}
								animate={isCopied ? 'copied' : 'initial'}
							>
								<Icon
									icon={isCopied ? 'mdi:check-bold' : 'mdi:content-copy'}
									className={isCopied ? 'text-green-400' : 'text-white-0'}
									width="16"
									height="16"
								/>
							</MotionComponent>
							<span className="text-xs font-medium">
								{isCopied ? 'Copied!' : 'Copy'}
							</span>
						</button>
					</MotionComponent>
				)}
			</AnimatePresence>

			{/* Success Indicator (subtle) */}
			{isCopied && (
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white-0 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
					<Icon icon="mdi:check-circle" width={20} height={20} />
					<span className="font-medium text-sm">Text copied to clipboard!</span>
				</div>
			)}
		</MotionComponent>
	)
}

export default RichParagraph

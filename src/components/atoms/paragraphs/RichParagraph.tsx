// RichParagraph.tsx

import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { IClientCompany } from '@interfaces/clientCompany'
import { IProject } from '@interfaces/project'
import { useCurrentProject, useFontFamily } from 'src/hooks'

interface RichParagraphProps {
	text: string
}

export const RichParagraph: React.FC<RichParagraphProps> = ({ text = '' }) => {
	const [isCopied, setIsCopied] = useState(false)
	const [showAnimation, setShowAnimation] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [, setShowTooltip] = useState(false)
	const [canReadMore, setCanReadMore] = useState(false)

	if (!text) {
		return null
	}

	// Extract necessary data from hooks
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientCompany } = currentProject as {
		clientCompany: IClientCompany[]
	}
	const { fonts = [] } = clientCompany[0] as IClientCompany

	const ref = useRef<HTMLDivElement>(null)
	const fontFamilyStyle = useFontFamily(fonts[0])

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

					if (element.textContent === 'VIRTUAL VISIT') {
						element.classList.add('text-blue-500', 'underline')
					}
				}
			})

			// Check if text exceeds 4 lines
			const checkCanReadMore = () => {
				if (ref.current) {
					const computedStyle = window.getComputedStyle(ref.current)
					const lineHeight = parseFloat(computedStyle.lineHeight)
					const maxHeight = lineHeight * 4
					const actualHeight = ref.current.scrollHeight
					setCanReadMore(actualHeight > maxHeight)
				}
			}

			checkCanReadMore()
		}
	}, [cleanedText])

	// Handle text copy functionality
	const handleCopyClick = async () => {
		if (ref.current) {
			const textToCopy = ref.current.innerText || ''
			try {
				await navigator.clipboard.writeText(textToCopy)
				setIsCopied(true)
				setShowAnimation(true)
				setShowTooltip(true)
				setTimeout(() => {
					setIsCopied(false)
					setShowAnimation(false)
					setShowTooltip(false)
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

	return (
		<div className="relative group my-5 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:border-white-0 dark:hover:border-dashed dark:hover:cursor-pointer p-4 rounded-lg">
			{/* Text Content */}
			<div
				ref={ref}
				className={`${fontFamilyStyle} text-base md:text-lg lg:text-xl leading-relaxed dark:text-white-0 ${
					!isExpanded ? 'line-clamp-4' : ''
				}`}
				dangerouslySetInnerHTML={{ __html: cleanedText }}
				onClick={handleCopyClick} // Allow clicking on the text to copy
			></div>

			{/* "Read More..." / "Read Less" Button */}
			{canReadMore && (
				<button
					className="text-orange-500 hover:underline mt-2"
					onClick={toggleExpand}
				>
					{isExpanded ? 'Read Less...' : 'Read More...'}
				</button>
			)}

			{/* Copy Button - Detached from Text Content */}
			<div className="absolute -top-10 right-2">
				<button
					onClick={(e) => {
						e.stopPropagation() // Prevent triggering the main copy handler
						handleCopyClick()
					}}
					className="flex items-center space-x-1 p-2 bg-gray-700 text-white-0 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none"
				>
					<Icon
						icon={isCopied ? 'akar-icons:check' : 'mdi:content-copy'}
						color={isCopied ? 'green' : 'white'}
						width="20"
						height="20"
					/>
					{!isCopied ? (
						<span className="text-sm">Copy Text</span>
					) : (
						<span className="text-sm">Text Copied</span>
					)}
				</button>
			</div>

			{/* Copy Animation */}
			{showAnimation && (
				<div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-75 rounded-lg pointer-events-none">
					<Icon icon="akar-icons:check" color="white" width="48" height="48" />
				</div>
			)}
		</div>
	)
}

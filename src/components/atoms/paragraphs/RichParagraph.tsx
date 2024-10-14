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

	if (!text) {
		return null
	}

	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientCompany } = currentProject as {
		clientCompany: IClientCompany[]
	}
	const { fonts = [] } = clientCompany[0] as IClientCompany

	const ref = useRef<HTMLDivElement>(null)
	const fontFamilyStyle = useFontFamily(fonts[0])

	const decodeHtmlEntities = (str: string) => {
		const textarea = document.createElement('textarea')
		textarea.innerHTML = str
		return textarea.value
	}

	const decodedText = decodeHtmlEntities(text)

	const cleanedText = decodedText
		.replace(/\\/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')

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
		}
	}, [cleanedText])

	const handleCopyClick = async () => {
		if (ref.current) {
			const range = document.createRange()
			range.selectNode(ref.current)
			window.getSelection()?.removeAllRanges()
			window.getSelection()?.addRange(range)

			try {
				const textToCopy = window.getSelection()?.toString() || ''
				await navigator.clipboard.writeText(textToCopy)
				setIsCopied(true)
				setShowAnimation(true)
				setTimeout(() => {
					setIsCopied(false)
					setShowAnimation(false)
				}, 2000)
			} catch (err) {
				console.error('Failed to copy text: ', err)
			}

			window.getSelection()?.removeAllRanges()
		}
	}

	return (
		<div
			className="group relative my-5 transition duration-300 ease-in-out hover:border hover:border-gray-300 dark:bg-gray-700 dark:hover:border-white-0 dark:hover:border-dashed dark:hover:cursor-pointer"
			onClick={handleCopyClick}
		>
			<div
				ref={ref}
				className={`${fontFamilyStyle} px-2 text-base md:text-lg lg:text-xl leading-relaxed dark:text-white-0`}
				dangerouslySetInnerHTML={{ __html: cleanedText }}
			></div>

			{showAnimation && (
				<div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-75">
					<Icon icon="akar-icons:check" color="white" width="48" height="48" />
				</div>
			)}

			{/* Copy Tooltip */}
			<div className="absolute bottom-0 left-0 right-0 bg-black-50 bg-opacity-50 text-white-0 text-center text-sm py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				Click to copy text
			</div>

			{/* Copy Button */}
			<button
				onClick={(e) => {
					e.stopPropagation()
					handleCopyClick()
				}}
				className="absolute top-2 right-2 p-1 bg-gray-700 text-white-0 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none opacity-0 group-hover:opacity-100 focus:opacity-100"
			>
				<Icon
					icon={isCopied ? 'akar-icons:check' : 'mdi:content-copy'}
					color={isCopied ? 'green' : 'white'}
					width="24"
					height="24"
				/>
			</button>
		</div>
	)
}

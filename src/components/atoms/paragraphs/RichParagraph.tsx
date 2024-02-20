import React, { useEffect, useRef, useState } from 'react'

import './RichParagraph.module.css'
import { Icon } from '@iconify/react'
import * as styles from '../../../constants/mainsectionStyles'
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
				element.classList.add('dark:text-white')

				if (element.tagName === 'A') {
					element.setAttribute('target', '_blank')
					element.setAttribute('rel', 'noopener noreferrer')

					if (element.textContent === 'VIRTUAL VISIT') {
						element.classList.add('special-link-class')
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
		<div className={styles.paragraphWrapper} onClick={handleCopyClick}>
			<div
				ref={ref}
				className={`${fontFamilyStyle} ${styles.innerHTML}`}
				dangerouslySetInnerHTML={{ __html: cleanedText }}
			></div>

			{showAnimation && (
				<div className={styles.clipboardAnnimation}>
					<Icon icon="akar-icons:check" color="white" width="20" height="20" />
				</div>
			)}

			<button
				onClick={(e) => {
					e.stopPropagation()
					handleCopyClick()
				}}
				className={styles.clipboardAnnimationButton}
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

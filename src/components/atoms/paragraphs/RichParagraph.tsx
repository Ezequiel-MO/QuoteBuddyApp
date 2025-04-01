import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

interface RichParagraphProps {
	text: string
	isActive?: boolean
	className?: string
	truncate?: boolean
	maxLines?: number
}

const BLOCK_ELEMENTS = [
	'TABLE',
	'UL',
	'OL',
	'BLOCKQUOTE',
	'H1',
	'H2',
	'H3',
	'H4',
	'H5',
	'H6',
	'PRE',
	'FIGURE',
	'DIV'
]

const decodeHtmlEntities = (html: string) => {
	const txt = document.createElement('textarea')
	txt.innerHTML = html
	return txt.value
}

export const RichParagraph: React.FC<RichParagraphProps> = ({
	text,
	isActive = true,
	className = '',
	truncate = false,
	maxLines = 8 // default to 8 lines for this example
}) => {
	const [cleanedHtml, setCleanedHtml] = useState<string>('')
	const [isExpanded, setIsExpanded] = useState<boolean>(!truncate)
	// showButton is used to decide if the toggle should be rendered
	const [showButton, setShowButton] = useState<boolean>(false)
	const contentRef = useRef<HTMLDivElement>(null)
	// Hidden element to measure the full height of the content
	const hiddenContentRef = useRef<HTMLDivElement>(null)
	const uniqueId = useMemo(
		() => `rich-p-${Math.random().toString(36).substring(2, 9)}`,
		[]
	)

	const preProcessText = useCallback((rawText: string): string => {
		if (!rawText) return ''

		let processedText = rawText

		if (
			processedText.includes('&lt;table') ||
			processedText.includes('&lt;/table&gt;')
		) {
			const tableElements = ['table', 'thead', 'tbody', 'tr', 'th', 'td']
			tableElements.forEach((element) => {
				processedText = processedText.replace(
					new RegExp(`&lt;${element}([^&]*)&gt;`, 'g'),
					`<${element}$1>`
				)
				processedText = processedText.replace(
					new RegExp(`&lt;/${element}&gt;`, 'g'),
					`</${element}>`
				)
			})
		}

		processedText = processedText
			.replace(/<p>\s*(&nbsp;)*\s*<\/p>/g, '')
			.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '')
			.replace(/<p>\s*(<table)/g, '$1')
			.replace(/(<\/table>)\s*<\/p>/g, '$1')
			.replace(/>\s+</g, '><')

		return processedText
	}, [])

	const processedHtml = useMemo(() => {
		if (!text || typeof DOMParser === 'undefined') return text || ''
		try {
			const preProcessedText = preProcessText(text)
			const decodedText = decodeHtmlEntities(preProcessedText)

			const parser = new DOMParser()
			const doc = parser.parseFromString(
				`<div>${decodedText.trim()}</div>`,
				'text/html'
			)
			const rootNode = (doc.body.firstChild as HTMLElement) || doc.body

			const cleanNode = (node: Node) => {
				if (node.nodeType === Node.COMMENT_NODE) {
					node.parentNode?.removeChild(node)
					return
				}

				if (node.nodeType === Node.TEXT_NODE) {
					if (node.parentNode?.nodeName !== 'PRE') {
						node.nodeValue = node.nodeValue?.replace(/\s+/g, ' ').trim() ?? null
						if (!node.nodeValue) {
							node.parentNode?.removeChild(node)
						}
					}
					return
				}

				if (node.nodeType === Node.ELEMENT_NODE) {
					const element = node as HTMLElement

					if (element.tagName === 'P') {
						const children = Array.from(element.childNodes)
						const hasBlockElement = children.some(
							(child) =>
								child.nodeType === Node.ELEMENT_NODE &&
								BLOCK_ELEMENTS.includes((child as Element).tagName)
						)

						if (hasBlockElement) {
							const parent = element.parentNode
							while (element.firstChild) {
								parent?.insertBefore(element.firstChild, element)
							}
							parent?.removeChild(element)
							return
						} else if (
							element.innerHTML.trim() === '' ||
							element.innerHTML === '&nbsp;' ||
							element.innerHTML === '<br>'
						) {
							element.parentNode?.removeChild(element)
							return
						}
					}

					if (/^H[1-6]$/.test(element.tagName)) {
						element.removeAttribute('style')
						element.classList.add(`${uniqueId}-heading`)
					}

					Array.from(element.childNodes).forEach(cleanNode)
				}
			}

			cleanNode(rootNode)

			const tables = rootNode.querySelectorAll('table')
			tables.forEach((table) => {
				if (
					!table.querySelector('tbody') &&
					table.querySelectorAll('tr').length > 0
				) {
					const tbody = document.createElement('tbody')
					Array.from(table.querySelectorAll('tr')).forEach((tr) => {
						if (!tr.parentElement || tr.parentElement.tagName !== 'THEAD') {
							tbody.appendChild(tr)
						}
					})
					table.appendChild(tbody)
				}
				table.classList.add(`${uniqueId}-table`)
			})

			return rootNode.innerHTML
		} catch (error) {
			console.error('Error processing rich text:', error)
			return text
		}
	}, [text, preProcessText, uniqueId])

	useEffect(() => {
		setCleanedHtml(processedHtml)
		// If truncation is not desired, always show the full content.
		setIsExpanded(!truncate)
	}, [processedHtml, truncate])

	// Measure the content height to determine if the "Read more" button should be shown.
	useEffect(() => {
		if (truncate && contentRef.current && hiddenContentRef.current) {
			const computedStyle = window.getComputedStyle(contentRef.current)
			let lineHeight = parseFloat(computedStyle.lineHeight)
			// Fallback if lineHeight is not a number.
			if (isNaN(lineHeight)) {
				const fontSize = parseFloat(computedStyle.fontSize)
				lineHeight = 1.6 * fontSize
			}
			const truncatedHeight = lineHeight * maxLines
			const fullHeight = hiddenContentRef.current.clientHeight

			// If full content height exceeds the truncated height (with a small epsilon), show the button.
			setShowButton(fullHeight > truncatedHeight + 1)
		} else {
			setShowButton(false)
		}
	}, [cleanedHtml, truncate, maxLines, isExpanded])

	const toggleExpand = useCallback(() => {
		setIsExpanded((prev) => !prev)
	}, [])

	// Only apply truncation styles if truncation is enabled,
	// the content is not expanded, and showButton is true.
	const contentStyle = useMemo(() => {
		if (truncate && !isExpanded && showButton) {
			return {
				display: '-webkit-box',
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				WebkitLineClamp: maxLines,
				position: 'relative'
			} as React.CSSProperties
		}
		return {}
	}, [truncate, isExpanded, maxLines, showButton])

	const contentVariants = {
		hidden: { opacity: 0, y: 5 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
	}

	return (
		<>
			<style>{`
				.${uniqueId} {
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
					font-size: 1rem;
					line-height: 1.6;
					color: #374151;
					text-align: left;
					letter-spacing: normal;
					word-spacing: normal;
				}
				.dark .${uniqueId} {
					color: #e5e7eb;
				}
				.${uniqueId} * {
					font-size: inherit;
					line-height: inherit;
					font-family: inherit;
					margin-top: 0;
				}
				.${uniqueId} *:last-child {
					margin-bottom: 0;
				}
				.${uniqueId} p {
					margin-bottom: 1rem;
					text-indent: 0;
				}
				.${uniqueId} h1, .${uniqueId} h2, .${uniqueId} h3, .${uniqueId} h4, .${uniqueId} h5, .${uniqueId} h6, .${uniqueId} .${uniqueId}-heading {
					font-weight: 600;
					line-height: 1.3;
					margin: 1.5rem 0 1rem 0;
					font-size: 1.25rem;
					color: #1f2937;
				}
				.dark .${uniqueId} h1, .dark .${uniqueId} h2, .dark .${uniqueId} h3, .dark .${uniqueId} h4, .dark .${uniqueId} h5, .dark .${uniqueId} h6, .dark .${uniqueId} .${uniqueId}-heading {
					color: #f3f4f6;
				}
				.${uniqueId} a {
					color: #ea5933;
					text-decoration: underline;
					font-weight: inherit;
				}
				.${uniqueId} a:hover {
					color: #c43b1c;
				}
				.${uniqueId} ul, .${uniqueId} ol {
					margin: 0 0 1rem 0;
					padding-left: 2rem;
				}
				.${uniqueId} ul { list-style-type: disc; }
				.${uniqueId} ol { list-style-type: decimal; }
				.${uniqueId} li {
					margin-bottom: 0.5rem;
					padding-left: 0.25rem;
				}
				.${uniqueId} li > ul, .${uniqueId} li > ol {
					margin: 0.5rem 0 0 0;
				}
				.${uniqueId} table, .${uniqueId}-table {
					width: 100%;
					margin: 1rem 0;
					border-collapse: collapse;
					box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
					border-radius: 0.375rem;
					overflow: hidden;
				}
				@media (max-width: 768px) {
					.${uniqueId} table, .${uniqueId}-table {
						display: block;
						overflow-x: auto;
					}
				}
				.${uniqueId} th, .${uniqueId} td {
					padding: 0.75rem 1rem;
					border: 1px solid #e5e7eb;
					text-align: left;
				}
				.dark .${uniqueId} th, .dark .${uniqueId} td {
					border-color: #4b5563;
				}
				.${uniqueId} th {
					background-color: #f9fafb;
					font-weight: 600;
				}
				.dark .${uniqueId} th {
					background-color: #374151;
				}
				.${uniqueId} tr:nth-child(even) {
					background-color: #f9fafb;
				}
				.dark .${uniqueId} tr:nth-child(even) {
					background-color: #374151;
				}
				.dark .${uniqueId} tr:nth-child(odd) {
					background-color: #1f2937;
				}
				.${uniqueId} blockquote {
					margin: 1rem 0;
					padding: 1rem;
					border-left: 4px solid #ea5933;
					background-color: #f9fafb;
					color: #4b5563;
					font-style: italic;
				}
				.dark .${uniqueId} blockquote {
					background-color: #374151;
					color: #e5e7eb;
				}
				.${uniqueId} code {
					font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
					background-color: #f3f4f6;
					padding: 0.2rem 0.4rem;
					border-radius: 0.25rem;
					font-size: 0.875em;
					color: #ef4444;
				}
				.dark .${uniqueId} code {
					background-color: #374151;
					color: #f87171;
				}
				.${uniqueId} pre {
					margin: 1rem 0;
					padding: 1rem;
					background-color: #f3f4f6;
					border-radius: 0.375rem;
					overflow-x: auto;
					font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
				}
				.dark .${uniqueId} pre {
					background-color: #1f2937;
					color: #e5e7eb;
				}
				.${uniqueId} pre code {
					padding: 0;
					background-color: transparent;
					color: inherit;
					font-size: 0.875em;
					border-radius: 0;
				}
				.${uniqueId}-toggle-btn {
					display: inline-flex;
					align-items: center;
					margin-top: 0.5rem;
					font-size: 0.875rem;
					font-weight: 500;
					color: #ea5933;
					background: none;
					border: none;
					padding: 0.25rem 0.5rem;
					cursor: pointer;
					text-decoration: none;
					border-radius: 0.25rem;
					transition: all 0.2s ease;
				}
				.${uniqueId}-toggle-btn:hover {
					color: #c43b1c;
					background-color: rgba(234, 89, 51, 0.1);
				}
				.${uniqueId}-toggle-btn:focus {
					outline: 2px solid #ea5933;
					outline-offset: 2px;
				}
				.${uniqueId} img {
					max-width: 100%;
					height: auto;
					margin: 1rem 0;
					border-radius: 0.375rem;
				}
				.${uniqueId} div:empty, .${uniqueId} p:empty {
					display: none;
				}
				.${uniqueId}-truncated:after {
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2rem;
					background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
					pointer-events: none;
				}
				.dark .${uniqueId}-truncated:after {
					background: linear-gradient(to bottom, rgba(31, 41, 55, 0), rgba(31, 41, 55, 1));
				}
			`}</style>

			{/* Visible content */}
			<motion.div
				className={`${className}`}
				initial="hidden"
				animate={isActive ? 'visible' : 'hidden'}
				variants={contentVariants}
			>
				<div
					ref={contentRef}
					className={`${uniqueId} ${
						!isExpanded && truncate && showButton ? `${uniqueId}-truncated` : ''
					} relative`}
					style={contentStyle}
					dangerouslySetInnerHTML={{ __html: cleanedHtml }}
				/>

				{truncate && showButton && (
					<motion.button
						onClick={toggleExpand}
						className={`${uniqueId}-toggle-btn mt-2`}
						aria-expanded={isExpanded}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
					>
						{isExpanded ? 'Read less' : 'Read more'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 ml-1"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							{isExpanded ? (
								<path
									fillRule="evenodd"
									d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							) : (
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							)}
						</svg>
					</motion.button>
				)}
			</motion.div>

			{/* Hidden measurement element */}
			<div
				ref={hiddenContentRef}
				className={uniqueId}
				dangerouslySetInnerHTML={{ __html: cleanedHtml }}
				style={{
					position: 'absolute',
					visibility: 'hidden',
					height: 'auto',
					overflow: 'visible',
					whiteSpace: 'normal'
				}}
			/>
		</>
	)
}

export default RichParagraph

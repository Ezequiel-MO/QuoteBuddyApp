import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

interface RichParagraphProps {
	text: string
	isActive?: boolean
	className?: string
	truncate?: boolean
	maxLines?: number
}

// Define block elements to handle properly in cleanup
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

// Decode HTML entities in a string
const decodeHtmlEntities = (html: string) => {
	const txt = document.createElement('textarea')
	txt.innerHTML = html
	return txt.value
}

/**
 * Renders trusted HTML content with custom CSS styling applied directly.
 * Handles complex HTML, cleans formatting issues, and optionally truncates content.
 * Rigorously trims blank lines between block elements to prevent spacing issues.
 */
export const RichParagraph: React.FC<RichParagraphProps> = ({
	text,
	isActive = true,
	className = '',
	truncate = false,
	maxLines = 3
}) => {
	const [cleanedHtml, setCleanedHtml] = useState<string>('')
	const [isExpanded, setIsExpanded] = useState<boolean>(!truncate)
	const [canTruncate, setCanTruncate] = useState<boolean>(false)
	const contentRef = useRef<HTMLDivElement>(null)
	const uniqueId = useMemo(
		() => `rich-p-${Math.random().toString(36).substring(2, 9)}`,
		[]
	)

	// Pre-process raw text before parsing to clean up common issues
	const preProcessText = useCallback((rawText: string): string => {
		if (!rawText) return ''

		// First handle encoded tables before standard HTML processing
		let processedText = rawText

		// Convert encoded HTML tables to actual HTML
		if (
			processedText.includes('&lt;table') ||
			processedText.includes('&lt;/table&gt;')
		) {
			const tableElements = ['table', 'thead', 'tbody', 'tr', 'th', 'td']
			tableElements.forEach((element) => {
				// Replace opening tags with attributes
				processedText = processedText.replace(
					new RegExp(`&lt;${element}([^&]*)&gt;`, 'g'),
					`<${element}$1>`
				)

				// Replace closing tags
				processedText = processedText.replace(
					new RegExp(`&lt;/${element}&gt;`, 'g'),
					`</${element}>`
				)
			})
		}

		// Clean up the excessive newlines, especially before/after tables
		processedText = processedText
			// Remove empty paragraphs with just whitespace or &nbsp;
			.replace(/<p>\s*(&nbsp;)*\s*<\/p>/g, '')
			// Remove paragraphs with just line breaks
			.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '')
			// Fix paragraph wrapping around block elements
			.replace(/<p>\s*(<table)/g, '$1')
			.replace(/(<\/table>)\s*<\/p>/g, '$1')
			// Remove excessive whitespace between tags
			.replace(/>\s+</g, '><')

		return processedText
	}, [])

	// Process HTML to clean up structure and remove blank space
	const processedHtml = useMemo(() => {
		if (!text || typeof DOMParser === 'undefined') return text || ''
		try {
			// Pre-process to fix common table and spacing issues
			const preProcessedText = preProcessText(text)
			const decodedText = decodeHtmlEntities(preProcessedText)

			const parser = new DOMParser()
			const doc = parser.parseFromString(
				`<div>${decodedText.trim()}</div>`,
				'text/html'
			)
			const rootNode = (doc.body.firstChild as HTMLElement) || doc.body

			// Recursive function to clean DOM nodes
			const cleanNode = (node: Node) => {
				// Remove comment nodes
				if (node.nodeType === Node.COMMENT_NODE) {
					node.parentNode?.removeChild(node)
					return
				}

				// Handle text nodes - trim whitespace
				if (node.nodeType === Node.TEXT_NODE) {
					// Don't trim text in PRE tags
					if (node.parentNode?.nodeName !== 'PRE') {
						node.nodeValue = node.nodeValue?.trim() ?? ''
						// Remove empty text nodes (causes extra spacing)
						if (!node.nodeValue) {
							node.parentNode?.removeChild(node)
						}
					}
					return
				}

				// Handle element nodes
				if (node.nodeType === Node.ELEMENT_NODE) {
					const element = node as HTMLElement

					// Special handling for paragraphs
					if (element.tagName === 'P') {
						const children = Array.from(element.childNodes)

						// Check if paragraph contains block elements (invalid HTML structure)
						const hasBlockElement = children.some(
							(child) =>
								child.nodeType === Node.ELEMENT_NODE &&
								BLOCK_ELEMENTS.includes((child as Element).tagName)
						)

						// If paragraph contains block elements, unwrap the paragraph
						if (hasBlockElement) {
							const parent = element.parentNode
							// Move all children before the paragraph
							while (element.firstChild) {
								parent?.insertBefore(element.firstChild, element)
							}
							// Remove the now-empty paragraph
							parent?.removeChild(element)
							return
						}
						// Remove empty paragraphs that cause blank space
						else if (
							element.innerHTML.trim() === '' ||
							element.innerHTML === '&nbsp;' ||
							element.innerHTML === '<br>'
						) {
							element.parentNode?.removeChild(element)
							return
						}
					}

					// Recursively clean all child nodes
					Array.from(element.childNodes).forEach(cleanNode)
				}
			}

			// Clean up the entire document
			cleanNode(rootNode)

			// Additional post-processing for table structure
			const tables = rootNode.querySelectorAll('table')
			tables.forEach((table) => {
				// Ensure tables have proper structure
				if (
					!table.querySelector('tbody') &&
					table.querySelectorAll('tr').length > 0
				) {
					const tbody = document.createElement('tbody')
					Array.from(table.querySelectorAll('tr')).forEach((tr) => {
						// Skip rows already in thead
						if (!tr.parentElement || tr.parentElement.tagName !== 'THEAD') {
							tbody.appendChild(tr)
						}
					})
					table.appendChild(tbody)
				}
			})

			return rootNode.innerHTML
		} catch (error) {
			console.error('Error processing rich text:', error)
			return text
		}
	}, [text, preProcessText])

	// Update the cleaned HTML when processed content changes
	useEffect(() => {
		setCleanedHtml(processedHtml)
		if (truncate) {
			setIsExpanded(false)
			setCanTruncate(false)
		} else {
			setIsExpanded(true)
		}
	}, [processedHtml, truncate])

	// Check if content can be truncated
	useEffect(() => {
		if (truncate && cleanedHtml && contentRef.current) {
			let rafId: number

			const checkOverflow = () => {
				if (contentRef.current) {
					const currentStyle = contentRef.current.style
					const originalWebkitLineClamp = currentStyle.webkitLineClamp

					// Temporarily remove truncation to measure full height
					if (originalWebkitLineClamp) currentStyle.webkitLineClamp = 'unset'

					const fullHeight = contentRef.current.scrollHeight
					const currentHeight = contentRef.current.clientHeight

					// Restore truncation
					if (originalWebkitLineClamp && !isExpanded) {
						currentStyle.webkitLineClamp = originalWebkitLineClamp
					}

					// Allow for a small margin of error (5px)
					const doesOverflow = fullHeight > currentHeight + 5
					setCanTruncate(doesOverflow)

					// If content doesn't overflow, no need for truncation
					if (!doesOverflow && !isExpanded) setIsExpanded(true)
				}
			}

			// Use requestAnimationFrame for more reliable measurement
			rafId = requestAnimationFrame(checkOverflow)
			return () => cancelAnimationFrame(rafId)
		} else {
			setCanTruncate(false)
			if (!truncate) setIsExpanded(true)
		}
	}, [cleanedHtml, truncate, maxLines, isExpanded])

	// Toggle expanded state
	const toggleExpand = useCallback(() => {
		setIsExpanded((prev) => !prev)
	}, [])

	// Compute content style for truncation
	const contentStyle: React.CSSProperties = useMemo(() => {
		if (truncate && !isExpanded) {
			return {
				display: '-webkit-box',
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				WebkitLineClamp: maxLines
			}
		}
		return {}
	}, [truncate, isExpanded, maxLines])

	// Animation variants
	const contentVariants = {
		hidden: { opacity: 0, y: 5 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
	}

	return (
		<>
			<style>{`
        /* Base styles */
        .${uniqueId} {
          line-height: 1.65;
          color: #333;
        }
        .dark .${uniqueId} {
          color: #e5e7eb;
        }
        
        /* Remove margins on last element to prevent extra space */
        .${uniqueId} *:last-child {
          margin-bottom: 0;
        }
        
        /* Headings */
        .${uniqueId} h1, .${uniqueId} h2, .${uniqueId} h3, .${uniqueId} h4, .${uniqueId} h5, .${uniqueId} h6 {
          margin-top: 1.2em;
          margin-bottom: 0.6em;
          font-weight: 600;
          line-height: 1.3;
        }
        .${uniqueId} h1 { font-size: 2em; }
        .${uniqueId} h2 { font-size: 1.5em; }
        .${uniqueId} h3 { font-size: 1.25em; }
        .${uniqueId} h4 { font-size: 1em; }
        .${uniqueId} h5 { font-size: 0.875em; }
        .${uniqueId} h6 { font-size: 0.85em; }
        
        /* Paragraphs */
        .${uniqueId} p {
          margin-bottom: 1em;
        }
        
        /* Links */
        .${uniqueId} a {
          color: #ea5933;
          text-decoration: underline;
        }
        .${uniqueId} a:hover {
          color: #c43b1c;
        }
        
        /* Lists */
        .${uniqueId} ul, .${uniqueId} ol {
          margin-top: 0.5em;
          margin-bottom: 1em;
          padding-left: 1.5em;
        }
        .${uniqueId} ul { list-style-type: disc; }
        .${uniqueId} ol { list-style-type: decimal; }
        .${uniqueId} li { margin-bottom: 0.3em; }
        .${uniqueId} li > ul, .${uniqueId} li > ol { margin-top: 0.3em; }
        
        /* Tables - with improved responsive handling */
        .${uniqueId} table {
          width: 100%;
          margin-top: 1em;
          margin-bottom: 1em;
          border-collapse: collapse;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border-radius: 0.375rem;
          overflow: hidden;
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        @media (min-width: 768px) {
          .${uniqueId} table {
            display: table;
            white-space: normal;
          }
        }
        
        /* Table cells and headers */
        .${uniqueId} th, .${uniqueId} td {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          text-align: left;
          min-width: 80px;
        }
        .dark .${uniqueId} th, .dark .${uniqueId} td {
          border-color: #4b5563;
        }
        .${uniqueId} th {
          background-color: #f9fafb;
          font-weight: 600;
          white-space: nowrap;
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
        
        /* Other elements */
        .${uniqueId} blockquote {
          margin: 1em 0;
          padding: 0.5em 1em;
          border-left: 4px solid #ea5933;
          background-color: #f8f8f8;
          color: #555;
        }
        .dark .${uniqueId} blockquote {
          background-color: #374151;
          color: #e5e7eb;
        }
        
        /* Code blocks */
        .${uniqueId} code {
          font-family: monospace;
          background-color: #f0f0f0;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-size: 0.9em;
        }
        .dark .${uniqueId} code {
          background-color: #374151;
          color: #e5e7eb;
        }
        .${uniqueId} pre {
          margin: 1em 0;
          padding: 1em;
          background-color: #f8f8f8;
          border: 1px solid #eee;
          border-radius: 4px;
          overflow-x: auto;
          font-family: monospace;
          line-height: 1.4;
        }
        .dark .${uniqueId} pre {
          background-color: #1f2937;
          border-color: #4b5563;
          color: #e5e7eb;
        }
        .${uniqueId} pre code {
          padding: 0;
          background-color: transparent;
          border-radius: 0;
          font-size: 1em;
        }
        
        /* Read more/less button */
        .${uniqueId}-toggle-btn {
          display: inline-flex;
          align-items: center;
          margin-top: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #ea5933;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-decoration: none;
        }
        .${uniqueId}-toggle-btn:hover {
          color: #c43b1c;
        }
        .${uniqueId}-toggle-btn:focus {
          outline: 2px solid #ea5933;
          outline-offset: 2px;
        }
        
        /* Fix spacing between paragraphs and tables */
        .${uniqueId} p + table {
          margin-top: 0;
        }
        
        /* Prevent tables from causing extra space */
        .${uniqueId} div:empty,
        .${uniqueId} p:empty,
        .${uniqueId} p:only-child:empty {
          display: none;
        }
      `}</style>

			<motion.div
				className={className}
				initial="hidden"
				animate={isActive ? 'visible' : 'hidden'}
				variants={contentVariants}
			>
				<div
					ref={contentRef}
					className={`${uniqueId}`}
					style={contentStyle}
					dangerouslySetInnerHTML={{ __html: cleanedHtml }}
				/>
				{truncate && canTruncate && (
					<button
						onClick={toggleExpand}
						className={`${uniqueId}-toggle-btn`}
						aria-expanded={isExpanded}
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
					</button>
				)}
			</motion.div>
		</>
	)
}

export default RichParagraph

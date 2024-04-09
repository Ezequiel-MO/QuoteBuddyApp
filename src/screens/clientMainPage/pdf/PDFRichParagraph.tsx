import React from 'react'
import { Text, Link, StyleSheet, View, Font } from '@react-pdf/renderer'
import OpenSansRegular from '../../../assets/OpenSans-Regular.ttf'
import OpenSansBold from '../../../assets/OpenSans-Bold.ttf'
import OpenSansItalic from '../../../assets/OpenSans-Italic.ttf'

Font.register({
	family: 'OpenSans',
	fonts: [
		{ src: OpenSansRegular, fontWeight: 'normal' },
		{ src: OpenSansBold, fontWeight: 'bold' },
		{ src: OpenSansItalic, fontStyle: 'italic' }
	]
})

const styles = StyleSheet.create({
	baseText: {
		fontSize: 12,
		marginBottom: 2,
		fontFamily: 'OpenSans'
	},
	bold: {
		fontWeight: 'bold'
	},
	italic: {
		fontStyle: 'italic'
	},
	link: {
		color: 'blue',
		textDecoration: 'underline'
	}
})

interface PDFRichParagraphProps {
	text: string
}

const parseRichText = (richText: string): JSX.Element[] => {
	const normalizedText = richText
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<')
		.replace(/&amp;/g, '&')
		.replace(/<p>/g, '')
		.replace(/<\/p>|<br\s*\/?>/g, '\n')
		.trim()

	const output: JSX.Element[] = []
	let paragraphs = normalizedText.split('\n').filter((line) => line)

	paragraphs.forEach((paragraph, index) => {
		let elements: JSX.Element[] = parseInlineElements(
			paragraph,
			`paragraph-${index}`
		)
		output.push(
			<View key={`paragraph-${index}`} style={styles.baseText}>
				{elements}
			</View>
		)
	})

	return output
}

const parseInlineElements = (
	text: string,
	keyPrefix: string
): JSX.Element[] => {
	const output: JSX.Element[] = []
	let currentIndex = 0

	// Regex to match <b>, <i>, <a> tags and text outside them
	const tagRegex =
		/<b>(.*?)<\/b>|<i>(.*?)<\/i>|<a href="([^"]+)">(.*?)<\/a>|([^<>]+)/g

	let match
	while ((match = tagRegex.exec(text)) !== null) {
		// Matched text outside HTML tags
		console.log('match', match)
		if (match[5]) {
			output.push(
				<Text key={`${keyPrefix}-text-${currentIndex}`} style={styles.baseText}>
					{match[5]}
				</Text>
			)
			continue
		}

		// Handling <b> tags
		if (match[1]) {
			output.push(
				<Text
					key={`${keyPrefix}-bold-${currentIndex}`}
					style={{ ...styles.baseText, ...styles.bold }}
				>
					{match[1]}
				</Text>
			)
			continue
		}

		// Handling <i> tags
		if (match[2]) {
			output.push(
				<Text
					key={`${keyPrefix}-italic-${currentIndex}`}
					style={{ ...styles.baseText, ...styles.italic }}
				>
					{match[2]}
				</Text>
			)
			continue
		}

		// Handling <a> tags
		if (match[3]) {
			output.push(
				<Link
					key={`${keyPrefix}-link-${currentIndex}`}
					style={{ ...styles.baseText, ...styles.link }}
					src={match[3]}
				>
					{match[4]}
				</Link>
			)
			continue
		}

		currentIndex++
	}

	return output
}

const PDFRichParagraph: React.FC<PDFRichParagraphProps> = ({ text }) => {
	const parsedContent = parseRichText(text)
	return (
		<>
			{parsedContent.map((content, index) => (
				<View key={`content-${index}`}>{content}</View>
			))}
		</>
	)
}

export default PDFRichParagraph

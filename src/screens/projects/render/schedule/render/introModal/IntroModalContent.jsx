import { RichTextEditor } from '../../../../../../ui/inputs/RichTextEditor'

export const IntroModalContent = ({
	day,
	typeEvent,
	textContent,
	setTextContent,
	events,
	screen
}) => {
	const update = Object.keys(events).includes('intro')

	return (
		<>
			<h1
				style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px' }}
			>
				{`${day} ${typeEvent}`}
			</h1>
			<RichTextEditor
				screen={screen}
				setTextContent={setTextContent}
				textContent={textContent}
				update={update}
				style={{ width: '95%' }}
			/>
		</>
	)
}

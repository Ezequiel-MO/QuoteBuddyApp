import { RichTextEditor } from "../../../../../ui"


export const IntroToEventInput = ({ textContent, setTextContent }) => {

	return (
		<>
			<RichTextEditor
				textContent={textContent}
				setTextContent={setTextContent}

			/>
		</>
	)
}

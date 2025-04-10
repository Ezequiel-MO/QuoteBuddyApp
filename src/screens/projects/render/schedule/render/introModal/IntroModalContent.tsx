import { FC } from 'react'
import TextEditor from '../../../../../../components/molecules/TextEditor'

interface IntroModalContentProps {
	day: string
	typeEvent: string
	textContent: string
	setTextContent: (content: string) => void
	events: {
		intro?: string
		[key: string]: any
	}
	screen: {
		textContent: string
		[key: string]: any
	}
	handleConfirm: () => void
}

export const IntroModalContent: FC<IntroModalContentProps> = ({
	day,
	typeEvent,
	textContent,
	setTextContent,
	events,
	screen,
	handleConfirm
}) => {
	const update = Object.keys(events).includes('intro')

	return (
		<div className="flex flex-col h-full bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-cyan-600 to-cyan-400 px-6 py-4 border-b border-gray-600">
				<h1 className="text-2xl font-bold text-center text-white-0">
					{`${day} - ${typeEvent}`}
				</h1>
			</div>

			{/* Content area */}
			<div className="flex-grow p-5">
				<div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full">
					<TextEditor
						value={textContent}
						onChange={setTextContent}
						className="h-full"
						style={{
							minHeight: '350px',
							borderRadius: '0.375rem'
						}}
					/>
				</div>
			</div>

			{/* Footer */}
			<div className="bg-gray-900 px-6 py-3 border-t border-gray-700 flex items-center justify-between">
				<div className="text-sm text-gray-400">
					{update ? 'Editing existing intro' : 'Creating new intro'}
				</div>
				<button
					className="cursor-pointer py-2 px-6 bg-[#ea5933] hover:bg-orange-600 text-white-0 font-bold uppercase rounded-lg transition-colors duration-200"
					onClick={handleConfirm}
					aria-label="Save intro"
				>
					Save Intro
				</button>
			</div>
		</div>
	)
}

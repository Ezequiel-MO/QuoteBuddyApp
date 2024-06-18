import React, { useEffect, useRef, FunctionComponent } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
	setTextContent: (content: string) => void
	textContent: string
	update: boolean
	screen: { [key: string]: any }
	keyScreen?: string
	style?: React.CSSProperties
}

export const RichTextEditor: FunctionComponent<RichTextEditorProps> = ({
	setTextContent,
	textContent,
	update,
	screen,
	keyScreen = '',
	style
}) => {
	const quillRef = useRef<ReactQuill>(null)

	const handleQuillChange = (content: string) => {
		setTextContent(content)
	}

	const computeTextContent = (): string => {
		const content = keyScreen ? screen[keyScreen] : screen.textContent
		if (Array.isArray(content)) {
			return content.join('').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
		}
		return content?.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
	}

	useEffect(() => {
		if (update) {
			const textContentToSet = computeTextContent()
			if (textContent !== textContentToSet) {
				setTextContent(textContentToSet)
			}
		}
	}, [screen, update, keyScreen, setTextContent])

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			[{ color: [] }, { background: [] }],
			[{ align: [] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }],
			['link', 'image'],
			['clean']
		]
	}

	return (
		<div className="bg-slate-500 p-4 rounded-lg shadow-md">
			<ReactQuill
				className="text-white-0"
				style={style || { maxWidth: '140%' }}
				modules={modules}
				ref={quillRef}
				value={textContent}
				onChange={handleQuillChange}
				placeholder="Write a general description "
			/>
		</div>
	)
}

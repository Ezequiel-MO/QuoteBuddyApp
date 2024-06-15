import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
	value: string
	onChange: (value: string) => void
}

const TextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
	const handleChange = (content: string) => {
		onChange(content)
	}

	return <ReactQuill value={value} onChange={handleChange} />
}

export default TextEditor

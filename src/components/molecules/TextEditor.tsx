import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
	value: string
	onChange: (value: string) => void
}

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ font: [] }],
		[{ color: [] }, { background: [] }],
		[{ align: [] }],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ script: 'sub' }, { script: 'super' }],
		['clean']
	]
}

const TextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
	const handleChange = (content: string) => {
		onChange(content)
	}

	return <ReactQuill value={value} onChange={handleChange} modules={modules} />
}

export default TextEditor

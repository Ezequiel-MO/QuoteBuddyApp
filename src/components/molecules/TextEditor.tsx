import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
	value: string
	onChange: (value: string) => void
	className?: string
	style?: React.CSSProperties
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
		['link', 'image'],
		['clean']
	]
}

const formats = [
	'header',
	'font',
	'color',
	'background',
	'align',
	'bold',
	'italic',
	'underline',
	'strike',
	'list',
	'bullet',
	'script',
	'link',
	'image'
]

const TextEditor: React.FC<RichTextEditorProps> = ({
	value,
	onChange,
	className = '',
	style
}) => {
	const handleChange = (content: string) => {
		onChange(content)
	}

	return (
		<div className={`${className} quill-dark-theme`} style={style}>
			<ReactQuill
				value={value}
				onChange={handleChange}
				modules={modules}
				formats={formats}
				className="text-white-0"
				style={{
					backgroundColor: '#1e293b',
					borderRadius: '0.375rem',
					height: 'calc(100% - 42px)' // Account for toolbar height
				}}
			/>
		</div>
	)
}

export default TextEditor

import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


export const IntroToEventInput = ({  textContent, setTextContent }) => {

	const quillRef = useRef()

	const handleQuillChange = (content) => {
		setTextContent(content)
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
			['clean'],
		],
	}

	return (
		<>
			<ReactQuill
				className="bg-white-0 text-black-50"
				style={{ width: '155%', }}
				theme="snow"
				modules={modules}
				ref={quillRef}
				value={textContent}
				onChange={handleQuillChange}
				placeholder='Write a general description of the Hotel'
			/>
		</>
	)
}

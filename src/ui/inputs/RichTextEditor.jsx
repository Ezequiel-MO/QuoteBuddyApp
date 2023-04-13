import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export const RichTextEditor = ({
    setTextContent,
    textContent,
    update,
    screen,
    style
}) => {

    const quillRef = useRef()

    const handleQuillChange = (content) => {
        setTextContent(content)
    }

    useEffect(() => {
        if (update) {
            setTextContent(
                screen?.textContent
                    // .replace(/\\(.)/g, '$1')
                    // .replace(/\\/g, '')
                    // .replace(/\[/g, '')
                    // .replace(/\]/g, '')
                    // .replace(/"/g, '')
                    ?.replace(/&lt;/g, '<')
                    ?.replace(/&gt;/g, '>')
                // .replace(/&amp;/g, '&')
            )
        }
    }, [screen, update])

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
        <div>
            <ReactQuill
                className="bg-white-0 text-black-50"
                style={style ? style : { width: '140%' }}
                theme="snow"
                modules={modules}
                ref={quillRef}
                value={textContent}
                onChange={handleQuillChange}
                placeholder='Write a general description '
            />
        </div>
    )
}
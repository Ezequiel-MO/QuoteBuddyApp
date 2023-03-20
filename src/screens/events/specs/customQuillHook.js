// CustomQuillHook.js
import { useQuill } from 'react-quilljs'
import Quill from 'quill'

export const useCustomQuill = (options) => {
	return useQuill({
		...options,
		Quill // Provide the correct Quill import
	})
}

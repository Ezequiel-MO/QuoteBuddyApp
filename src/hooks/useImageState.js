import { useState } from 'react'

export const useImageState = () => {
	const [selectedFiles, setSelectedFiles] = useState([])

	const handleFileSelection = (event) => {
		setSelectedFiles((prevFiles) => [
			...prevFiles,
			...Array.from(event.target.files)
		])
	}

	return { selectedFiles, handleFileSelection }
}

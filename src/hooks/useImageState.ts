import { useState, ChangeEvent } from 'react'

export const useImageState = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])

	const addFiles = (files: FileList) => {
		setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)])
	}

	const handleFileSelection = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			addFiles(event.target.files)
		}
	}

	return { selectedFiles, handleFileSelection, setSelectedFiles }
}

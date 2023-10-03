import { useState, ChangeEvent } from 'react'

export const usePdfState = () => {
	const [selectedFilesPdf, setSelectedFilesPdf] = useState<File[]>([])

	const addFiles = (files: FileList) => {
		setSelectedFilesPdf((prevFiles) => [...prevFiles, ...Array.from(files)])
	}

	const handleFilePdfSelection = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			addFiles(event.target.files)
		}
	}

	return { selectedFilesPdf, handleFilePdfSelection, setSelectedFilesPdf }
}

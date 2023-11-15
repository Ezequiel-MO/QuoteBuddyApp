import React, { useState } from 'react'

interface LogoUploadProps {
	onUpload: (file: File) => void
}

export const LogoUpload: React.FC<LogoUploadProps> = ({ onUpload }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [error, setError] = useState<string>('')

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null
		if (file) {
			if (!['image/jpeg', 'image/png'].includes(file.type)) {
				setError('Please upload a JPG or PNG image.')
				return
			}
			// Check if file.size is less than 450 KB
			if (file.size < 450 * 1024) {
				setError('The image is too small. The minimum size is 450KB.')
				return
			}
			setSelectedFile(file)
			setError('')
			onUpload(file)
		} else {
			setError('')
			setSelectedFile(null)
		}
	}

	return (
		<div className="flex flex-col items-center p-4 border-2 border-gray-600 bg-gray-800 rounded-md shadow-md space-y-2">
			<p className="text-gray-300 text-sm mb-2">
				Accepted formats: JPG, PNG. Minimum size: 450KB.
			</p>
			<input
				type="file"
				accept=".jpg, .jpeg, .png"
				onChange={handleFileChange}
				className="hidden"
				id="logo-upload"
			/>
			<label
				htmlFor="logo-upload"
				className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-150 ease-in-out"
			>
				Choose a file or drag it here
			</label>
			{selectedFile && (
				<p className="text-gray-300 text-sm">{selectedFile.name}</p>
			)}
			{error && <p className="text-red-500 text-sm">{error}</p>}
		</div>
	)
}

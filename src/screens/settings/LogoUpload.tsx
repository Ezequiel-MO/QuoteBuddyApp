import React, { useState, useRef, DragEvent, useEffect, FC } from 'react'

interface LogoUploadProps {
	onUpload: (file: File) => void,
	setting: any
}

export const LogoUpload: FC<LogoUploadProps> = ({ onUpload, setting }) => {
	const fileInput = useRef<HTMLInputElement>(null)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [error, setError] = useState<string>('')
	const [isDrop, setIsDrop] = useState(false)

	const [prevImage, setPrevImage] = useState("")
	useEffect(() => {
		if (setting !== undefined) {
			setPrevImage(setting.logo)
		}
	}, [setting])

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
			// onUpload(file)
		} else {
			setError('')
			setSelectedFile(null)
		}
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "copy"// Especifica que la acción que va mostrar el drop
	};

	const handleDradEnter = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDrop(true)
	}

	const handleDradLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		const dropArea = e.currentTarget
		const isDropArea = dropArea.contains(e.relatedTarget as Node)
		if (!isDropArea) {
			setIsDrop(false)
		}
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		// Obtener el primer archivo arrastrado
		const file = e.dataTransfer.files[0]
		if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
			if (file.size < 450 * 1024) {
				// setError('The image is too small. The minimum size is 450KB.')
				// return
			}
			setSelectedFile(file)
			setPrevImage(URL.createObjectURL(file))
			setError('')
			onUpload(file) // Llamo a la funcion  para que directemente haga un path a la api
		} else {
			setError('Please upload a JPG or PNG image.');
		}
	}

	useEffect(() => {
		setIsDrop(false)
	}, [error, selectedFile])


	return (
		<div
			className={`flex flex-col items-center p-4 border-2 border-gray-600 ${!isDrop ? "bg-gray-800" : "bg-red-800"}  rounded-md shadow-md space-y-2 max-h-[300px]`}
			onDragOver={(e) => handleDragOver(e)}
			onDragEnter={(e) => handleDradEnter(e)}
			onDragLeave={(e) => handleDradLeave(e)}
			onDrop={(e) => handleDrop(e)}
		>
			<p className="text-gray-300 text-sm mb-2">
				Accepted formats: JPG, PNG. Minimum size: 450KB.
			</p>
			<input
				type="file"
				accept=".jpg, .jpeg, .png"
				className="hidden"
				id="logo-upload"
				ref={fileInput}
				multiple={false}
				onChange={handleFileChange}
			/>
			<label
				htmlFor="logo-upload"
				className="mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition duration-150 ease-in-out"
			>
				{!isDrop ? "Choose a file or drag it here" : " DRAG TO FILE HERE"}
			</label>
			{selectedFile && (
				<p className="text-gray-300 text-sm">{selectedFile.name}</p>
			)}
			{error && <p className="text-red-500 text-sm">{error}</p>}
			{
				prevImage &&
				<div className="relative bottom-[90px] right-0" style={{ marginLeft: "55%", width: "350px" }}>
					<img
						src={prevImage}
						loading='lazy'
						style={{ width: "100%", height: "220px", objectFit: "contain" }}
					/>
				</div>
			}
		</div>
	)
}

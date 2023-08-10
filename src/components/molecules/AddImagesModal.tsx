import { useState, useEffect, RefObject, FC } from 'react'
import { ImageList, ImageListItem } from '@mui/material'
import { Icon } from '@iconify/react'
import { ModalComponent } from '../atoms'

// Definimos los tipos para las props del componente
interface AddImagesModalProps {
	open: boolean
	setOpen: (open: boolean) => void
	handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void //va un funcion que recibe un "evento" de tipo onchange
	setSelectedFiles: (files: File[]) => void // va ser una funcion que no retorna y va recibir un array de tipo "File"
	selectedFiles: File[]
	fileInput: RefObject<HTMLInputElement> // le digo que es de tipo input
	multipleCondition: boolean
}

interface ImageUrl {
	url: string
	name: string
}

export const AddImagesModal: FC<AddImagesModalProps> = ({
	open,
	setOpen,
	handleFileSelection,
	setSelectedFiles,
	selectedFiles,
	fileInput,
	multipleCondition
}) => {
	const [imagePreviewUrls, setImagePreviewUrls] = useState<ImageUrl[]>([])

	useEffect(() => {
		const imageUrls = selectedFiles.map((el): ImageUrl => {
			return {
				url: URL.createObjectURL(el),
				name: el.name
			}
		})
		setImagePreviewUrls(imageUrls)
	}, [selectedFiles])

	const handleDeletedImage = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		imagenUrl: ImageUrl
	) => {
		const newImageUrls = imagePreviewUrls.filter(
			(el) => el.url !== imagenUrl.url
		)
		const newFilesImages = selectedFiles.filter(
			(el) => el.name !== imagenUrl.name
		)
		setImagePreviewUrls(newImageUrls)
		setSelectedFiles(newFilesImages)
	}

	return (
		<ModalComponent open={open} setOpen={setOpen}>
			<ImageList sx={{ width: 590, height: 450 }} cols={3} rowHeight={164}>
				{imagePreviewUrls.map((el, index) => (
					<ImageListItem key={index} style={{ position: 'relative' }}>
						<div
							style={{
								position: 'absolute',
								cursor: 'pointer',
								color: 'red',
								margin: '1px'
							}}
							onClick={(e) => handleDeletedImage(e, el)}
						>
							<Icon icon="material-symbols:cancel" width="30" />
						</div>
						<img
							className="w-40 h-40 object-cover object-center"
							src={el.url}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
			<fieldset className="grid grid-cols-2 gap-4">
				<div
					className="flex align-center justify-start"
					style={{ marginTop: '10px' }}
				>
					<input
						style={{ color: 'transparent' }}
						id="file-upload"
						type="file"
						ref={fileInput}
						name="imageContentUrl"
						multiple={multipleCondition}
						onChange={(e) => handleFileSelection(e)}
					/>
					<span style={{ position: 'absolute', marginLeft: '100px' }}>
						{`${selectedFiles.length} files selected for upload`}
					</span>
					<button
						style={{ position: 'absolute', right: '60px' }}
						className="cursor-pointer w-32 h-8  hover:bg-gray-600 bg-green-200 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
						type="button"
						onClick={() => setOpen(false)}
					>
						ADD IMAGE/S
					</button>
				</div>
			</fieldset>
		</ModalComponent>
	)
}

import { useRef, useState, useEffect, useMemo } from 'react'
import { Form, Formik } from 'formik'
import { Icon } from '@iconify/react'
import pdfLogo from '../../assets/pdf_logo.jpg'
import { ModalComponent } from '../atoms'
import { ImageList, ImageListItem } from '@mui/material'

export const ModalPictures = ({
	submitForm,
	screen,
	open,
	setOpen,
	initialValues,
	nameScreen,
	multipleCondition
}) => {
	const fileInput = useRef()
	const [imagePreviewUrls, setImagePreviewUrls] = useState([])
	const [filesImages, setFilesImages] = useState([])
	const [deletedImage, setDeletedImage] = useState([])
	const update = Object.keys(screen).length > 0 ? true : false

	useEffect(() => {
		setFilesImages([])
		setDeletedImage([])
		if (update && screen?.imageContentUrl.length > 0) {
			const images = [...screen.imageContentUrl]
			const imageUrls = images.map(el => {
				return {
					url: el,
					name: el
				}
			})
			setImagePreviewUrls(imageUrls)
		}
	}, [screen, open])


	const handleUploadImages = () => {
		const files = Array.from(fileInput.current.files) // Convierte FileList en un array "[...fileInput.current.files] con spread operator tambien funciona"
		const imageUrls = files.map(file => {
			return {
				url: URL.createObjectURL(file), // Crea URLs para cada archivo , va servir para renderizar lo que se sube
				name: file.name  // nombre real de la imagen , lo guardo para eleminarla del estado "filesImages"
			}
		})
		setImagePreviewUrls([...imagePreviewUrls, ...imageUrls]) // Almacena las URLs en el estado
		setFilesImages([...filesImages, ...fileInput.current.files])
	}

	const handleDeletedImage = (e, imagenUrl) => {
		const newImageUrls = imagePreviewUrls.filter(el => el.url !== imagenUrl.url)
		const newFilesImages = filesImages.filter(el => el.name !== imagenUrl.name)
		setImagePreviewUrls(newImageUrls)
		setFilesImages(newFilesImages)
		//si es una imagen de amazon web service lo mando al estado "deletedImage"
		if (imagenUrl?.url.includes("amazonaws")) {
			setDeletedImage([...deletedImage, imagenUrl?.url])
		}
	}

	const imageContentUrl = useMemo(() => {
		return imagePreviewUrls.map((el) => {
			if (el?.url.includes("amazon")) {
				return el.url
			}
		}).filter(el => el)
	}, [imagePreviewUrls])
	

	return (
		<>
			<ModalComponent open={open} setOpen={setOpen}>
				<ImageList sx={{ width: 590, height: 450 }} cols={3} rowHeight={164}>
					{imagePreviewUrls?.map((item, index) => (
						<ImageListItem key={index} style={{ position: 'relative' }}>
							<div
								style={{
									position: 'absolute',
									cursor: 'pointer',
									color: 'red',
									margin: '1px'
								}}
								onClick={(e) => handleDeletedImage(e, item)}
							>
								<Icon icon="material-symbols:cancel" width="30" />
							</div>
							{!item?.url.toLowerCase().includes('pdf') ? (
								<img
									className="w-40 h-40 object-cover object-center"
									src={item.url}
									loading="lazy"
								/>
							) : (
								<img src={pdfLogo} loading="lazy" />
							)}
						</ImageListItem>
					))}
				</ImageList>
				<div className="flex align-center justify-end p-4">
					<Formik
						initialValues={initialValues}
						onSubmit={(values) => {
							values['imageContentUrl'] = imageContentUrl
							values['deletedImage'] = deletedImage
							submitForm(
								values,
								filesImages ?? [],
								`${nameScreen}/image`,
								update
							)
						}}
					>
						{() => (
							<div>
								<Form>
									<fieldset className="grid grid-cols-2 gap-4">
										<div className="flex align-center justify-start">
											<input
												style={{ color: "transparent" }}
												id="file-upload"
												type="file"
												ref={fileInput}
												name="imageContentUrl"
												multiple={multipleCondition}
												onChange={handleUploadImages}
											/>
											<span style={{position:"absolute", marginTop:"30px"}} >
												{`${filesImages.length} files selected for upload`}
											</span>
										</div>
										<input
											type="submit"
											className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value="Edit now"
										/>
									</fieldset>
								</Form>
							</div>
						)}
					</Formik>
				</div>
			</ModalComponent>
		</>
	)
}

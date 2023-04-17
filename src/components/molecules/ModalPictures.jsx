import { useRef, useState } from 'react'
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
	const [imgList, setImgList] = useState([])
	const [isUpdate, setIsUpdate] = useState(false)

	const fileInput = useRef()

	const update = Object.keys(screen).length > 0 ? true : false

	return (
		<>
			<ModalComponent open={open} setOpen={setOpen}>
				<ImageList sx={{ width: 520, height: 450 }} cols={3} rowHeight={164}>
					{screen?.imageContentUrl?.map((item, index) => (
						<ImageListItem key={index} style={{ position: 'relative' }}>
							<div
								style={{
									position: 'absolute',
									cursor: 'pointer',
									color: 'red',
									margin: '1px'
								}}
								onClick={() => {
									const arr = [...imgList]
									if (index > -1) {
										arr.push(screen.imageContentUrl[index])
										setImgList(arr)
										screen.imageContentUrl.splice(index, 1) // 2nd parameter means remove one item only
									}
									setIsUpdate(!isUpdate)
								}}
							>
								<Icon icon="material-symbols:cancel" width="30" />
							</div>
							{!item?.toLowerCase().includes('pdf') ? (
								<img
									src={`${item}?w=164&h=164&fit=crop&auto=format`}
									srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
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
							values['imageContentUrl'] = screen.imageContentUrl
							values['deletedImage'] = imgList
							submitForm(
								values,
								fileInput.current.files ?? [],
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
											<label
												htmlFor="file-upload"
												className="custom-file-upload"
											></label>
											<input
												id="file-upload"
												type="file"
												ref={fileInput}
												name="imageContentUrl"
												multiple={multipleCondition}
											/>
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

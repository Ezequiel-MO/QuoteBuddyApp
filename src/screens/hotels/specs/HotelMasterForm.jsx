import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures, ShowImagesButton } from '../../../components/molecules'
import { getValidationSchema, HotelFormFields, getInitialValues } from '../'

export const HotelMasterForm = ({ submitForm, hotel }) => {
	const [open, setOpen] = useState(false)
	const fileInput = useRef(null)
	const { locations } = useGetLocations()
	const initialValues = getInitialValues(hotel)

	const imagesHotel = hotel.imageContentUrl ?? []
	const update = Object.keys(hotel).length > 0

	const [textContent, setTextContent] = useState()

	const { selectedFiles, handleFileSelection } = useImageState()

	return (
		<>
			<ModalPictures
				screen={hotel}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="hotels"
			/>

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					values.textContent = textContent
					submitForm(values, selectedFiles, 'hotels', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form className="relative">
							<HotelFormFields
								formik={formik}
								locations={locations}
								imagesHotel={imagesHotel}
								fileInput={fileInput}
								update={update}
								setTextContent={setTextContent}
								textContent={textContent}
								hotel={hotel}
								handleFileSelection={handleFileSelection}
							/>
							<ShowImagesButton name={hotel.name} setOpen={setOpen} />
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

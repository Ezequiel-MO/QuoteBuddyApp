import { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures } from '../../../components/molecules'
import {
	getValidationSchema,
	getInitialValues,
	RestaurantFormFields
} from '../'
import { ShowImagesButton } from '../../../components/atoms'

const RestaurantMasterForm = ({
	submitForm,
	restaurant,
	formData,
	setFormData,
	textContent,
	setTextContent
}) => {
	const [open, setOpen] = useState(false)

	const fileInput = useRef()
	const { locations } = useGetLocations()
	const initialValues = getInitialValues(restaurant, formData)
	const imagesRestaurant = restaurant.imageContentUrl ?? []
	const update = Object.keys(restaurant).length > 0 ? true : false

	const { selectedFiles, handleFileSelection } = useImageState()

	return (
		<>
			<ModalPictures
				screen={restaurant}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="restaurants"
			/>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					values.textContent = textContent
					setFormData(values)
					submitForm(values, selectedFiles, 'restaurants', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="p-6 rounded-lg bg-white">
						<Form className="relative">
							<RestaurantFormFields
								formik={formik}
								restaurant={restaurant}
								setTextContent={setTextContent}
								textContent={textContent}
								locations={locations}
								imagesRestaurant={imagesRestaurant}
								fileInput={fileInput}
								update={update}
								handleFileSelection={handleFileSelection}
							/>
							<ShowImagesButton name={restaurant.name} setOpen={setOpen} />
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default RestaurantMasterForm

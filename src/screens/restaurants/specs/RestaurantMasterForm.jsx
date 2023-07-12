import { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures } from '../../../components/molecules'
import { getValidationSchema, RestaurantFormFields } from '../'
import { ShowImagesButton } from '../../../components/atoms'
import { generateFormValues } from '../../../helper'
import { formsValues } from '../../../constants'

const RestaurantMasterForm = ({
	submitForm,
	restaurant,

	setFormData,
	textContent,
	setTextContent,
	update
}) => {
	const [open, setOpen] = useState(false)

	const fileInput = useRef()
	const { locations } = useGetLocations()
	const initialValues = generateFormValues(formsValues.restaurant, restaurant)
	const imagesRestaurant = restaurant.imageContentUrl ?? []

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
					<div className="p-6 rounded">
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

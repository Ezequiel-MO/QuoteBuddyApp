import { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations } from '../../../hooks'
import { ModalPictures, ShowImagesButton } from '../../../components/molecules'
import {
	getValidationSchema,
	getInitialValues,
	RestaurantFormFields
} from '../'

const RestaurantMasterForm = ({ submitForm, restaurant }) => {
	const [open, setOpen] = useState(false)

	const fileInput = useRef()
	const { locations } = useGetLocations()
	const initialValues = getInitialValues(restaurant)
	const imagesRestaurant = restaurant.imageContentUrl ?? []
	const update = Object.keys(restaurant).length > 0 ? true : false

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
					const uploadedFiles = fileInput.current?.files ?? []
					submitForm(values, uploadedFiles, 'restaurants', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form className="relative">
							<RestaurantFormFields
								formik={formik}
								locations={locations}
								imagesRestaurant={imagesRestaurant}
								fileInput={fileInput}
								update={update}
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

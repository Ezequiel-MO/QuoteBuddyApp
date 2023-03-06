import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations } from '../../../hooks'
import { ModalPictures } from '../../../components/molecules'
import { getValidationSchema } from './HotelFormValidation'
import { HotelFormFields } from './HotelFormFields'
import { getInitialValues } from './HotelFormInitialValues'

const HotelMasterForm = ({ submitForm, hotel }) => {
	const [open, setOpen] = useState(false)
	const fileInput = useRef()
	const { locations } = useGetLocations()
	const initialValues = getInitialValues(hotel)

	const imagesHotel =
		hotel.imageContentUrl === undefined ? [] : hotel.imageContentUrl

	const update = Object.keys(hotel).length > 0 ? true : false

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
					submitForm(values, fileInput.current ?? [], 'hotels', update)
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
							/>
							<div className="absolute bottom-0 right-0">
								{hotel?.name && (
									<div className="flex align-center justify-start">
										<input
											onClick={() => setOpen(true)}
											type="button"
											className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value="Show images"
										/>
									</div>
								)}
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default HotelMasterForm

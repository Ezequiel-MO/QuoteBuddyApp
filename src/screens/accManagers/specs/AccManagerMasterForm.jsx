import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { ModalPictures } from '../../../components/molecules'
import {
	AccManagerFormFields,
	getInitialValues,
	getValidationSchema
} from '../'
import { ShowImagesButton } from '../../../components/atoms'

const AccManagerMasterForm = ({ submitForm, accManager }) => {
	const fileInput = useRef()
	const [open, setOpen] = useState(false)
	const initialValues = getInitialValues(accManager)

	const imagesAccManager = accManager.imageContentUrl ?? []
	const update = Object.keys(accManager).length > 0

	return (
		<>
			<ModalPictures
				screen={accManager}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={false}
				nameScreen="accManagers"
			/>

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					const uploadedFiles = fileInput.current?.files ?? []
					submitForm(values, uploadedFiles, 'accManagers', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{() => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form className="relative">
							<AccManagerFormFields
								imagesAccManager={imagesAccManager}
								fileInput={fileInput}
								update={update}
							/>
							<ShowImagesButton name={accManager.firstName} setOpen={setOpen} />
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default AccManagerMasterForm

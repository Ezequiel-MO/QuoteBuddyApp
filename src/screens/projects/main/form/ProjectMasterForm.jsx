import * as Yup from 'yup'
import { useState } from "react"
import { Form, Formik } from 'formik'
import { Icon } from '@iconify/react'
import { CompanySelect } from "./input/CompanySelect"
import { ClientSelect } from "./input/ClientSelect"
import { SelectBuget } from "./input/SelectBuget"
import {
	TextInput,
	SelectInput,
	AccountManagerSelect
} from '../../../../ui/'
import {
	useGetLocations,
	useGetAccManagers,
	useGetCompanies,
} from '../../../../hooks'
import { ModalPictures, ShowImagesButton } from "../../../../components/molecules"
import { ProjectFormFields } from "./ProjectFormFields"


export const ProjectMasterForm = ({ submitForm, project, fileInput }) => {
	const { locations } = useGetLocations()
	const { accManagers } = useGetAccManagers()
	const { companies } = useGetCompanies()

	const getAccManagerInitialValue = () => {
		if (project && project.accountManager && project.accountManager[0]?.email) {
			return `${project.accountManager[0]._id}`
		}
		return ''
	}

	const getClientAccManagerInitialValue = () => {
		if (
			project &&
			project.clientAccManager &&
			project.clientAccManager[0]?.email
		) {
			return `${project.clientAccManager[0]._id}`
		}
		return ''
	}

	const update = Object.keys(project).length > 0 ? true : false

	const pdfProyect = project?.imageContentUrl || []

	const bugetTypes = [
		{ name: "No budget", value: "noBudget" },
		{ name: "Budget", value: "budget" },
		{ name: "External PDF", value: "budgetAsPdf" }
	]

	const [open, setOpen] = useState(project?.budget === "budgetAsPdf" ? true : false)
	const [modalOpen, setModalOpen] = useState(false)


	const getClientCompanyInitialValue = () => {
		if (
			project &&
			project.clientCompany &&
			project.clientCompany[0]?._id
		) {
			return `${project.clientCompany[0]._id}`
		}
		return ''
	}


	const initialValues = {
		code: project?.code ?? '',
		accountManager: getAccManagerInitialValue(),
		clientAccManager: getClientAccManagerInitialValue(),
		clientCompany: getClientCompanyInitialValue(),
		groupName: project?.groupName ?? '',
		groupLocation: project?.groupLocation ?? '',
		arrivalDay: project?.arrivalDay ?? '',
		departureDay: project?.departureDay ?? '',
		nrPax: project?.nrPax ?? '',
		status: project?.status ?? '',
		estimate: project?.estimate ?? '',
		suplementaryText: project?.suplementaryText ?? true,
		hasBudget: project?.hasBudget ?? true,
		hasSideMenu: project?.hasSideMenu ?? true,
		hasExternalCorporateImage: project?.hasExternalCorporateImage ?? false,
		budget: project?.budget ?? ""
	}


	return (
		<>
			<ModalPictures
				screen={project}
				submitForm={submitForm}
				open={modalOpen}
				setOpen={setModalOpen}
				initialValues={initialValues}
				multipleCondition={false}
				nameScreen={"projects"}
			/>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					submitForm(values, fileInput.current?.files ?? [], 'projects', update, open)
				}}
				enableReinitialize={true}
				validationSchema={Yup.object({
					code: Yup.string().required('Required'),
					accountManager: Yup.string().required('Required'),
					clientAccManager: Yup.string().required('Required'),
					groupName: Yup.string().required('Required'),
					groupLocation: Yup.string().required('Required'),
					arrivalDay: Yup.string().required('Required'),
					departureDay: Yup.string().required('Required'),
					nrPax: Yup.number().required('Required'),
					status: Yup.string().required('Required'),
					estimate: Yup.number(),
					clientCompany: Yup.string().required('Required'),
					budget: Yup.string().required("Required")
				})}
			>
				{(formik) => (
					<div className="grid grid-cols-2 gap-2 px-6 rounded-lg shadow-lg bg-white">
						<Form>
							<ProjectFormFields
								accManagers={accManagers}
								bugetTypes={bugetTypes}
								companies={companies}
								fileInput={fileInput}
								formik={formik}
								locations={locations}
								open={open}
								pdfProyect={pdfProyect}
								project={project}
								setModalOpen={setModalOpen}
								setOpen={setOpen}
								update={update}
							/>

						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

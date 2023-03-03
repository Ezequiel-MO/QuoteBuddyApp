import * as Yup from 'yup'
import { useState } from "react"
import { Form, Formik } from 'formik'
import { CompanyAndClientSelect } from "./CompanyAndClientSelect"
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

export const ProjectMasterForm = ({ submitForm, project }) => {
	const { locations } = useGetLocations()
	const { accManagers } = useGetAccManagers()
	const { companies } = useGetCompanies()

	const getAccManagerInitialValue = () => {
		if (project && project.accountManager && project.accountManager[0].email) {
			return `${project.accountManager[0]._id}`
		}
		return ''
	}

	const getClientAccManagerInitialValue = () => {
		if (
			project &&
			project.clientAccManager &&
			project.clientAccManager[0].email
		) {
			return `${project.clientAccManager[0]._id}`
		}
		return ''
	}

	const update = Object.keys(project).length > 0 ? true : false

	// const [companyId, setCompanyId] = useState(update ? project?.clientCompany[0]?._id : "")
	// const handleChange = (event) => {
	//     setCompanyId(event.target.value)
	// }

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
		hasExternalCorporateImage: project?.hasExternalCorporateImage ?? false
	}


	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					submitForm(values, 'projects', update)
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
					clientCompany: Yup.string().required('Required')
				})}
			>
				{(formik) => (
					<div className="grid grid-cols-2 gap-2 px-6 rounded-lg shadow-lg bg-white">
						<Form>
							<fieldset>
								<legend>
									<h1 className="text-2xl mb-4">Base Project</h1>
								</legend>
								<div className="form-group">
									<div className="mb-6 flex items-center grid-cols-3 gap-4">
										<TextInput
											label="Code"
											name="code"
											placeholder="ex : BEM2022001..."
											type="text"
										/>
										<TextInput
											label="Nr of Pax"
											name="nrPax"
											placeholder="ex : 20..."
											type="number"
										/>
										<TextInput
											label="Side Menu"
											name="hasSideMenu"
											className="form-control w-7 h-8 rounded-full"
											type="checkbox"
										/>
										<div className='ml-10'>
											<TextInput
												label="Corp.img"
												name="hasExternalCorporateImage"
												className="form-control w-7 h-8 rounded-full"
												type="checkbox"
											/>
										</div>
									</div>
									<div className="flex items-center justify-between my-4">
										<TextInput
											label="Arrival Day"
											name="arrivalDay"
											type="date"
										/>

										<TextInput
											label="Departure Day"
											name="departureDay"
											type="date"
										/>
										<TextInput
											label="Supl.Text"
											name="suplementaryText"
											className="form-control w-7 h-8 rounded-full"
											type="checkbox"
										/>
										<TextInput
											label="Budget"
											name="hasBudget"
											className="form-control w-7 h-8 rounded-full"
											type="checkbox"
										/>
									</div>


									<AccountManagerSelect
										label="Account Manager"
										name="accountManager"
										placeholder="Account Manager ..."
										options={accManagers}
										value={formik.values.accountManager}

									/>

									<CompanyAndClientSelect
										label="Company"
										options={companies}
										name="clientCompany"
										valueCompany={formik.values.clientCompany}
										valueClient={formik.values.clientAccManager}
									/>


									<TextInput
										label="Group Name"
										name="groupName"
										placeholder="ex : Pfizer group ..."
										type="text"
									/>

									<SelectInput
										label="Group Location"
										name="groupLocation"
										placeholder="Barcelona ..."
										options={locations}
										value={formik.values.groupLocation}
									/>

									<SelectInput
										label="Project Status"
										name="status"
										options={[
											'Received',
											'Sent',
											'Confirmed',
											'Cancelled',
											'Invoiced'
										]}
										value={formik.values.status}
									/>

									<TextInput
										label="Estimate turnover"
										name="estimate"
										placeholder="ex : 80000"
										type="number"
									/>

									<div className="form-group mb-6">
										<div className="flex space-x-2 justify-center mt-4">
											<button
												className="inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
												type="submit"
											>
												Save and submit
											</button>
										</div>
									</div>
								</div>
							</fieldset>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

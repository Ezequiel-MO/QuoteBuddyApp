import { FC, RefObject } from 'react'
import { TextInput } from '@components/atoms'
import { ProjectBudgetSelector } from './ProjectBudgetSelector'
import { ProjectAccManagersSelector } from './ProjectAccManagersSelector'
import { ProjectCompanySelector } from './ProjectCompanySelector'
import { ProjectClientSelector } from './ProjectClientSelector'
import { SelectLocation } from '../../../../components/molecules'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import { ProjectLanguageSelector } from './ProjectLanguageSelector'
import { IProject } from 'src/interfaces'

interface IProjectData {
	code: string
	nrPax: number
	multiDestination: boolean
	hideDates: boolean
	hasSideMenu: boolean
	hasExternalCorporateImage: boolean
	suplementaryText: boolean
	arrivalDay: string
	departureDay: string
	budget: string
	accountManager: string
	clientCompany: string
	clientAccManager: string
	groupName: string
	groupLocation: string
	status: string
	estimate: number
	languageVendorDescriptions: string
}

interface ProjectFormFieldsProps {
	data: IProjectData
	setData: React.Dispatch<React.SetStateAction<any>>
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	update: boolean
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	fileInput: RefObject<HTMLInputElement>
	project: IProject
	openModal: boolean
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const bugedtTypes = [
	{ name: 'No budget', value: 'noBudget' },
	{ name: 'Budget', value: 'budget' },
	{ name: 'External PDF', value: 'budgetAsPdf' }
]

const typesStatus = ['Received', 'Sent', 'Confirmed', 'Cancelled', 'Invoiced']

export const ProjectFormFields: FC<ProjectFormFieldsProps> = ({
	data,
	setData,
	handleChange,
	handleChangeCheckbox,
	errors,
	handleBlur,
	update,
	open,
	setOpen,
	fileInput,
	project,
	openModal,
	setOpenModal
}) => {
	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-primary">General Base Project Data</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					type="text"
					label="Code"
					placeholder="ex : BEM2022001..."
					name="code"
					value={data.code}
					handleChange={handleChange}
					errors={errors.code}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Nr of Pax"
					placeholder="ex: 20"
					name="nrPax"
					value={data.nrPax}
					handleChange={handleChange}
					errors={errors.nrPax}
					handleBlur={handleBlur}
				/>
				<div className="flex space-x-24">
					<TextInput
						type="checkbox"
						label="Multi Destination"
						name="multiDestination"
						value={data.multiDestination}
						checked={data.multiDestination}
						handleChange={handleChangeCheckbox}
						errors={errors.multiDestination}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="checkbox"
						label="Side Menu"
						name="hasSideMenu"
						value={data.hasSideMenu}
						checked={data.hasSideMenu}
						handleChange={handleChangeCheckbox}
						errors={errors.hasSideMenu}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="checkbox"
						label="Corporate Image"
						name="hasExternalCorporateImage"
						value={data.hasExternalCorporateImage}
						checked={data.hasExternalCorporateImage}
						handleChange={handleChangeCheckbox}
						errors={errors.hasExternalCorporateImage}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="checkbox"
						label="Suplementary Text"
						name="suplementaryText"
						value={data.suplementaryText}
						checked={data.suplementaryText}
						handleChange={handleChangeCheckbox}
						errors={errors.suplementaryText}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="checkbox"
						label="Hide Dates"
						name="hideDates"
						value={data.hideDates}
						checked={data.hideDates}
						handleChange={handleChangeCheckbox}
						errors={errors.hideDates}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="flex space-x-4">
					<TextInput
						type="date"
						label="Arrival Day"
						name="arrivalDay"
						value={data.arrivalDay}
						handleChange={handleChange}
						errors={errors.arrivalDay}
						handleBlur={handleBlur}
					/>
					<TextInput
						type="date"
						label="Departure Day"
						name="departureDay"
						value={data.departureDay}
						handleChange={handleChange}
						errors={errors.departureDay}
						handleBlur={handleBlur}
					/>
				</div>
				<ProjectBudgetSelector
					options={bugedtTypes}
					budget={data.budget}
					handleChange={handleChange}
					errors={errors}
					handleBlur={handleBlur}
					open={open}
					setOpen={setOpen}
					fileInput={fileInput}
					project={project}
					openModal={openModal}
					setOpenModal={setOpenModal}
				/>
				<ProjectAccManagersSelector
					accManagerValue={data.accountManager}
					handleChange={handleChange}
					errors={errors}
					handleBlur={handleBlur}
				/>
				<ProjectCompanySelector
					clientCompany={data.clientCompany}
					setData={setData}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors}
				/>
				<ProjectClientSelector
					clientCompany={data.clientCompany}
					client={data.clientAccManager}
					handleChange={handleChange}
					errors={errors}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="text"
					label="Group Name"
					name="groupName"
					value={data.groupName}
					handleChange={handleChange}
					errors={errors.groupName}
					handleBlur={handleBlur}
				/>
				<div>
					<label className="block uppercase text-lg text-gray-400 font-medium mb-2">
						Group Location
					</label>
					<SelectLocation
						city={data.groupLocation as string}
						setData={setData}
						handleChange={handleChange}
						name="groupLocation"
					/>
					{errors.groupLocation && !data.groupLocation && (
						<p className="text-red-500 mt-1" style={{ marginLeft: '65%' }}>
							{errors.groupLocation}
						</p>
					)}
				</div>
				<ProjectStatusSelector
					options={typesStatus}
					status={data.status}
					handleChange={handleChange}
					errors={errors}
					handleBlur={handleBlur}
				/>
				<div>
					<label className="block uppercase text-lg text-gray-400 font-medium mb-1">
						language Vendor Descriptions
					</label>
					<ProjectLanguageSelector
						handleChange={handleChange}
						languageVendorDescriptions={data.languageVendorDescriptions}
						handleBlur={handleBlur}
						errors={errors}
					/>
				</div>
				<TextInput
					type="number"
					label="Estimate turnover"
					placeholder="ex : 80000"
					name="estimate"
					value={data.estimate}
					handleChange={handleChange}
					errors={errors.estimate}
					handleBlur={handleBlur}
				/>
			</div>
		</fieldset>
	)
}

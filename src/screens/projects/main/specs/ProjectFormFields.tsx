import { useRef, useState } from 'react'
import { TextInput } from '@components/atoms'
import { ProjectBudgetSelector } from './ProjectBudgetSelector'
import { ProjectAccManagersSelector } from './ProjectAccManagersSelector'
import { ProjectCompanySelector } from './ProjectCompanySelector'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import { ProjectLanguageSelector } from './ProjectLanguageSelector'
import { useCurrentProject } from 'src/hooks'
import { LocationSelector } from '@components/molecules/LocationSelector'
import { ProjectClientSelector } from './ProjectClientSelector'
import { IProject } from '@interfaces/index'

const budgetTypes = [
	{ name: 'No budget', value: 'noBudget' },
	{ name: 'Budget', value: 'budget' },
	{ name: 'External PDF', value: 'budgetAsPdf' }
]

const typesStatus = ['Received', 'Sent', 'Confirmed', 'Cancelled', 'Invoiced']

interface Props {
	currentProject: IProject
}

export const ProjectFormFields = ({ currentProject }: Props) => {
	const { handleProjectInputChange } = useCurrentProject()

	const [openPdfInput, setOpenPdfInput] = useState<boolean>(false)
	const fileInput = useRef<HTMLInputElement>(null)
	const [openModal, setOpenModal] = useState<boolean>(false)

	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					Project Data
				</h1>
			</legend>

			<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
				<TextInput
					type="text"
					label="Project Code"
					placeholder="ex: BEM2022001..."
					name="code"
					value={currentProject.code}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="number"
					label="Nr.Participants"
					placeholder="ex: 20"
					name="nrPax"
					value={currentProject.nrPax}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="number"
					label="Estimated Turnover"
					placeholder="ex: 80000"
					name="estimate"
					value={currentProject.estimate}
					handleChange={handleProjectInputChange}
				/>
			</div>

			<div className="grid gap-4 grid-cols-2 md:grid-cols-3">
				<TextInput
					type="date"
					label="Arrival Date"
					name="arrivalDay"
					value={currentProject.arrivalDay}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="date"
					label="Departure Date"
					name="departureDay"
					value={currentProject.departureDay}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="text"
					label="Group Name"
					name="groupName"
					placeholder='ex: "The Best Group"'
					value={currentProject.groupName}
					handleChange={handleProjectInputChange}
				/>
			</div>

			<div className="col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Location
				</label>
				<LocationSelector
					city={currentProject?.groupLocation as string}
					name="groupLocation"
					handleChange={handleProjectInputChange}
				/>
			</div>

			<div className="col-span-2 md:col-span-4 flex flex-wrap justify-between gap-4 mt-2">
				<TextInput
					type="checkbox"
					label="Multi Destination"
					name="multiDestination"
					value={currentProject.multiDestination}
					checked={currentProject.multiDestination}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="checkbox"
					label="Side Menu"
					name="hasSideMenu"
					value={currentProject.hasSideMenu}
					checked={currentProject.hasSideMenu}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="checkbox"
					label="Corporate Image"
					name="hasExternalCorporateImage"
					value={currentProject.hasExternalCorporateImage}
					checked={currentProject.hasExternalCorporateImage}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="checkbox"
					label="Supplementary Text"
					name="suplementaryText"
					value={currentProject.suplementaryText}
					checked={currentProject.suplementaryText}
					handleChange={handleProjectInputChange}
				/>
				<TextInput
					type="checkbox"
					label="Hide Dates"
					name="hideDates"
					value={currentProject.hideDates}
					checked={currentProject.hideDates}
					handleChange={handleProjectInputChange}
				/>
			</div>

			<ProjectBudgetSelector
				options={budgetTypes}
				budget={currentProject.budget}
				handleChange={handleProjectInputChange}
				open={openPdfInput}
				setOpen={setOpenPdfInput}
				fileInput={fileInput}
				project={currentProject}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>

			<div className="col-span-1 sm:col-span-2 mb-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Account Manager
				</label>
				<ProjectAccManagersSelector
					accManagerValue={currentProject?.accountManager[0]?.email ?? ''}
					handleChange={handleProjectInputChange}
				/>
			</div>

			<div className="col-span-1 sm:col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Client Company
				</label>
				{/* <ProjectCompanySelector
					handleChange={handleProjectInputChange}
					clientCompany={currentProject.clientCompany[0]?._id || ''}
				/> */}
			</div>

			<div className="col-span-1 sm:col-span-2 mb-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Client
				</label>
				<ProjectClientSelector
					handleChange={handleProjectInputChange}
					selectedClient={currentProject?.clientAccManager[0]?._id || ''}
				/>
			</div>

			<label className="uppercase text-xl text-gray-600 font-bold mr-2">
				Project Status
			</label>
			<ProjectStatusSelector
				options={typesStatus}
				status={currentProject.status}
				handleChange={handleProjectInputChange}
			/>

			<div className="md:col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Language Vendor Descriptions
				</label>
				<ProjectLanguageSelector
					languageVendorDescriptions={
						currentProject?.languageVendorDescriptions || ''
					}
					handleChange={handleProjectInputChange}
				/>
			</div>
		</fieldset>
	)
}

import { useRef, useState } from 'react'
import { TextInput } from '@components/atoms'
import { ProjectBudgetSelector } from './ProjectBudgetSelector'
import { ProjectAccManagersSelector } from './ProjectAccManagersSelector'
import { ProjectCompanySelector } from './ProjectCompanySelector'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import { ProjectLanguageSelector } from './ProjectLanguageSelector'
import { LocationSelector } from '@components/molecules/LocationSelector'
import { ProjectClientSelector } from './ProjectClientSelector'
import { IProject } from '@interfaces/index'
import { useProject } from '@screens/projects/context/ProjectContext'

const budgetTypes = [
	{ name: 'No budget', value: 'noBudget' },
	{ name: 'Budget', value: 'budget' },
	{ name: 'External PDF', value: 'budgetAsPdf' }
]

const typesStatus = ['Received', 'Sent', 'Confirmed', 'Cancelled', 'Invoiced']

export const ProjectFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useProject()

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
					value={state.currentProject?.code || ''}
					handleChange={handleChange}
					errors={errors.code}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Nr.Participants"
					placeholder="ex: 20"
					name="nrPax"
					value={state.currentProject?.nrPax}
					handleChange={handleChange}
					errors={errors.nrPax}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Estimated Turnover"
					placeholder="ex: 80000"
					name="estimate"
					value={state.currentProject?.estimate}
					handleChange={handleChange}
					errors={errors.estimate}
					handleBlur={handleBlur}
				/>
			</div>

			<div className="grid gap-4 grid-cols-2 md:grid-cols-3">
				<TextInput
					type="date"
					label="Arrival Date"
					name="arrivalDay"
					value={state.currentProject?.arrivalDay || ''}
					handleChange={handleChange}
					errors={errors.arrivalDay}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="date"
					label="Departure Date"
					name="departureDay"
					value={state.currentProject?.departureDay || ''}
					handleChange={handleChange}
					errors={errors.departureDay}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="text"
					label="Group Name"
					name="groupName"
					placeholder='ex: "The Best Group"'
					value={state.currentProject?.groupName}
					handleChange={handleChange}
					errors={errors.groupName}
					handleBlur={handleBlur}
				/>
			</div>

			<div className="col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Location
				</label>
				<LocationSelector
					city={state.currentProject?.groupLocation as string}
					name="groupLocation"
					handleChange={handleChange}
				/>
			</div>

			<div className="col-span-2 md:col-span-4 flex flex-wrap justify-between gap-4 mt-2">
				<TextInput
					type="checkbox"
					label="Multi Destination"
					name="multiDestination"
					value={state.currentProject?.multiDestination || false}
					checked={state.currentProject?.multiDestination}
					handleChange={handleChange}
				/>
				<TextInput
					type="checkbox"
					label="Side Menu"
					name="hasSideMenu"
					value={state.currentProject?.hasSideMenu || false}
					checked={state.currentProject?.hasSideMenu}
					handleChange={handleChange}
				/>
				<TextInput
					type="checkbox"
					label="Corporate Image"
					name="hasExternalCorporateImage"
					value={state.currentProject?.hasExternalCorporateImage || false}
					checked={state.currentProject?.hasExternalCorporateImage}
					handleChange={handleChange}
				/>
				<TextInput
					type="checkbox"
					label="Supplementary Text"
					name="suplementaryText"
					value={state.currentProject?.suplementaryText || false}
					checked={state.currentProject?.suplementaryText}
					handleChange={handleChange}
				/>
				<TextInput
					type="checkbox"
					label="Hide Dates"
					name="hideDates"
					value={state.currentProject?.hideDates}
					checked={state.currentProject?.hideDates}
					handleChange={handleChange}
				/>
			</div>

			<ProjectBudgetSelector
				options={budgetTypes}
				budget={state.currentProject?.budget || ''}
				handleChange={handleChange}
				open={openPdfInput}
				setOpen={setOpenPdfInput}
				fileInput={fileInput}
				project={state.currentProject as IProject}
				openModal={openModal}
				setOpenModal={setOpenModal}
			/>

			<div className="col-span-1 sm:col-span-2 mb-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Account Manager
				</label>
				<ProjectAccManagersSelector
					accManagerValue={
						state.currentProject?.accountManager?.[0]?.email ?? ''
					}
					handleChange={handleChange}
				/>
			</div>
			<div className="col-span-1 sm:col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Client Company
				</label>
				<ProjectCompanySelector />
			</div>

			<label className="uppercase text-xl text-gray-600 font-bold mr-2">
				Project Status
			</label>
			<ProjectStatusSelector
				options={typesStatus}
				status={state.currentProject?.status || 'received'}
				handleChange={handleChange}
			/>

			<div className="md:col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Language Vendor Descriptions
				</label>
				<ProjectLanguageSelector
					languageVendorDescriptions={
						state.currentProject?.languageVendorDescriptions || ''
					}
					handleChange={handleChange}
				/>
			</div>
		</fieldset>
	)
}

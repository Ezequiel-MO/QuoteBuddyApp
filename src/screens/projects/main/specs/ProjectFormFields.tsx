import { TextInput } from '@components/atoms'
import { ProjectBudgetSelector } from './ProjectBudgetSelector'
import { ProjectAccManagersSelector } from './ProjectAccManagersSelector'
import { ProjectCompanySelector } from './ProjectCompanySelector'
import { ProjectClientSelector } from './ProjectClientSelector'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import { ProjectLanguageSelector } from './ProjectLanguageSelector'
import { useCurrentProject } from 'src/hooks'
import { LocationSelector } from '@components/molecules/LocationSelector'

const budgetTypes = [
	{ name: 'No budget', value: 'noBudget' },
	{ name: 'Budget', value: 'budget' },
	{ name: 'External PDF', value: 'budgetAsPdf' }
]

const typesStatus = ['Received', 'Sent', 'Confirmed', 'Cancelled', 'Invoiced']

export const ProjectFormFields = () => {
	const {
		currentProject,
		errors,
		handleProjectInputChange,
		handleProjectBlur
	} = useCurrentProject()

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
					errors={errors.code}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="number"
					label="Nr.Participants"
					placeholder="ex: 20"
					name="nrPax"
					value={currentProject.nrPax}
					handleChange={handleProjectInputChange}
					errors={errors.nrPax}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="number"
					label="Estimated Turnover"
					placeholder="ex: 80000"
					name="estimate"
					value={currentProject.estimate}
					handleChange={handleProjectInputChange}
					errors={errors.estimate}
					handleBlur={handleProjectBlur}
				/>
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2">
				<TextInput
					type="date"
					label="Arrival Date"
					name="arrivalDay"
					value={currentProject.arrivalDay}
					handleChange={handleProjectInputChange}
					errors={errors.arrivalDay}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="date"
					label="Departure Date"
					name="departureDay"
					value={currentProject.departureDay}
					handleChange={handleProjectInputChange}
					errors={errors.departureDay}
					handleBlur={handleProjectBlur}
				/>
			</div>
			<div className="col-span-2">
				<TextInput
					type="text"
					label="Group Name"
					name="groupName"
					value={currentProject.groupName}
					handleChange={handleProjectInputChange}
					errors={errors.groupName}
					handleBlur={handleProjectBlur}
				/>
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Location
				</label>
				<LocationSelector
					city={currentProject?.groupLocation as string}
					name="city"
					handleChange={handleProjectInputChange}
				/>
				{errors.city && !currentProject?.groupLocation && (
					<p className="text-red-500 mt-1">{errors.city}</p>
				)}
			</div>
			<div className="col-span-2 md:col-span-4 flex flex-wrap justify-between gap-4 mt-2">
				<TextInput
					type="checkbox"
					label="Multi Destination"
					name="multiDestination"
					value={currentProject.multiDestination}
					checked={currentProject.multiDestination}
					handleChange={handleProjectInputChange}
					errors={errors.multiDestination}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="checkbox"
					label="Side Menu"
					name="hasSideMenu"
					value={currentProject.hasSideMenu}
					checked={currentProject.hasSideMenu}
					handleChange={handleProjectInputChange}
					errors={errors.hasSideMenu}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="checkbox"
					label="Corporate Image"
					name="hasExternalCorporateImage"
					value={currentProject.hasExternalCorporateImage}
					checked={currentProject.hasExternalCorporateImage}
					handleChange={handleProjectInputChange}
					errors={errors.hasExternalCorporateImage}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="checkbox"
					label="Supplementary Text"
					name="suplementaryText"
					value={currentProject.suplementaryText}
					checked={currentProject.suplementaryText}
					handleChange={handleProjectInputChange}
					errors={errors.suplementaryText}
					handleBlur={handleProjectBlur}
				/>
				<TextInput
					type="checkbox"
					label="Hide Dates"
					name="hideDates"
					value={currentProject.hideDates}
					checked={currentProject.hideDates}
					handleChange={handleProjectInputChange}
					errors={errors.hideDates}
					handleBlur={handleProjectBlur}
				/>
			</div>
			{/* Uncomment and implement these components later */}
			{/* <ProjectBudgetSelector
          options={budgetTypes}
          budget={currentProject.budget}
          handleChange={handleProjectInputChange}
          errors={errors.budget}
          handleBlur={handleProjectBlur}
        /> */}
			<div className="col-span-1 sm:col-span-2 mb-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Account Manager
				</label>
				<ProjectAccManagersSelector
					accManagerValue={currentProject.accountManager[0]?.email || ''}
					handleChange={handleProjectInputChange}
				/>
			</div>
			<div className="col-span-1 sm:col-span-2">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Client Company
				</label>
				<ProjectCompanySelector
					handleChange={handleProjectInputChange}
					clientCompany={currentProject.clientCompany[0]?.name || ''}
				/>
				{errors.clientCompany && (
					<p className="text-red-500 mt-1">{errors.city}</p>
				)}
			</div>

			{/* <ProjectClientSelector
          clientCompany={currentProject.clientCompany}
          client={currentProject.clientAccManager}
          handleChange={handleProjectInputChange}
          errors={errors.clientAccManager}
          handleBlur={handleProjectBlur}
        /> */}
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

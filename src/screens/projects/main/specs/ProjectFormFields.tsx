import { TextInput } from '@components/atoms'
import { ProjectBudgetSelector } from './ProjectBudgetSelector'
import { ProjectAccManagersSelector } from './ProjectAccManagersSelector'
import { ProjectCompanySelector } from './ProjectCompanySelector'
import { ProjectClientSelector } from './ProjectClientSelector'
import { SelectLocation } from '../../../../components/molecules'
import { ProjectStatusSelector } from './ProjectStatusSelector'
import { ProjectLanguageSelector } from './ProjectLanguageSelector'
import { useCurrentProject } from 'src/hooks'

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
			<TextInput
				type="text"
				label="Group Name"
				name="groupName"
				value={currentProject.groupName}
				handleChange={handleProjectInputChange}
				errors={errors.groupName}
				handleBlur={handleProjectBlur}
			/>
			<div className="col-span-2 md:col-span-4 flex flex-wrap justify-between gap-4">
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
			{/* Uncomment and implement these components later */}
			{/* <ProjectBudgetSelector
          options={budgetTypes}
          budget={currentProject.budget}
          handleChange={handleProjectInputChange}
          errors={errors.budget}
          handleBlur={handleProjectBlur}
        /> */}
			{/* <ProjectAccManagersSelector
          accManagerValue={currentProject.accountManager}
          handleChange={handleProjectInputChange}
          errors={errors.accountManager}
          handleBlur={handleProjectBlur}
        /> */}
			<ProjectCompanySelector
				handleChange={handleProjectInputChange}
				handleBlur={handleProjectBlur}
				errors={errors}
			/>
			{/* <ProjectClientSelector
          clientCompany={currentProject.clientCompany}
          client={currentProject.clientAccManager}
          handleChange={handleProjectInputChange}
          errors={errors.clientAccManager}
          handleBlur={handleProjectBlur}
        /> */}

			{/* <div>
          <label className="block text-lg font-medium text-gray-400 mb-2">
            Group Location
          </label>
          <SelectLocation
            city={currentProject.groupLocation as string}
            setData={setData}
            handleChange={handleProjectInputChange}
            name="groupLocation"
          />
          {errors.groupLocation && !currentProject.groupLocation && (
            <p className="text-red-500 mt-1">{errors.groupLocation}</p>
          )}
        </div> */}
			{/* <ProjectStatusSelector
					options={typesStatus}
					status={currentProject.status}
					handleChange={handleProjectInputChange}
					errors={errors.status}
					handleBlur={handleProjectBlur}
				/> */}
			{/* <div className="md:col-span-2">
					<label className="block text-lg font-medium text-gray-400 mb-1">
						Language Vendor Descriptions
					</label>
					<ProjectLanguageSelector
						handleChange={handleProjectInputChange}
						languageVendorDescriptions={
							currentProject.languageVendorDescriptions
						}
						handleBlur={handleProjectBlur}
						errors={errors.languageVendorDescriptions}
					/>
				</div> */}
		</fieldset>
	)
}

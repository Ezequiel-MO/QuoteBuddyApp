import { Icon } from '@iconify/react'
import { CompanySelect } from './input/CompanySelect'
import { ClientSelect } from './input/ClientSelect'
import { SelectBuget } from './input/SelectBuget'
import { TextInput, SelectInput, AccountManagerSelect } from '../../../../ui'
import { ShowImagesButton } from '../../../../components/atoms'

export const ProjectFormFields = ({
	formik,
	pdfProyect,
	fileInput,
	bugetTypes,
	open,
	setOpen,
	project,
	setModalOpen,
	accManagers,
	companies,
	locations,
	update
}) => {
	return (
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
					<div className="ml-10">
						<TextInput
							label="Corp.img"
							name="hasExternalCorporateImage"
							className="form-control w-7 h-8 rounded-full"
							type="checkbox"
						/>
					</div>
				</div>
				<div className="flex items-center justify-between my-4">
					<TextInput label="Arrival Day" name="arrivalDay" type="date" />

					<TextInput label="Departure Day" name="departureDay" type="date" />
					<TextInput
						label="Supl.Text"
						name="suplementaryText"
						className="form-control w-7 h-8 rounded-full"
						type="checkbox"
					/>
				</div>

				<SelectBuget
					options={bugetTypes}
					name="budget"
					label="Budget"
					value={formik.values.budget}
					setOpen={setOpen}
				/>
				{open && pdfProyect.length === 0 && (
					<label htmlFor="file-upload" className="mx-3">
						<Icon icon="akar-icons:cloud-upload" width="40" />
						<span>Upload PDF</span>
					</label>
				)}
				{open && pdfProyect.length === 0 && (
					<input
						id="file-upload"
						type="file"
						ref={fileInput}
						name="imageContentUrl"
						multiple={false}
						disabled={!open ? true : false}
						style={{ position: 'relative', marginBottom: '15px' }}
						title="Select a pdf file"
						accept=".pdf"
					/>
				)}
				{open && project?.imageContentUrl?.length > 0 && (
					<div
						style={{
							position: 'absolute',
							marginLeft: '25%',
							marginTop: '50px'
						}}
					>
						<ShowImagesButton
							name={project.code}
							setOpen={setModalOpen}
							nameValue={'SHOW PDF'}
						/>
					</div>
				)}

				<div style={open ? { marginTop: '55px' } : {}}>
					<AccountManagerSelect
						label="Account Manager"
						name="accountManager"
						placeholder="Account Manager ..."
						options={accManagers}
						value={formik.values.accountManager}
					/>
				</div>

				<CompanySelect
					label="Company"
					options={companies}
					name="clientCompany"
					valueCompany={formik.values.clientCompany}
					valueClient={formik.values.clientAccManager}
				/>

				<div
					style={
						!formik.values.clientCompany && !formik.values.clientAccManager
							? { position: 'relative', bottom: '-27px', marginLeft:"110px" }
							: {marginLeft:"110px" }
					}
				>
					<ClientSelect
						valueClient={formik.values.clientAccManager}
						valueCompany={formik.values.clientCompany}
					/>
				</div>

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
					options={['Received', 'Sent', 'Confirmed', 'Cancelled', 'Invoiced']}
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
							className="inline-block hover:bg-red-200 px-6 py-2 border-2 border-orange-50 text-orange-50 hover:text-black-50 rounded-lg"
							type="submit"
						>
							{update ? 'Edit Project Form' : 'Save and submit'}
						</button>
					</div>
				</div>
			</div>
		</fieldset>
	)
}

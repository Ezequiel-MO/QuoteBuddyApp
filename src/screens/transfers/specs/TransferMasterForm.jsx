import { Form, Formik } from 'formik'
import { TextInput, SelectInput } from '../../../ui'
import { useGetLocations } from '../../../hooks'
import { VALIDATIONS } from 'src/constants'

const TransferMasterForm = ({ submitForm, transfer }) => {
	const { locations } = useGetLocations()
	const initialValues = {
		city: transfer?.city ?? '',
		company: transfer?.company ?? '',
		transfer_in: transfer?.transfer_in ?? '',
		transfer_out: transfer?.transfer_out ?? '',
		dispo_4h: transfer?.dispo_4h ?? '',
		hextra: transfer?.hextra ?? '',
		hextra_night: transfer?.hextra_night ?? '',
		dispo_5h_out: transfer?.dispo_5h_out ?? '',
		dispo_4h_airport: transfer?.dispo_4h_airport ?? '',
		dispo_4h_night: transfer?.dispo_4h_night ?? '',
		transfer_in_out_night: transfer?.transfer_in_out_night ?? '',
		dispo_6h: transfer?.dispo_6h ?? '',
		dispo_6h_night: transfer?.dispo_6h_night ?? '',
		dispo_9h: transfer?.dispo_9h ?? '',
		vehicleType: transfer?.vehicleType ?? '',
		vehicleCapacity: transfer?.vehicleCapacity ?? '',
		selectedService: transfer?.selectedService ?? ''
	}

	const VehiclesTypes = [
		{ name: 'SEDAN Car' },
		{ name: 'MERCEDES' },
		{ name: 'MINI VAN' },
		{ name: 'MINI BUS' },
		{ name: '30 SEATER BUS' },
		{ name: '50 SEATER BUS' },
		{ name: '70 SEATER BUS' }
	]

	const update = Object.keys(transfer).length > 0 ? true : false

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					submitForm(values, 'transfers', update)
				}}
				enableReinitialize
				validationSchema={VALIDATIONS.transfer}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form>
							<fieldset className="grid grid-cols-2 gap-4">
								<legend>
									<h1 className="text-2xl mb-4">Transfer List</h1>
								</legend>
								<div className="form-group mb-6">
									<SelectInput
										label="Group Location"
										name="city"
										placeholder="Barcelona ..."
										options={locations}
										value={formik.values.city}
									/>
									<TextInput
										label="Company"
										name="company"
										placeholder="Transportation company ..."
										type="text"
									/>
									<TextInput
										label="Transfer in"
										name="transfer_in"
										placeholder="ex : 120"
										type="number"
									/>
									<TextInput
										label="Transfer out"
										name="transfer_out"
										placeholder="ex : 140"
										type="number"
									/>
									<TextInput
										label="Dispo 4h"
										name="dispo_4h"
										placeholder="ex : 220"
										type="number"
									/>
									<TextInput
										label="Hextra"
										name="hextra"
										placeholder="ex : 50"
										type="number"
									/>
									<TextInput
										label="Hextra night"
										name="hextra_night"
										placeholder="ex : 58"
										type="number"
									/>

									<TextInput
										label="Dispo 5h out"
										name="dispo_5h_out"
										placeholder="ex : 260"
										type="number"
									/>
								</div>

								<div className="form-group mb-6">
									<TextInput
										label="Dispo 4h airport"
										name="dispo_4h_airport"
										placeholder="ex : 280"
										type="number"
									/>

									<TextInput
										label="Dispo 4h night"
										name="dispo_4h_night"
										placeholder="ex : 250"
										type="number"
									/>

									<TextInput
										label="Transfer in/out night"
										name="transfer_in_out_night"
										placeholder="ex : 82"
										type="number"
									/>

									<TextInput
										label="Dispo 6h"
										name="dispo_6h"
										placeholder="ex : 320"
										type="number"
									/>

									<TextInput
										label="Dispo 6h night"
										name="dispo_6h_night"
										placeholder="ex : 340"
										type="number"
									/>

									<TextInput
										label="Dispo 9h"
										name="dispo_9h"
										placeholder="ex : 450"
										type="number"
									/>

									<SelectInput
										label="Vehicle type"
										name="vehicleType"
										placeholder="ex : Bus"
										options={VehiclesTypes}
										value={formik.values.vehicleType}
									/>
									{update && (
										<p style={{ fontSize: '14px', color: 'white' }}>
											Actual vehicle {formik.values.vehicleType}
										</p>
									)}

									<TextInput
										label="vehicle capacity"
										name="vehicleCapacity"
										placeholder="ex : 30"
										type="text"
									/>
									<input
										type="submit"
										className="cursor-pointer mt-6 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
										value={
											update ? 'Edit Transfer Form' : 'Create new Transfer'
										}
									/>
								</div>
							</fieldset>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default TransferMasterForm

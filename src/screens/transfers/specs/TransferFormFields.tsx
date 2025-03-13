import { TextInput } from '@components/atoms'
import { TransferVehicleTypeSelector } from './TransferVehicleTypeSelector'
import { useTransfer } from '../context/TransfersContext'
import { LocationSelector } from '@components/molecules/LocationSelector'
import { vehiclesTypes } from 'src/constants/vehicleTypes'

export const TransferFormFields = () => {
	const { state, handleChange, handleBlur, errors } = useTransfer()
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Transfer Data
				</h1>
			</legend>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
				<TextInput
					type="text"
					label="Company"
					placeholder="Transportation company ..."
					name="company"
					value={state.currentTransfer?.company}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.company}
				/>
				<TransferVehicleTypeSelector
					options={vehiclesTypes}
					vehicleType={state.currentTransfer?.vehicleType || ''}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors}
				/>
			</div>
			<div className="col-span-1 sm:col-span-2 mb-6">
				<label className="uppercase text-xl text-gray-600 font-bold mr-2">
					Group Location
				</label>
				<LocationSelector
					city={state.currentTransfer?.city as string}
					name="city"
					handleChange={handleChange}
				/>
				{errors.city && !state.currentTransfer?.city && (
					<p className="text-red-500 mt-1">{errors.city}</p>
				)}
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
				<TextInput
					type="number"
					label="Vehicle Capacity"
					name="vehicleCapacity"
					value={state.currentTransfer?.vehicleCapacity}
					handleChange={handleChange}
					handleBlur={handleBlur}
					errors={errors.vehicleCapacity}
				/>
				<TextInput
					type="number"
					label="Transfer in"
					name="transfer_in"
					value={state.currentTransfer?.transfer_in}
					handleChange={handleChange}
					errors={errors.transfer_in}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Transfer out"
					name="transfer_out"
					value={state.currentTransfer?.transfer_out}
					handleChange={handleChange}
					errors={errors.transfer_out}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Transfer in/out night"
					name="transfer_in_out_night"
					value={state.currentTransfer?.transfer_in_out_night}
					handleChange={handleChange}
					errors={errors.transfer_in_out_night}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Dispo 4h"
					name="dispo_4h"
					value={state.currentTransfer?.dispo_4h}
					handleChange={handleChange}
					errors={errors.dispo_4h}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="One way city transfer"
					name="one_way_city_transfer"
					value={state.currentTransfer?.one_way_city_transfer}
					handleChange={handleChange}
					errors={errors.one_way_city_transfer}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="One way city trnsf night"
					name="one_way_city_transfer_night"
					value={state.currentTransfer?.one_way_city_transfer_night}
					handleChange={handleChange}
					errors={errors.one_way_city_transfer_night}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Dispo 6h"
					name="dispo_6h"
					value={state.currentTransfer?.dispo_6h}
					handleChange={handleChange}
					errors={errors.dispo_6h}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Dispo 9h"
					name="dispo_9h"
					value={state.currentTransfer?.dispo_9h}
					handleChange={handleChange}
					errors={errors.dispo_9h}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Hextra"
					name="hextra"
					value={state.currentTransfer?.hextra}
					handleChange={handleChange}
					errors={errors.hextra}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Hextra night"
					name="hextra_night"
					value={state.currentTransfer?.hextra_night}
					handleChange={handleChange}
					errors={errors.hextra_night}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Dispo 5h out"
					name="dispo_5h_out"
					value={state.currentTransfer?.dispo_5h_out}
					handleChange={handleChange}
					errors={errors.dispo_5h_out}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Dispo 4h airport"
					name="dispo_4h_airport"
					value={state.currentTransfer?.dispo_4h_airport}
					handleChange={handleChange}
					errors={errors.dispo_4h_airport}
					handleBlur={handleBlur}
				/>

				<TextInput
					type="number"
					label="Dispo 4h night"
					name="dispo_4h_night"
					value={state.currentTransfer?.dispo_4h_night}
					handleChange={handleChange}
					errors={errors.dispo_4h_night}
					handleBlur={handleBlur}
				/>
				<TextInput
					type="number"
					label="Dispo 6h night"
					name="dispo_6h_night"
					value={state.currentTransfer?.dispo_6h_night}
					handleChange={handleChange}
					errors={errors.dispo_6h_night}
					handleBlur={handleBlur}
				/>
			</div>
		</fieldset>
	)
}

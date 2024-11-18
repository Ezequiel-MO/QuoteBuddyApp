import { useSupplier } from '../context/SupplierContext'
import { TextInput } from '@components/atoms'
import { LocationSelector } from '@components/molecules/LocationSelector'

export const SupplierFormFields: React.FC = () => {
	const { state, handleChange, handleBlur, errors } = useSupplier()
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Supplier Data
				</h1>
			</legend>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				<div className="col-span-1">
					<TextInput
						type="text"
						label="VAT Number"
						placeholder="VAT Number"
						name="VATNr"
						value={state.currentSupplier?.VATNr || ''}
						handleChange={handleChange}
						errors={errors.vatNr}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="col-span-2">
					<TextInput
						type="text"
						label="Legal Name"
						placeholder="Legal Name of the Entity"
						name="name"
						value={state.currentSupplier?.name || ''}
						handleChange={handleChange}
						errors={errors.name}
						handleBlur={handleBlur}
					/>
				</div>
			</div>

			<div className="space-y-4">
				<label className="uppercase text-xl text-gray-600 font-bold">
					Location
				</label>
				<LocationSelector
					city={state.currentSupplier?.city as string}
					name="city"
					handleChange={handleChange}
				/>
				{errors.city && !state.currentSupplier?.city && (
					<p className="text-red-500 mt-1">{errors.city}</p>
				)}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				<div className="col-span-1">
					<TextInput
						type="text"
						label="Post Code"
						placeholder="Post Code"
						name="postalCode"
						value={state.currentSupplier?.postalCode}
						handleChange={handleChange}
						errors={errors.postalCode}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="col-span-2">
					<TextInput
						type="text"
						label="Address"
						placeholder="Address"
						name="address"
						value={state.currentSupplier?.address}
						handleChange={handleChange}
						errors={errors.address}
						handleBlur={handleBlur}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				<div className="col-span-1">
					<TextInput
						type="text"
						label="Contact Person"
						placeholder="Contact Person"
						name="contactPerson"
						value={state.currentSupplier?.contactPerson}
						handleChange={handleChange}
						errors={errors.contactPerson}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						type="email"
						label="Contact Email"
						placeholder="Contact Email"
						name="contactEmail"
						value={state.currentSupplier?.contactEmail}
						handleChange={handleChange}
						errors={errors.contactEmail}
						handleBlur={handleBlur}
					/>
				</div>
				<div className="col-span-1">
					<TextInput
						type="text"
						label="Contact Number"
						placeholder="Contact Number"
						name="contactNumber"
						value={state.currentSupplier?.contactNumber}
						handleChange={handleChange}
						errors={errors.contactNumber}
						handleBlur={handleBlur}
					/>
				</div>
			</div>
		</fieldset>
	)
}

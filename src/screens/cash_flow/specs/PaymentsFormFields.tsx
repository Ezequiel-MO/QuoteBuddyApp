import { TextInput } from '@components/atoms'
import SelectTypeVendor from '@components/molecules/SelectTypeVendor'

const PaymentsFormFields = () => {
	const handleChange = () => console.log('changing payment value')
	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">Payment Data</h1>
			</legend>
			<div className="space-y-4">
				<TextInput
					name="project"
					label="Project"
					value=""
					handleChange={handleChange}
					/* 
					
					handleBlur={handleBlur}
					errors={errors.vendor} */
					placeholder="Which Project is the payment for?"
				/>
				<div>
					<label className="uppercase text-xl text-gray-600 font-bold">
						Type of Vendor
					</label>
					<SelectTypeVendor />
				</div>
				<TextInput
					name="vendor"
					label="Supplier Name"
					value="supplier"
					handleChange={handleChange}
					/* handleBlur={handleBlur}
					errors={errors.name} */
					placeholder="Which vendor are we paying?"
				/>
				<TextInput
					type="number"
					label="Amount"
					placeholder="example : 1.000"
					name="amount"
					value=""
					handleChange={handleChange}
					/* handleBlur={handleBlur}
						errors={errors.price} */
				/>
			</div>
		</fieldset>
	)
}

export default PaymentsFormFields

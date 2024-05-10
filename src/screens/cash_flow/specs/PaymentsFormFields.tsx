import { TextInput } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import { CodeSelector } from './CodeSelector'
import { useApiFetch } from 'src/hooks/fetchData'
import { IProject } from '@interfaces/project'
import SelectVendor from '@components/molecules/SelectVendor'

const PaymentsFormFields = () => {
	const { state, handleChange } = usePayment()
	const { data: projects } = useApiFetch<IProject[]>('projects')
	const codes = projects?.map((project) => project.code) || []

	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1 className="text-3xl text-white-0">Payment Data</h1>
			</legend>
			<div className="space-y-4">
				<CodeSelector codes={codes} />
				<SelectVendor />
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

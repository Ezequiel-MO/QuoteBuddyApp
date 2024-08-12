import { TextInput } from '@components/atoms'
import { useQuotation } from '../context/QuotationContext'

function QuotationFormFields() {
	const { state, dispatch, handleChange, handleBlur, errors } = useQuotation()
	return (
		<fieldset className="max-w-3xl mx-auto p-8 bg-slate-800 shadow-md rounded-lg">
			<legend>
				<h1 className="text-3xl font-semibold text-gray-700 mb-6">
					General Project Data
				</h1>
			</legend>
			<div className="space-y-6">
				<TextInput
					type="text"
					label="Code"
					placeholder="ex : BEM2022001..."
					name="code"
					value={state.currentQuotation?.code || ''}
					handleChange={handleChange}
					errors={errors.code}
					handleBlur={handleBlur}
				/>
			</div>
		</fieldset>
	)
}

export default QuotationFormFields

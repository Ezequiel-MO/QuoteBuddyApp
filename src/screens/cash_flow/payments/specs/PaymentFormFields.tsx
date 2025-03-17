// PaymentFormFields.tsx
import { TextInput, SelectInput } from '@components/atoms'
import { usePayment } from '../../context/PaymentsProvider'
import { useAuth } from 'src/context/auth/AuthProvider'
import { useLocation } from 'react-router-dom'

export const PaymentFormFields = () => {
	const { state, handleChange, errorsPayment, handleBlurPayment } = usePayment()
	const { auth } = useAuth()

	const location = useLocation()

	const optionsStatus = [
		{ name: 'Completed', value: 'Completed' },
		{ name: 'Pending', value: 'Pending' },
		{ name: 'Failed', value: 'Failed' }
	]

	const optionsPayments = [
		{ name: 'Cash', value: 'Cash' },
		{ name: 'Bank Transfer', value: 'Bank Transfer' },
		{ name: 'Credit Card', value: 'Credit Card' }
	]

	const isDisabled =
		state.update &&
			state.payment?.proofOfPaymentPDF &&
			state.payment?.proofOfPaymentPDF?.length > 0
			? true
			: false

	return (
		<fieldset className="max-w-xl mx-auto p-6 bg-gray-800 rounded-lg">
			<legend>
				<h1
					className={`text-3xl ${!location.pathname.includes('specs')
							? 'text-green-600 mt-4'
							: 'text-white-0'
						}`}
				>
					General Vendor Payment Data
				</h1>
			</legend>
			<div className="space-y-4">
				<div className="flex space-x-4">
					<TextInput
						label="amount"
						placeholder="example: 001"
						type="number"
						name="amount"
						value={state.payment?.amount}
						handleChange={(e) => handleChange(e, 'UPDATE_PAYMENT_FIELD')}
						errors={errorsPayment.amount}
						handleBlur={handleBlurPayment}
					/>
					<TextInput
						label="payment date"
						placeholder="example: 001"
						type="date"
						name="paymentDate"
						value={state.payment?.paymentDate}
						handleChange={(e) => handleChange(e, 'UPDATE_PAYMENT_FIELD')}
						errors={errorsPayment.paymentDate}
						handleBlur={handleBlurPayment}
					/>
				</div>
				<div className="flex space-x-4">
					<SelectInput
						titleLabel='method payment'
						placeholderOption="-- select a method --"
						name='method'
						value={state.payment?.method as string}
						options={optionsPayments}
						handleChange={(e) => handleChange(e, 'UPDATE_PAYMENT_FIELD')}
						errorKey="method"
						errors={errorsPayment}
						handleBlur={handleBlurPayment}
					/>
					<br />
					<div className="w-1/2">
						<SelectInput
							titleLabel="status"
							placeholderOption="-- select a status --"
							name="status"
							value={state.payment?.status as string}
							options={
								auth.role === 'admin'
									? optionsStatus
									: [{ name: 'Pending', value: 'Pending' }]
							}
							handleChange={(e) => handleChange(e, 'UPDATE_PAYMENT_FIELD')}
							disabled={isDisabled}
							errorKey="status"
							errors={errorsPayment}
							handleBlur={handleBlurPayment}
						/>
					</div>
				</div>
			</div>
		</fieldset>
	)
}

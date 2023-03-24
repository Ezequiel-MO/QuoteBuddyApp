import { useCurrentInvoice } from '../../../hooks'

export const InvoiceShippingData = ({ handleChange }) => {
	const { currentInvoice } = useCurrentInvoice()
	const {
		postingStatus,
		date,
		client,
		company,
		address,
		postCode,
		reference,
		VATNr
	} = currentInvoice

	const renderField = (label, name, value) => {
		const isEditable = postingStatus === 'posting'

		return (
			<div className="font-bold leading-none flex">
				{label}:
				{isEditable ? (
					<input
						type="text"
						name={name}
						className="ml-2 font-normal cursor-pointer w-[500px]"
						value={value}
						onChange={handleChange}
					/>
				) : (
					<p className="ml-2 font-normal">{value}</p>
				)}
			</div>
		)
	}

	return (
		<div className="text-black-50 ml-10 mt-10 flex flex-col">
			{renderField('DATE', 'date', date)}
			{renderField('SEND INVOICE TO', 'client', client)}
			{renderField('COMPANY', 'company', company)}
			{renderField('COMPANY ADDRESS', 'address', address)}
			{renderField('POST CODE', 'postCode', postCode)}
			{renderField('REFERENCE', 'reference', reference)}
			{renderField('VAT Number', 'VATNr', VATNr)}
		</div>
	)
}

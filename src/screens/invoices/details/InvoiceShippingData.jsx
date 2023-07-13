import { formatDate } from '../../../helper'
import { useCurrentInvoice } from '../../../hooks'
import { ShippingDataField } from './'
import { ClientSelector } from './ClientSelector'
import { CodeSelector } from './CodeSelector'
import { CompanySelector } from './CompanySelector'

export const InvoiceShippingData = ({ handleChange }) => {
	const { currentInvoice } = useCurrentInvoice()

	const {
		postingStatus,
		date,
		client,
		company,
		postCode,
		address,
		reference,
		VATNr,
		projectCode
	} = currentInvoice

	const isEditable = postingStatus === 'posting'

	return (
		<div
			className={`text-black-50 ml-10 mt-5 flex flex-col ${
				isEditable ? 'w-[700px]' : 'w-[450px]'
			}`}
		>
			<div className="flex flex-row justify-between">
				<ShippingDataField
					label="DATE"
					name="date"
					value={formatDate(date)}
					handleChange={handleChange}
					isEditable={isEditable}
				/>
				<div className="flex-grow ml-2">
					<ShippingDataField
						label="REFERENCE"
						name="reference"
						value={reference}
						handleChange={handleChange}
						isEditable={isEditable}
					/>
				</div>
			</div>
			<CodeSelector
				handleChange={handleChange}
				selectedCode={projectCode}
				isEditable={isEditable}
			/>
			<CompanySelector
				handleChange={handleChange}
				selectedCompany={company}
				isEditable={isEditable}
			/>
			<ClientSelector
				handleChange={handleChange}
				selectedCompany={company}
				selectedClient={client}
				isEditable={isEditable}
			/>

			<ShippingDataField
				label="COMPANY ADDRESS"
				name="address"
				value={address}
				handleChange={handleChange}
				isEditable={isEditable}
			/>
			<div className="grid grid-cols-2 gap-1">
				<ShippingDataField
					label="POST CODE"
					name="postCode"
					value={postCode}
					handleChange={handleChange}
					isEditable={isEditable}
				/>

				<ShippingDataField
					label="VAT Number"
					name="VATNr"
					value={VATNr}
					handleChange={handleChange}
					isEditable={isEditable}
				/>
			</div>
		</div>
	)
}

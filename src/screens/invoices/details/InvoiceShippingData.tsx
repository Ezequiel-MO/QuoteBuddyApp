import { formatDate } from '../../../helper'
import { ShippingDataField } from '.'
import { ClientSelector } from './ClientSelector'
import { CodeSelector } from './CodeSelector'
import { CompanySelector } from './CompanySelector'
import { useInvoice } from '../context/InvoiceContext'

export const InvoiceShippingData: React.FC = () => {
	const { state } = useInvoice()

	const invoice = state.currentInvoice

	if (!invoice) return null

	const {
		status,
		date,
		client,
		company,
		postCode,
		address,
		reference,
		VATNr,
		projectCode
	} = invoice

	const posting = status === 'posting'

	return (
		<div
			className={`text-black-50 ml-10 mt-5 flex flex-col ${
				posting ? 'w-[700px]' : 'w-[450px]'
			}`}
		>
			<div className="flex flex-row justify-between">
				<ShippingDataField
					label="DATE"
					name="date"
					value={formatDate(date || '')}
					isEditable={posting}
				/>
				<div className="flex-grow ml-2">
					<ShippingDataField
						label="REFERENCE"
						name="reference"
						value={reference || ''}
						isEditable={posting}
					/>
				</div>
			</div>
			<CodeSelector isEditable={posting} selectedCode={projectCode || ''} />
			<CompanySelector selectedCompany={company} isEditable={posting} />
			<ClientSelector
				selectedCompany={company}
				selectedClient={client}
				isEditable={posting}
			/>

			<ShippingDataField
				label="COMPANY ADDRESS"
				name="address"
				value={address}
				isEditable={posting}
			/>
			<div className="grid grid-cols-2 gap-1">
				<ShippingDataField
					label="POST CODE"
					name="postCode"
					value={postCode}
					isEditable={posting}
				/>

				<ShippingDataField
					label="VAT Number"
					name="VATNr"
					value={VATNr}
					isEditable={posting}
				/>
			</div>
		</div>
	)
}

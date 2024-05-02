import { formatDate } from '../../../helper'
import { ShippingDataField } from '.'
import { ClientSelector } from './ClientSelector'
import { CodeSelector } from './CodeSelector'
import { CompanySelector } from './CompanySelector'
import { IInvoice } from '@interfaces/invoice'

interface Props {
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	invoice: IInvoice
	posting: boolean
}

export const InvoiceShippingData: React.FC<Props> = ({
	handleChange,
	invoice,
	posting
}) => {
	const {
		date,
		client,
		company,
		postCode,
		address,
		reference,
		VATNr,
		projectCode
	} = invoice || {}

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
					value={formatDate(date)}
					handleChange={handleChange}
					isEditable={posting}
				/>
				<div className="flex-grow ml-2">
					<ShippingDataField
						label="REFERENCE"
						name="reference"
						value={reference}
						handleChange={handleChange}
						isEditable={posting}
					/>
				</div>
			</div>
			<CodeSelector
				isEditable={posting}
				selectedCode={projectCode}
				handleChange={handleChange}
			/>
			<CompanySelector
				handleChange={handleChange}
				selectedCompany={company}
				isEditable={posting}
			/>
			<ClientSelector
				handleChange={handleChange}
				selectedCompany={company}
				selectedClient={client}
				isEditable={posting}
			/>

			<ShippingDataField
				label="COMPANY ADDRESS"
				name="address"
				value={address}
				handleChange={handleChange}
				isEditable={posting}
			/>
			<div className="grid grid-cols-2 gap-1">
				<ShippingDataField
					label="POST CODE"
					name="postCode"
					value={postCode}
					handleChange={handleChange}
					isEditable={posting}
				/>

				<ShippingDataField
					label="VAT Number"
					name="VATNr"
					value={VATNr}
					handleChange={handleChange}
					isEditable={posting}
				/>
			</div>
		</div>
	)
}

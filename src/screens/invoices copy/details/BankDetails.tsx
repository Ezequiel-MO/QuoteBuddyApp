import { BANK_DETAILS, BankDetail } from '../../../constants'

type BankDetailsProps = {
	bankName: 'DB' | 'BBVA'
}

export const BankDetails: React.FC<BankDetailsProps> = ({ bankName }) => {
	const bankDetail: BankDetail =
		bankName === 'DB'
			? BANK_DETAILS.DB_BANK_DETAILS
			: BANK_DETAILS.BBVA_BANK_DETAILS

	return (
		<div className="text-black-50 ml-10 mt-10 w-[700px] h-[300px]">
			<div>Please use the following Bank Account for transfers</div>
			<div className="italic">All bank fees must be paid by the sender</div>
			<div className="font-bold">
				{bankDetail.BANK_NAME}:
				<span className="font-normal ml-2">{bankDetail.ADDRESS}</span>
			</div>
			<div className="font-bold">
				ACCOUNT NUMBER:{' '}
				<span className="italic font-normal">{bankDetail.ACCOUNT_NUMBER}</span>
			</div>
			<div className="font-bold">
				IBAN: <span className="italic font-normal">{bankDetail.IBAN}</span>
			</div>
			<div className="font-bold">
				SWIFT: <span className="italic font-normal">{bankDetail.SWIFT}</span>
			</div>
		</div>
	)
}

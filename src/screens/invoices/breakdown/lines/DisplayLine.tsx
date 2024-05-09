import { useInvoice } from '@screens/invoices/context/InvoiceContext'
import { formatMoney } from '../../../../helper'
import { IInvoiceBreakdownLine } from '@interfaces/invoice'

interface Props {
	line: IInvoiceBreakdownLine
	setIsEditing: (isEditing: boolean) => void
}

export const DisplayLine = ({ line, setIsEditing }: Props) => {
	const { state } = useInvoice()

	return (
		<div
			className="flex items-center justify-between px-4 cursor-pointer"
			onDoubleClick={() => setIsEditing(true)}
		>
			<p>{line.date}</p>

			<p className="indent-5 text-wrap p-2 flex-1">{line.text}</p>

			<div className="flex items-center">
				{formatMoney(line.amount, state.currentInvoice?.currency)}
			</div>
		</div>
	)
}

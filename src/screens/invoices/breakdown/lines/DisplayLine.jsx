import accounting from 'accounting'
import { useCurrentInvoice } from '../../../../hooks'

export const DisplayLine = ({ line, setIsEditing }) => {
	const { currentInvoice } = useCurrentInvoice()
	const { currency } = currentInvoice

	return (
		<div
			className="flex items-center justify-between px-4 cursor-pointer"
			onDoubleClick={() => setIsEditing(true)}
		>
			<p>{line.date}</p>

			<p className="indent-5 text-wrap p-2 flex-1">{line.text}</p>

			<div className="flex items-center">
				{accounting.formatMoney(line.amount, `${currency} `, 2, '.', ',')}
			</div>
		</div>
	)
}

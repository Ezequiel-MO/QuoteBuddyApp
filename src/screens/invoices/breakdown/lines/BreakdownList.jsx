import { useState } from 'react'
import accounting from 'accounting'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import '../../invoice_front_page/invoice.css'
import { useCurrentInvoice } from '../../../../hooks'
import { AddLine, BreakdownLine } from '../'

export const BreakdownList = () => {
	const [lineState, setLineState] = useState({
		status: 'posting',
		date: '',
		text: '',
		amount: ''
	})

	const { currentInvoice, addBreakdownLine } = useCurrentInvoice()
	const { currency, lineAmount } = currentInvoice

	const handleLineChange = (e) => {
		setLineState({ ...lineState, [e.target.name]: e.target.value })
	}

	const submitAddLine = (e) => {
		e.preventDefault()
		if (lineState.date && lineState.text && lineState.amount) {
			lineState.status = 'posted'
			addBreakdownLine(lineState)
			setLineState({ date: '', text: '', amount: '', status: 'posting' })
			toast.success('Line added', toastOptions)
		} else {
			toast.error('Please fill in all fields', toastOptions)
		}
	}
	return (
		<form onSubmit={submitAddLine}>
			<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
				<tbody>
					<AddLine lineState={lineState} handleLineChange={handleLineChange} />
					<BreakdownLine />
				</tbody>
				<tfoot>
					<tr className="border-2 pl-2 font-bold">
						<td></td>
						<td>TOTAL INVOICE</td>
						<td>
							{accounting.formatMoney(lineAmount, `${currency} `, 2, '.', ',')}
						</td>
					</tr>
				</tfoot>
			</table>
		</form>
	)
}

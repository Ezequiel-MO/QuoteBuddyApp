import accounting from 'accounting'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../helper/toast'
import '../invoice.css'
import { useCurrentInvoice } from '../../../hooks'

export const PostingBreakdownTable = () => {
	const [lineState, setLineState] = useState({
		id: '',
		status: 'posting',
		date: '',
		text: '',
		amount: ''
	})

	const { currentInvoice, addBreakdownLine } = useCurrentInvoice()
	const { currency, lineAmount, lines } = currentInvoice

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
					{lines.map((line, index) => {
						return line.status === 'posting' ? (
							<tr
								key={index}
								className="border-2 border-orange-50"
								id="lines_breakdown_form"
							>
								<td className="border border-r-1 pl-2 w-[130px] ">
									{' '}
									<input
										type="date"
										name="date"
										value={lineState.date}
										className="ml-2 font-normal cursor-pointer w-[100px]"
										onChange={handleLineChange}
									/>
									<button
										className="bg-gray-50 hover:bg-orange-50 text-white-100 font-bold ml-2 mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										type="submit"
									>
										Add Line
									</button>
								</td>
								<td className="border-r-1 pl-2 text-wrap">
									<textarea
										name="text"
										value={lineState.text}
										className="p-2 font-normal cursor-pointer w-full text-center align-middle"
										onChange={handleLineChange}
									/>
								</td>
								<td className="border-r-1 pl-2 w-[120px]">
									<div className="flex items-center">
										<span>{currency}</span>
										<span>
											<input
												type="number"
												name="amount"
												value={lineState.amount}
												className="ml-2 font-normal cursor-pointer w-[70px]"
												onChange={handleLineChange}
											/>
										</span>
									</div>
								</td>
							</tr>
						) : (
							<tr key={index} className="h-auto">
								<td className="border-r-1 pl-2 w-[120px]">
									<p className="flex items-center overflow-hidden">
										{line.date}
									</p>
								</td>
								<td className="border-r-1 pl-2">
									<p className="indent-5 text-wrap p-2">{line.text}</p>
								</td>
								<td className="border-r-1 pl-2 w-[120px]">
									<div className="flex items-center">
										{accounting.formatMoney(
											line.amount,
											`${currency} `,
											2,
											'.',
											','
										)}
									</div>
								</td>
							</tr>
						)
					})}
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

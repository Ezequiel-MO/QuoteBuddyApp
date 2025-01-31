import { useState } from 'react'
import { BankDetails } from '.'
import { useInvoice } from '../context/InvoiceContext'

export const InvoiceBankDetails = () => {
	const { state } = useInvoice()
	const [bank, setBank] = useState<'DB' | 'BBVA'>('DB')

	return (
		<>
			{state.currentInvoice?.status !== 'posted' ? (
				<div className="mt-40 text-black-50 ml-10 z-[500]">
					<label htmlFor="bank" className="mr-2 font-bold">
						Bank
					</label>
					<select
						id="bank"
						name="bank"
						value={bank}
						onChange={(e) => setBank(e.target.value as 'DB' | 'BBVA')}
						className="cursor-pointer"
					>
						<option value="DB">Deutsche Bank</option>
						<option value="BBVA">BBVA</option>
					</select>
				</div>
			) : null}

			{<BankDetails bankName={bank} />}
		</>
	)
}

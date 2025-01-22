import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { useInvoice } from '../../context/InvoiceContext'
import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { formatMoney } from 'src/helper'
import { ButtonDeleteWithAuth } from '@components/atoms'
import { useNavigate } from 'react-router-dom'
import { IInvoice } from '@interfaces/invoice'

export const ListTableProformaInvoice = () => {
	const navigate = useNavigate()
	const { dispatch, state, isLoading, setInvoices } = useInvoice()

	const handleClickViewProforma = (proformaInvoice: IInvoice) => {
		dispatch({
			type: 'SET_INVOICE',
			payload: proformaInvoice
		})
		navigate(`/app/invoice/proforma/specs/${proformaInvoice?._id}`)
	}

	if (isLoading) {
		return (
			<div className="mt-20">
				<Spinner />
			</div>
		)
	}

	if (!isLoading && state.invoices.length === 0) {
		return (
			<h1>
				No proforma invoices found. Click 'CREATE PROFORMA INVOICE' to add a new
				one.
			</h1>
		)
	}

	return (
		<>
			<table className={listStyles.table}>
				<TableHeaders headers="proformaInvoice" />
				{state?.invoices?.map((proformaInvoice) => {
					return (
						<tr key={proformaInvoice?._id} className={listStyles.tr}>
							<td
								align="left"
								className="px-3 cursor-pointer hover:text-blue-600"
								onClick={() =>
									handleClickViewProforma(proformaInvoice)
									// console.log(proformaInvoice)
								}
							>
								{proformaInvoice?.invoiceNumber}
							</td>
							<td className="px-3">{proformaInvoice?.date}</td>
							<td className="px-3">{proformaInvoice?.client}</td>
							<td className="px-3">{proformaInvoice?.reference}</td>
							<td className="px-3">
								{formatMoney(
									proformaInvoice.lineAmount,
									proformaInvoice.currency
								)}
							</td>
							<td className="cursor-pointer">
								<ButtonDeleteWithAuth
									endpoint="invoices"
									ID={proformaInvoice?._id}
									setter={setInvoices}
									items={state.invoices}
								/>
							</td>
						</tr>
					)
				})}
			</table>
		</>
	)
}

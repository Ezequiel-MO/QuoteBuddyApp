import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { formatMoney } from 'src/helper'
import { VendorInvoiceActions } from './VendorInvoiceActions'
import { usePayment } from '../context/PaymentsProvider'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { useNavigate } from 'react-router-dom'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { IPayment } from '@interfaces/payment'

export const ListTableVendorInvoice = () => {
	const navigate = useNavigate()
	const { state, dispatch, isLoading } = usePayment()

	if (isLoading) {
		return <Spinner />
	}

	const handleClickUpdate = (vendorInvoice: IVendorInvoice) => {
		dispatch({
			type: 'SET_VENDORINVOICE',
			payload: vendorInvoice
		})
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		navigate('specs')
	}

	const balance = (payments: IPayment[], vendorInvoice: IVendorInvoice) => {
		let finalbalance = vendorInvoice.amount
		for (let i = 0; i < payments.length; i++) {
			if (payments[i].status === 'Completed') {
				finalbalance = finalbalance - payments[i].amount
			}
		}
		return finalbalance
	}

	const changeColorBalance = (payments: IPayment[], vendorInvoice: IVendorInvoice): string => {
		const finalbalance = balance(payments, vendorInvoice)
		const color = {
			green: 'text-green-400',
			yellow: 'text-yellow-400',
			red: 'text-red-600'
		}
		if (finalbalance === 0) {
			return color.green
		}
		if (finalbalance > 0 && finalbalance < vendorInvoice.amount) {
			return color.yellow
		}
		return color.red
	}

	return (
		<table className={listStyles.table}>
			<TableHeaders headers="vendorInvoice" />
			{state.vendorInvoices?.map((vendorInvoice) => {
				return (
					<tr key={vendorInvoice?._id} className={listStyles.tr}>
						<td
							className="cursor-pointer hover:text-blue-600"
							onClick={() => handleClickUpdate(vendorInvoice)}
						>
							{vendorInvoice?.project?.code}
						</td>
						<td align="left" className="px-3">
							{vendorInvoice.project?.accountManager[0] &&
								`${vendorInvoice?.project?.accountManager[0]?.firstName} 
									${vendorInvoice?.project?.accountManager[0]?.familyName}`}
						</td>
						<td align="left" className="px-3">
							{vendorInvoice?.invoiceNumber}
						</td>
						<td align="left" className="px-3">
							{vendorInvoice?.invoiceDate}
						</td>
						<td align="left" className="px-3">
							{(vendorInvoice?.vendor as any)?.name ||
								(vendorInvoice?.vendor as any)?.company ||
								(vendorInvoice?.vendor as any)?.email}
						</td>
						<td align="left" className="px-3">
							{vendorInvoice?.vendorType}
						</td>
						<td align="left" className="px-3">
							{formatMoney(vendorInvoice?.amount)}
						</td>
						<td
							align="left"
							className={`px-3 ${changeColorBalance(vendorInvoice.relatedPayments, vendorInvoice)}`}
						>
							{formatMoney(
								balance(vendorInvoice.relatedPayments, vendorInvoice)
							)}
						</td>
						<td align="left" className="px-3">
							<VendorInvoiceActions
								vendorInvoice={vendorInvoice}
								foundVendorInvoices={state.vendorInvoices}
							/>
						</td>
					</tr>
				)
			})}
		</table>
	)
}

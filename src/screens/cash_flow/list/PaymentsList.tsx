import { ListHeader } from '@components/molecules'
import { IVendorInvoice } from "@interfaces/vendorInvoice"
import { useNavigate } from 'react-router-dom'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { usePaymentList } from './usePaymentList'
import { CreateBlankPayment } from '../context/CreateBlankPayment'
import { usePayment } from '../context/PaymentsProvider'
import { Spinner } from "src/components/atoms/spinner/Spinner"
import { ButtonDelete } from 'src/components/atoms'
import { formatMoney } from "src/helper"


export const PaymentsList = () => {
	const { state, dispatch } = usePayment()
	const navigate = useNavigate()

	const { data: foundVendorInvoices, isLoading, setData } = usePaymentList()

	const handleClick = () => {
		const newVendorInvoice: IVendorInvoice = CreateBlankPayment()
		dispatch({
			type: 'ADD_PAYMENT',
			payload: newVendorInvoice
		})
		navigate('/app/cash_flow/specs')
	}

	const handleClickUpdate = (vendorInvoice: IVendorInvoice) => {
		vendorInvoice.update = true
		// console.log(vendorInvoice)
		dispatch({
			type: "UPDATE_VENDORINVOICE",
			payload: {
				vendorInvoiceUpdate: vendorInvoice
			}
		})
		navigate('/app/cash_flow/specs')
	}

	if (isLoading) {
		return (
			<div>
				<ListHeader title="Payments" handleClick={handleClick} />
				<hr />
				<div className='mt-20'>
					<Spinner />
				</div>
			</div>
		)
	}

	return (
		<>
			<ListHeader title="Payments" handleClick={handleClick} />
			<hr />
			<table className={listStyles.table}>
				<TableHeaders headers="vendorInvoice" />
				{foundVendorInvoices?.map((vendorInvoice) => {
					return (
						<tr key={vendorInvoice._id} className={listStyles.tr}>
							<td className='cursor-pointer hover:text-blue-600' onClick={() => handleClickUpdate(vendorInvoice)}>
								{vendorInvoice.project?.code}
							</td>
							<td align='left' className="px-6">
								{
									vendorInvoice.project?.accountManager[0] &&
									`${vendorInvoice.project?.accountManager[0]?.firstName} 
									${vendorInvoice.project?.accountManager[0].familyName}`
								}
							</td>
							<td align='left' className="px-6">
								{vendorInvoice.invoiceNumber}
							</td>
							<td align='left' className="px-6">
								{vendorInvoice.invoiceDate}
							</td>
							<td align='left' className="px-6">
								{
									(vendorInvoice.vendor as any).name ||
									(vendorInvoice.vendor as any).company ||
									(vendorInvoice.vendor as any).email
								}
							</td>
							<td align='left' className="px-6">
								{vendorInvoice.vendorType}
							</td>
							<td align='left' className="px-6">
								{formatMoney(vendorInvoice.amount)}
							</td>
							<td align='left' className="px-6">
								{vendorInvoice.status}
							</td>
							<td>
								{
									vendorInvoice.status === "Pending" &&
									<ButtonDelete
										endpoint='vendorInvoices'
										ID={vendorInvoice._id}
										items={foundVendorInvoices}
										setter={setData}
									/>
								}
							</td>
						</tr>
					)
				})}
			</table>
		</>
	)
}

import { ListHeader } from '@components/molecules'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { useNavigate } from 'react-router-dom'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { useVendorInvoiceList } from './useVendorInvoiceList'
import { CreateBlankVendorInvoice } from '../context/CreateBlankVendorInvoice'
import { usePayment } from '../context/PaymentsProvider'
import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { formatMoney } from 'src/helper'
import { VendorInvoiceActions } from './VendorInvoiceActions'

export const VendorInvoicesList = () => {
	const { state, dispatch } = usePayment()
	const navigate = useNavigate()

	const {
		data: foundVendorInvoices,
		isLoading,
		setData
	} = useVendorInvoiceList()

	const handleClick = () => {
		const newVendorInvoice: IVendorInvoice = CreateBlankVendorInvoice()
		dispatch({
			type: 'ADD_VENDORINVOICE',
			payload: newVendorInvoice
		})
		navigate('/app/cash_flow/specs')
	}

	const handleClickUpdate = (vendorInvoice: IVendorInvoice) => {
		vendorInvoice.update = true
		dispatch({
			type: 'UPDATE_VENDORINVOICE',
			payload: {
				vendorInvoiceUpdate: vendorInvoice
			}
		})
		navigate('/app/cash_flow/specs')
	}

	if (isLoading) {
		return (
			<div>
				<ListHeader title="Vendor Invoices" handleClick={handleClick} />
				<hr />
				<div className="mt-20">
					<Spinner />
				</div>
			</div>
		)
	}

	return (
		<>
			<ListHeader title="Vendor Invoices" handleClick={handleClick} />
			<hr />
			<table className={listStyles.table}>
				<TableHeaders headers="vendorInvoice" />
				{foundVendorInvoices?.map((vendorInvoice) => {
					return (
						<tr key={vendorInvoice?._id} className={listStyles.tr}>
							<td
								className="cursor-pointer hover:text-blue-600"
								onClick={() => handleClickUpdate(vendorInvoice)}
							>
								{vendorInvoice?.project?.code}
							</td>
							<td align="left" className="px-6">
								{vendorInvoice.project?.accountManager[0] &&
									`${vendorInvoice?.project?.accountManager[0]?.firstName} 
									${vendorInvoice?.project?.accountManager[0]?.familyName}`}
							</td>
							<td align="left" className="px-6">
								{vendorInvoice?.invoiceNumber}
							</td>
							<td align="left" className="px-6">
								{vendorInvoice?.invoiceDate}
							</td>
							<td align="left" className="px-6">
								{(vendorInvoice?.vendor as any)?.name ||
									(vendorInvoice?.vendor as any)?.company ||
									(vendorInvoice?.vendor as any)?.email}
							</td>
							<td align="left" className="px-6">
								{vendorInvoice?.vendorType}
							</td>
							<td align="left" className="px-6">
								{formatMoney(vendorInvoice?.amount)}
							</td>
							<td align="left" className="px-6">
								{vendorInvoice?.status}
							</td>
							<td align="left" className="px-6">
								<VendorInvoiceActions
									vendorInvoice={vendorInvoice}
									foundVendorInvoices={foundVendorInvoices}
									setVendorInvoices={setData}
								/>
							</td>
						</tr>
					)
				})}
			</table>
		</>
	)
}

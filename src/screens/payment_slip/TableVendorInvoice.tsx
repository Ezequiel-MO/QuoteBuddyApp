import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { IPayment } from '@interfaces/payment'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { Button } from '@components/atoms'
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { CreateBlankVendorInvoice } from '@screens/cash_flow/context/CreateBlankVendorInvoice'
import { TableVendorInvoicePayments } from './TableVendorInvoicePayments'
import { VendorInvoiceActions } from '../cash_flow/list/VendorInvoiceActions'
import accounting from 'accounting'
import React from 'react'

export const TableVendorInvoice = () => {
	const navigate = useNavigate()
	const { projectId } = useParams<{ projectId: string }>()

	const { stateProject, setForceRefresh: setForceRefreshPaymentSlip } =
		usePaymentSlip()
	const { dispatch, state } = usePayment()

	const handleCreateNewItem = () => {
		const newVendorInvoice: IVendorInvoice = CreateBlankVendorInvoice()
		dispatch({ type: 'ADD_VENDORINVOICE', payload: newVendorInvoice })
		dispatch({ type: 'TOGGLE_UPDATE', payload: false })
		dispatch({
			type: 'UPDATE_VENDORINVOICE_FIELD',
			payload: { name: 'project', value: projectId }
		})

		navigate('vendorInvoice_specs')
	}

	const handleClickUpdate = (vendorInvoice: IVendorInvoice) => {
		dispatch({
			type: 'UPDATE_VENDORINVOICE',
			payload: { vendorInvoiceUpdate: vendorInvoice }
		})
		dispatch({ type: 'TOGGLE_UPDATE', payload: true })

		navigate('vendorInvoice_specs')
	}

	const vendorName = (vendor: any) => {
		if (vendor?.name) return `${vendor.name}`
		if (vendor?.company) return `${vendor.company}`
		if (vendor?.email) return vendor.email
		return ''
	}

	const balance = (payments: IPayment[], vendorInvoice: IVendorInvoice) => {
		let finalbalance = vendorInvoice.amount
		for (let i = 0; i < payments.length; i++) {
			if (payments[i].status === 'Completed') {
				finalbalance -= payments[i].amount
			}
		}
		return finalbalance
	}

	return (
		<div className="mt-6">
			<div className="shadow-sm rounded-md border border-gray-700">
				<table className="w-full text-left table-auto bg-gray-800 text-gray-200">
					<thead className="divide-y divide-gray-700">
						<tr className="bg-gray-700">
							<th className="px-4 py-2 w-[90px]">Type</th>
							<th className="px-4 py-2 w-[120px]">Invoice Number</th>
							<th className="px-4 py-2 w-[110px]">Invoice Date</th>
							<th className="px-4 py-2 w-[110px]">Type Supplier</th>
							<th className="px-4 py-2 w-[220px]">Name Supplier</th>
							<th className="px-4 py-2 w-[100px]">Amount</th>
							<th className="px-4 py-2 w-[100px]">Balance</th>
							<th className="px-4 py-2 w-[80px]">Actions</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{stateProject?.vendorInvoices?.map((vendorInvoice, index) => (
							<React.Fragment key={vendorInvoice._id}>
								<tr className="hover:bg-gray-700 transition-colors">
									<td className="px-4 py-2 flex items-center gap-2">
										<span className="uppercase text-sm font-medium">
											Supplier Invoice
										</span>
										<abbr
											title="Edit SUPPLIER INVOICE"
											className="cursor-pointer"
											onClick={() => handleClickUpdate(vendorInvoice)}
										>
											<Icon
												icon="ci:file-edit"
												width={18}
												className="text-green-600 transition-transform duration-300 hover:scale-125 active:scale-95"
											/>
										</abbr>
									</td>
									<td className="px-4 py-2 text-sm">
										{vendorInvoice.invoiceNumber}
									</td>
									<td className="px-4 py-2 text-sm">
										{vendorInvoice.invoiceDate}
									</td>
									<td className="px-4 py-2 text-sm">
										{vendorInvoice.vendorType}
									</td>
									<td className="px-4 py-2 text-sm">
										{vendorName(vendorInvoice?.vendor)}
									</td>
									<td className="px-4 py-2 text-sm">
										{accounting.formatMoney(vendorInvoice.amount, '€')}
									</td>
									<td
										className={`px-4 py-2 text-sm font-medium ${
											balance(vendorInvoice.relatedPayments, vendorInvoice) ===
											0
												? 'text-green-400'
												: 'text-red-500'
										}`}
									>
										{accounting.formatMoney(
											balance(vendorInvoice.relatedPayments, vendorInvoice),
											'€'
										)}
									</td>
									<td className="px-4 py-2 text-sm relative">
										<VendorInvoiceActions
											vendorInvoice={vendorInvoice}
											foundVendorInvoices={state.vendorInvoices}
											forceRefresh={() =>
												setForceRefreshPaymentSlip((prev) => prev + 1)
											}
										/>
									</td>
								</tr>

								{/* Nested Payment Rows */}
								<TableVendorInvoicePayments
									payments={vendorInvoice.relatedPayments}
								/>

								{/* Spacer row */}
								<tr>
									<td colSpan={8} className="py-1" />
								</tr>
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>

			{/* Add Vendor Invoice Button */}
			<div className="mt-4 flex justify-end">
				<Button
					newClass="
            inline-flex items-center gap-2 bg-blue-600
            hover:bg-blue-500 text-white uppercase font-medium
            py-2 px-4 rounded-md
            transition-transform transform active:scale-95
          "
					icon="basil:add-outline"
					widthIcon={20}
					handleClick={handleCreateNewItem}
				>
					Add Vendor Invoice
				</Button>
			</div>
		</div>
	)
}

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
			type: 'SET_VENDORINVOICE',
			payload: vendorInvoice
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

	const totalCostVendorInvoices = () => {
		let cost = 0
		stateProject?.vendorInvoices.forEach((vendorInvoice) => cost += vendorInvoice.amount)
		return cost
	}


	return (
		<div className="mt-6 mb-20">
			<div
				className="shadow-sm rounded-md border border-gray-700"
				data-testid="table-vendor-invoice"
			>
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
						{stateProject?.vendorInvoices?.map((vendorInvoice) => (
							<React.Fragment key={vendorInvoice._id}>
								<tr className="hover:bg-gray-500 transition-colors">
									<td
										onClick={() => handleClickUpdate(vendorInvoice)}
										className="p-2 hover:text-blue-700 hover:underline cursor-pointer truncate w-24"
									>
										SUPPLIER INVOICE
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
										className={`px-4 py-2 text-sm font-medium ${changeColorBalance(vendorInvoice.relatedPayments, vendorInvoice)}`}
									>
										{accounting.formatMoney(balance(vendorInvoice.relatedPayments, vendorInvoice), '€')}
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
			{/* Total cost */}
			<div className="mt-2 flex justify-end">
				<div className="bg-gray-800 p-3 rounded-md text-gray-100 w-full max-w-md flex items-center justify-between">
					<span className="uppercase font-semibold">total cost:</span>
					<span className="font-bold text-red-600">
						{accounting.formatMoney(totalCostVendorInvoices(), '€')}
					</span>
				</div>
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

import { TableHeaders } from 'src/ui'
import { InvoicesRow } from './invoice/InvoicesRow'
import { CollectionsFromClientRow } from './CollectionsFromClientRow'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { Button } from '@components/atoms'
import { useNavigate } from 'react-router-dom'
import { useInvoice } from '../invoices/context/InvoiceContext'
import { createBlankInvoice } from '../invoices/context/createBlankInvoice'
import accounting from 'accounting'

export const TablePayment = () => {
	const navigate = useNavigate()
	const {
		stateProject: project,
		setIsUpdate,
		setCollectionFromClient
	} = usePaymentSlip()

	const {
		dispatch,
		state: stateInvoice,
		isLoading: isLoadingInvoice
	} = useInvoice()

	if (!project || !project.collectionsFromClient) {
		return null
	}

	const handleClickCreateInvoice = (type?: 'official' | 'proforma') => {
		const newInvoice = createBlankInvoice()
		dispatch({ type: 'SET_INVOICE', payload: newInvoice })
		dispatch({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'status', value: 'posting' }
		})
		dispatch({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'projectCode', value: project.code }
		})
		dispatch({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name: 'company', value: project.clientCompany[0].name }
		})
		if (type === 'official') {
			dispatch({
				type: 'INCREMENT_INVOICE_NUMBER',
				payload: stateInvoice.invoices.sort((a, b) =>
					b.invoiceNumber.localeCompare(a.invoiceNumber)
				)
			})
		}
		if (type === 'proforma') {
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'type', value: 'proforma' }
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: {
					name: 'invoiceNumber',
					value: `PROFORMA`
				}
			})
		}
		setTimeout(() => {
			navigate('invoice_specs')
		}, 200)
	}

	const totalAvailable = () => {
		let balance = 0
		for (let i = 0; i < project?.collectionsFromClient.length; i++) {
			if (
				project.collectionsFromClient[i].type === 'COLLECTION' &&
				project.collectionsFromClient[i].status === 'RECEIVED'
			) {
				balance += project.collectionsFromClient[i].amount
			}
		}
		return balance
	}

	return (
		<div
			className="p-4 shadow-sm rounded-md border border-gray-700"
			data-testid="table-payment"
		>
			<div className="p-4 flex justify-between items-center mb-4">
				<h2 className="text-xl text-gray-100 font-semibold tracking-wide">
					Payments &amp; Collections
				</h2>
				<div className="space-x-2">
					{/* Add invoice button */}
					<Button
						icon="basil:add-outline"
						widthIcon={20}
						handleClick={() => handleClickCreateInvoice('official')}
						disabled={isLoadingInvoice}
					>
						Add Invoice
					</Button>
					{/* Add Proforma Invoice button */}
					<Button
						icon="basil:add-outline"
						widthIcon={20}
						handleClick={() => handleClickCreateInvoice('proforma')}
					>
						Add Proforma Invoice
					</Button>
				</div>
			</div>

			{/* Table Container */}
			<div className="relative shadow-sm rounded-md border border-gray-700">
				<table className="w-full text-left table-auto divide-y divide-gray-700">
					{/* Table Head */}
					<TableHeaders headers="paymentSlip" />
					{/* Table Body */}
					<tbody className="divide-y divide-gray-700 bg-gray-800 text-gray-200">
						{/* Render Invoices */}
						{project.invoices &&
							project.invoices.map((invoice) => {
								return <InvoicesRow invoice={invoice} key={invoice._id} />
							})}
						{/* Render Collections NOTA: para Collections que son "legacy" */}
						{project.collectionsFromClient &&
							project.collectionsFromClient.map((collectionFromClient) => {
								return (
									<CollectionsFromClientRow
										collectionFromClient={collectionFromClient}
										key={collectionFromClient._id}
									/>
								)
							})}
					</tbody>
				</table>
			</div>

			{/* Total Available */}
			<div className="mt-2 flex justify-end">
				<div className="bg-gray-800 p-3 rounded-md text-gray-100 w-full max-w-md flex items-center justify-between">
					<span className="uppercase font-semibold">Total Available:</span>
					<span className="font-bold text-green-400">
						{accounting.formatMoney(totalAvailable(), '€')}
					</span>
				</div>
			</div>
		</div>
	)
}

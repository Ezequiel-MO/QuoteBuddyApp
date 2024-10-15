import { useNavigate } from 'react-router-dom'
import { usePayment } from '../../context/PaymentsProvider'
import { CreateBlankPayment } from '../../context/CreateBlankPayment'
import { ListHeader } from '@components/molecules'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { IPayment } from '@interfaces/payment'
import { ButtonDelete, ButtonDeleteWithAuth } from 'src/components/atoms'
import baseAPI from 'src/axios/axiosConfig'

export const PaymentsList = () => {
	const navigate = useNavigate()

	const { state, dispatch } = usePayment()

	const vendorInvoice = state.vendorInvoice ?? {}
	const vendor: any = state.vendorInvoice?.vendor ?? {}

	if (!state.vendorInvoice) {
		return null
	}

	const handleClickCreatePayment = () => {
		const newPayment = CreateBlankPayment()
		dispatch({
			type: 'ADD_PAYMENT',
			payload: newPayment
		})
		navigate('/app/cash_flow/payment/specs')
	}

	const handleClickUpdatePayment = (payment: IPayment) => {
		payment.update = true
		dispatch({
			type: 'UPDATE_PAYMENT',
			payload: {
				paymentUpdate: payment
			}
		})
		navigate('/app/cash_flow/payment/specs')
	}

	const handleButtonDeleted = async (updatedPayments: IPayment[]) => {
		console.log(updatedPayments)
		//esto es para que se vea los cambios en el "VendorInvoice"
		await baseAPI.patch(`/vendorInvoices/${vendorInvoice?._id}`)
		dispatch({
			type: 'DELETE_PAYMENT',
			payload: {
				updatedPayments
			}
		})
	}

	const infoVendor = (
		vendorType?:
			| 'Restaurant'
			| 'Event'
			| 'Hotel'
			| 'Transfer'
			| 'Freelancer'
			| 'Entertainment'
			| 'Gift'
	) => {
		switch (vendorType) {
			case 'Transfer': {
				return vendor.company
			}
			case 'Freelancer': {
				return vendor.email
			}
			default: {
				return vendor.name
			}
		}
	}
	

	return (
		<div>
			<h1>
				{`Number invoice: ${vendorInvoice?.invoiceNumber}
                     - ${vendorInvoice?.vendorType}
                     - ${infoVendor(vendorInvoice.vendorType)}
                    `}
			</h1>
			<ListHeader
				title="Payments"
				handleClick={() => handleClickCreatePayment()}
			/>
			<hr />
			<table className={listStyles.table}>
				<TableHeaders headers="payments" />
				{vendorInvoice.relatedPayments?.map((payment, index) => {
					return (
						<tr key={index} className={listStyles.tr}>
							<td
								align="left"
								className="px-6 cursor-pointer hover:text-blue-500"
								onClick={() => handleClickUpdatePayment(payment)}
							>
								{payment.status}
							</td>
							<td align="left" className="px-6">
								{payment.amount}
							</td>
							<td align="left" className="px-6">
								{payment.paymentDate}
							</td>
							<td align="left" className="px-6">
								{payment.method ?? '...'}
							</td>
							<td>
								{payment.status !== 'Completed' && (
									<ButtonDelete
										endpoint={'payments'}
										ID={payment._id ?? ''}
										setter={(updatedPayments: any) =>
											handleButtonDeleted(updatedPayments)
										}
										items={vendorInvoice.relatedPayments || []}
									/>
								)}
							</td>
						</tr>
					)
				})}
			</table>
		</div>
	)
}

import { FC } from 'react'
import { IPayment } from '@interfaces/payment'
import { formatMoney } from 'src/helper'

interface TableVendorInvoicePaymentsProps {
	payments: IPayment[]
}

export const TableVendorInvoicePayments: FC<
	TableVendorInvoicePaymentsProps
> = ({ payments }) => {
	return (
		<>
			{payments.map((payment) => (
				<tr
					key={payment._id}
					className="bg-black-50 hover:bg-gray-200 hover:text-black-50"
				>
					<td />
					<td align="left" className="px-4 text-sm">
						Payment
					</td>

					<td align="left" className="px-4 text-sm">
						{payment.paymentDate}
					</td>
					<td align="left" className="px-4 text-sm">
						{payment.status}
					</td>
					<td />
					<td align="left" className="px-4 text-sm">
						{formatMoney(payment.amount)}
					</td>
					<td align="left" className="px-4 text-sm">
						{payment.status === 'Completed'
							? formatMoney(0)
							: formatMoney(payment.amount)}
					</td>
					<td />
				</tr>
			))}
		</>
	)
}

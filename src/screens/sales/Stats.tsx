import { IInvoice } from '@interfaces/invoice'
import { useLoaderData } from 'react-router-dom'
import accounting from 'accounting'

export const Stats = () => {
	const invoices = useLoaderData() as IInvoice[]

	const aggregateInvoicesByYear = (invoices: IInvoice[]) => {
		return invoices.reduce((acc, invoice) => {
			const year = invoice.date.substring(0, 4)
			if (!acc[year]) {
				acc[year] = 0
			}
			acc[year] += invoice.lineAmount
			return acc
		}, {} as Record<string, number>)
	}

	const totalsByYear = aggregateInvoicesByYear(invoices)

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Year</th>
						<th>Total Invoiced</th>
					</tr>
				</thead>
				<tbody>
					{['2023', '2024'].map((year) => (
						<tr key={year}>
							<td>{year}</td>
							<td>
								{totalsByYear[year]
									? accounting.formatMoney(
											totalsByYear[year].toFixed(2),
											'EUR '
									  )
									: '0.00'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

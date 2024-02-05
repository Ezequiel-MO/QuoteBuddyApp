import { IInvoice } from '@interfaces/invoice'
import { useLoaderData } from 'react-router-dom'
import accounting from 'accounting'

export const Stats = () => {
	const invoices = useLoaderData() as IInvoice[]

	const aggregateInvoicesByYear = (invoices: IInvoice[]) => {
		return invoices.reduce((acc, invoice) => {
			const year = invoice.date.substring(0, 4) // Extract year from date
			if (!acc[year]) {
				acc[year] = 0 // Initialize if not present
			}
			acc[year] += invoice.lineAmount // Sum lineAmount for the year
			return acc
		}, {} as Record<string, number>) // Initialize an empty object to hold the sums
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
					{['2022', '2023', '2024'].map((year) => (
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

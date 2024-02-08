import React, { useEffect, useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import accounting from 'accounting'
import { listStyles } from 'src/constants/listStyles'

interface ApiResponse {
	data: IInvoiceAggregate[]
}

interface IInvoiceAggregate {
	year: string
	currency?: 'EUR' | 'USD'
	totalAmount: number
}

interface IYearlyAmounts {
	EUR: number
	USD: number
}

export const Stats: React.FC = () => {
	const [data, setData] = useState<Record<string, IYearlyAmounts>>({})

	const processData = (invoiceData: IInvoiceAggregate[]) => {
		const currentYear = new Date().getFullYear()
		const relevantYears = [String(currentYear), String(currentYear - 1)]

		const initialProcessedData: Record<string, IYearlyAmounts> = {}

		const processedData = invoiceData.reduce(
			(acc: Record<string, IYearlyAmounts>, curr) => {
				if (!relevantYears.includes(curr.year) || !curr.currency) return acc
				if (!acc[curr.year]) acc[curr.year] = { EUR: 0, USD: 0 }
				acc[curr.year][curr.currency] += curr.totalAmount

				return acc
			},
			initialProcessedData
		)

		relevantYears.forEach((year) => {
			if (!processedData[year]) processedData[year] = { EUR: 0, USD: 0 }
		})

		setData(processedData)
	}

	useEffect(() => {
		const fetchInvoiceData = async () => {
			try {
				const response = await baseAPI.get<ApiResponse>(
					'invoices/aggregate-by-year'
				)
				processData(response.data.data)
			} catch (error) {
				console.error('Error fetching invoice data:', error)
			}
		}

		fetchInvoiceData()
	}, [])

	const currentYear = new Date().getFullYear()
	const relevantYears = [String(currentYear), String(currentYear - 1)]

	return (
		<div className="overflow-x-auto">
			<h2 className="mb-2 uppercase font-bold underline">
				Total Invoiced - Year To Date
			</h2>
			<table className={listStyles.table}>
				<thead className={listStyles.thead}>
					<tr className={listStyles.tr}>
						<th className={listStyles.th}>Currency</th>
						{relevantYears.map((year) => (
							<th key={year} className={listStyles.th}>
								{year}
							</th>
						))}
					</tr>
				</thead>
				<tbody className={listStyles.tbody}>
					{['EUR', 'USD'].map((currency) => (
						<tr key={currency} className={listStyles.tr}>
							<td className={listStyles.td}>{currency}</td>
							{relevantYears.map((year) => (
								<td key={year} className={listStyles.td}>
									{data[year] &&
									data[year][currency as keyof IYearlyAmounts] !== undefined
										? accounting.formatMoney(
												data[year][currency as keyof IYearlyAmounts],
												currency === 'EUR' ? '€ ' : '$ '
										  )
										: '0.00'}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

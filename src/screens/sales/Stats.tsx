import React, { useEffect, useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import accounting from 'accounting'
import { listStyles } from 'src/constants/listStyles'
import { LetterMonthNames } from 'src/constants'

interface ApiResponse {
	data: IMonthlyAggregate[]
}

interface IMonthlyAggregate {
	_id: {
		month: number
		year: number
		currency: 'EUR' | 'USD'
	}
	totalAmount: number
}

interface MonthlyTotals {
	[key: string]: number // key format: "2023-1-EUR"
}

interface AccumulatedTotals {
	[currency: string]: {
		[year: number]: number[]
	}
}

export const Stats: React.FC = () => {
	const [monthlyTotals, setMonthlyTotals] = useState<MonthlyTotals>({})
	const [accumulatedTotals, setAccumulatedTotals] = useState<AccumulatedTotals>(
		{
			EUR: {},
			USD: {}
		}
	)

	useEffect(() => {
		const fetchInvoiceData = async () => {
			try {
				const { data } = await baseAPI.get<ApiResponse>(
					'invoices/aggregate-by-month'
				)
				processInvoiceData(data.data)
			} catch (error) {
				console.error('Error fetching invoice data:', error)
			}
		}

		fetchInvoiceData()
	}, [])

	const processInvoiceData = (data: IMonthlyAggregate[]) => {
		const monthly: MonthlyTotals = {}
		const accumulated: AccumulatedTotals = { EUR: {}, USD: {} }

		data.forEach(({ _id: { month, year, currency }, totalAmount }) => {
			const key = `${year}-${month}-${currency}`
			monthly[key] = (monthly[key] || 0) + totalAmount

			accumulated[currency][year] =
				accumulated[currency][year] || Array(12).fill(0)
			accumulated[currency][year][month - 1] += totalAmount
		})

		Object.keys(accumulated).forEach((currency) => {
			Object.keys(accumulated[currency]).forEach((yearStr) => {
				const year = Number(yearStr)
				accumulated[currency][year].forEach(
					(value: number, index: number, arr: number[]) => {
						arr[index] = index === 0 ? value : arr[index - 1] + value
					}
				)
			})
		})

		setMonthlyTotals(monthly)
		setAccumulatedTotals(accumulated)
	}

	const currentYear = new Date().getFullYear()
	const previousYear = currentYear - 1

	return (
		<div className="overflow-x-auto">
			<table className={listStyles.table}>
				<thead>
					<tr>
						<th className={listStyles.th}>Month/Currency</th>
						<th className={listStyles.th}>{previousYear}</th>
						<th className={listStyles.th}>{currentYear}</th>
						<th className={listStyles.th}>{previousYear}-YTD</th>
						<th className={listStyles.th}>{currentYear}-YTD</th>
					</tr>
				</thead>
				<tbody>
					{['EUR', 'USD'].flatMap((currency) =>
						LetterMonthNames.map((month, index) => (
							<tr key={`${month}-${currency}`}>
								<td className={listStyles.td}>{`${month}.${currency}`}</td>
								{/* Display monthly total for previous year */}
								<td className={listStyles.td}>
									{accounting.formatMoney(
										monthlyTotals[`${previousYear}-${index + 1}-${currency}`] ||
											0,
										currency === 'EUR' ? '€' : '$'
									)}
								</td>
								{/* Display monthly total for current year */}
								<td className={listStyles.td}>
									{accounting.formatMoney(
										monthlyTotals[`${currentYear}-${index + 1}-${currency}`] ||
											0,
										currency === 'EUR' ? '€' : '$'
									)}
								</td>
								{/* Display YTD total for previous year */}
								<td className={listStyles.td}>
									{accounting.formatMoney(
										accumulatedTotals[currency][previousYear]?.[index] || 0,
										currency === 'EUR' ? '€' : '$'
									)}
								</td>
								{/* Display YTD total for current year */}
								<td className={listStyles.td}>
									{accounting.formatMoney(
										accumulatedTotals[currency][currentYear]?.[index] || 0,
										currency === 'EUR' ? '€' : '$'
									)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

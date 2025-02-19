import React from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { format, parseISO } from 'date-fns'
import accounting from 'accounting'

// --- Inline Type Definitions ---
interface InvoiceDoc {
	_id: string
	date: string
	invoiceNumber: string
	lineText: string
	lineAmount: number
	type: string
	// Additional fields as needed...
}

interface ForecastProject {
	code: string
	location: string
	arrivalDay: string
	departureDay: string
	nrPax: number
	projectTotal: number
	invoicesDocs: InvoiceDoc[]
}

interface ForecastGroup {
	year: number
	month: number
	monthlyTotal: number
	projects: ForecastProject[]
}

// --- Helper: Convert numeric month (1-12) to month name ---
const getMonthName = (month: number): string => {
	const MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	]
	return MONTHS[month - 1] || 'Unknown'
}

export const SalesForecast: React.FC = () => {
	// The endpoint returns data like:
	// { "status": "success", "data": { "data": ForecastGroup[] }, ... }
	// useApiFetch sets our data to response.data.data.data, so forecastData is ForecastGroup[]
	const { data: forecastResponse, isLoading } = useApiFetch<ForecastGroup[]>(
		'projects/sales-forecast'
	)
	const forecastData = forecastResponse || []

	if (isLoading) {
		return <div className="p-6 text-white">Loading Sales Forecast...</div>
	}

	if (forecastData.length === 0) {
		return (
			<div className="p-6 text-gray-400">No sales forecast data available.</div>
		)
	}

	// Group forecastData by year.
	const groupedByYear = forecastData.reduce((acc, group) => {
		const year = group.year
		if (!acc[year]) {
			acc[year] = []
		}
		acc[year].push(group)
		return acc
	}, {} as Record<number, ForecastGroup[]>)

	// Get sorted list of years.
	const years = Object.keys(groupedByYear)
		.map(Number)
		.sort((a, b) => a - b)

	return (
		<div className="p-6 bg-slate-800 shadow-lg rounded-lg text-white">
			<h1 className="text-3xl font-bold mb-6">Sales Forecast</h1>
			{years.map((year) => {
				// For each year, sort the groups by month.
				const groupsForYear = groupedByYear[year].sort(
					(a, b) => a.month - b.month
				)
				// Calculate the total for this year.
				const yearTotal = groupsForYear.reduce(
					(sum, group) => sum + group.monthlyTotal,
					0
				)
				return (
					<div key={year} className="mb-10">
						<h2 className="text-2xl font-bold mb-4">{year} Sales Forecast</h2>
						{groupsForYear.map((group, idx) => {
							const monthName = getMonthName(group.month)
							return (
								<div
									key={`${year}-${group.month}-${idx}`}
									className="mb-8 border-b border-gray-600 pb-4"
								>
									<h3 className="text-xl font-semibold mb-3">
										{monthName} — Monthly Total:{' '}
										<span className="text-lg">
											{accounting.formatMoney(group.monthlyTotal, ' EUR ')}
										</span>
									</h3>
									{group.projects.length === 0 ? (
										<p className="text-gray-500 italic">
											No projects confirmed or invoiced for {monthName} {year}.
										</p>
									) : (
										<div className="space-y-4">
											{group.projects.map((proj) => {
												// Filter official invoices from invoicesDocs.
												const officialInvoices = proj.invoicesDocs.filter(
													(inv) => inv.type === 'official'
												)
												return (
													<div
														key={proj.code}
														className="bg-slate-700 p-3 rounded-md"
													>
														<div className="font-bold text-gray-300">
															{proj.code} – {proj.location}
														</div>
														<div className="text-sm text-gray-400">
															{proj.arrivalDay} to {proj.departureDay} | Pax:{' '}
															{proj.nrPax}
															<br />
															Project Total:{' '}
															{accounting.formatMoney(
																proj.projectTotal,
																' EUR '
															)}
															{officialInvoices.length === 0 && ' (Estimate)'}
														</div>
														{officialInvoices.length > 0 && (
															<div className="mt-2">
																<p className="text-sm font-semibold text-gray-300">
																	Invoices:
																</p>
																<ul className="list-disc pl-5 text-sm text-gray-400">
																	{officialInvoices.map((inv) => (
																		<li key={inv._id}>
																			<span className="font-medium">
																				Invoice {inv.invoiceNumber}:
																			</span>{' '}
																			{inv.lineText}
																			<br />
																			{inv.date && (
																				<span>
																					Date:{' '}
																					{format(
																						parseISO(inv.date),
																						'yyyy-MM-dd'
																					)}{' '}
																				</span>
																			)}
																			| Amount:{' '}
																			{accounting.formatMoney(
																				inv.lineAmount,
																				' EUR '
																			)}
																		</li>
																	))}
																</ul>
															</div>
														)}
													</div>
												)
											})}
										</div>
									)}
								</div>
							)
						})}
						<div className="mt-4 border-t border-gray-600 pt-4 text-xl font-bold">
							{year} Total: {accounting.formatMoney(yearTotal, ' EUR ')}
						</div>
					</div>
				)
			})}
		</div>
	)
}

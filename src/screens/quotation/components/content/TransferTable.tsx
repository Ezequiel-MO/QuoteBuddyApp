import React from 'react'
import { Icon } from '@iconify/react'

interface TransferTableProps {
	transfers: Record<string, Record<string, { transferCost: number }>>
	totalCost: number
	accentColor?: string
}

const TransferTable: React.FC<TransferTableProps> = ({
	transfers,
	totalCost,
	accentColor = '#4F46E5'
}) => {
	// Format date for display
	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString)
			return date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		} catch (error) {
			return dateString
		}
	}

	// Format currency
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'EUR',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value)
	}

	// Decode transfer service names
	const decodeServiceName = (serviceName: string) => {
		const serviceMap: Record<string, string> = {
			transfer_in: 'Airport Arrival',
			transfer_out: 'Airport Departure',
			dispo_4h: '4 Hours at Disposal',
			hextra: 'Extra Hour',
			hextra_night: 'Extra Hour (Night)',
			dispo_5h_out: '5 Hours Excursion',
			dispo_4h_airport: '4 Hours (Airport)',
			dispo_4h_night: '4 Hours (Night)',
			transfer_in_out_night: 'Airport Transfer (Night)',
			dispo_6h: '6 Hours at Disposal',
			dispo_6h_night: '6 Hours at Disposal (Night)',
			dispo_9h: '9 Hours Excursion'
		}

		return serviceMap[serviceName] || serviceName
	}

	// Get icon for transfer type
	const getTransferIcon = (serviceType: string) => {
		if (serviceType.includes('transfer_in')) return 'mdi:airplane-landing'
		if (serviceType.includes('transfer_out')) return 'mdi:airplane-takeoff'
		if (serviceType.includes('dispo')) return 'mdi:bus-clock'
		if (serviceType.includes('hextra')) return 'mdi:clock-plus'
		return 'mdi:bus'
	}

	// Check if we have any transfers
	const hasTransfers = Object.keys(transfers).length > 0

	return (
		<div>
			{!hasTransfers ? (
				<div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
					<Icon
						icon="mdi:bus"
						className="mx-auto text-gray-400 dark:text-gray-500"
						width={40}
					/>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						No transfers scheduled for this section.
					</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-700">
							<tr>
								<th
									scope="col"
									className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									Date
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									Service Type
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									Vehicle Type
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									Vehicle Count
								</th>
								<th
									scope="col"
									className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
								>
									Cost
								</th>
							</tr>
						</thead>
						<tbody className="bg-white-0 dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
							{Object.entries(transfers).map(([date, services]) =>
								Object.entries(services).map(
									([serviceType, { transferCost }], index) => (
										<tr
											key={`${date}-${serviceType}-${index}`}
											className="hover:bg-gray-50 dark:hover:bg-gray-700"
										>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-white-0">
												{formatDate(date)}
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
												<div className="flex items-center">
													<Icon
														icon={getTransferIcon(serviceType)}
														className="mr-2"
														style={{ color: accentColor }}
														width={16}
													/>
													{decodeServiceName(serviceType)}
												</div>
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
												Private Coach
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
												1
											</td>
											<td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white-0">
												{formatCurrency(transferCost)}
											</td>
										</tr>
									)
								)
							)}

							{/* Total Row */}
							<tr className="bg-gray-50 dark:bg-gray-700">
								<td
									colSpan={4}
									className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-800 dark:text-white-0 text-right"
								>
									Total Cost:
								</td>
								<td
									className="px-4 py-3 whitespace-nowrap text-sm font-bold"
									style={{ color: accentColor }}
								>
									{formatCurrency(totalCost)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default TransferTable

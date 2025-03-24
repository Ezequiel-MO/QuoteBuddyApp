import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { ILocation } from '../../interfaces/location'

interface Props {
	locationObj: ILocation
}

export const DestinationTable: React.FC<Props> = ({ locationObj }) => {
	const { corporateFacts, name } = locationObj || {}
	const [searchTerm, setSearchTerm] = useState('')

	// Filter facts based on search term
	const filteredFacts = corporateFacts?.filter(
		(fact) =>
			fact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			fact.description.toLowerCase().includes(searchTerm.toLowerCase())
	)

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05
			}
		}
	}

	const rowVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 25
			}
		}
	}

	return (
		<div className="w-full">
			{/* Section Header */}
			<div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white p-6">
				<div className="container mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold flex items-center">
						<Icon icon="mdi:calendar-check" className="w-8 h-8 mr-3" />
						<span>Corporate Event Details</span>
					</h2>
				</div>
			</div>

			{/* Content */}
			<div className="p-6 md:p-8">
				{corporateFacts && corporateFacts.length > 0 ? (
					<>
						{/* Search and Filter */}
						<div className="mb-6">
							<div className="max-w-md mx-auto relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Icon icon="mdi:magnify" className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									placeholder="Search event details..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
								{searchTerm && (
									<button
										className="absolute inset-y-0 right-0 pr-3 flex items-center"
										onClick={() => setSearchTerm('')}
									>
										<Icon
											icon="mdi:close-circle"
											className="h-5 w-5 text-gray-400 hover:text-gray-500"
										/>
									</button>
								)}
							</div>
						</div>

						{/* Table with Results */}
						<div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
							<motion.table
								className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
								variants={containerVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.1 }}
							>
								<thead className="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
										>
											Category
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
										>
											Details
										</th>
									</tr>
								</thead>
								<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
									{filteredFacts?.length === 0 ? (
										<tr>
											<td
												colSpan={2}
												className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
											>
												No matching details found
											</td>
										</tr>
									) : (
										filteredFacts?.map((fact, index) => (
											<motion.tr
												key={index}
												variants={rowVariants}
												className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
											>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-500">
															<Icon
																icon="mdi:check-circle"
																className="h-6 w-6"
															/>
														</div>
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900 dark:text-gray-100">
																{fact.title}
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4">
													<div className="text-sm text-gray-700 dark:text-gray-300">
														{fact.description}
													</div>
												</td>
											</motion.tr>
										))
									)}
								</tbody>
							</motion.table>
						</div>

						{/* Result Count */}
						<div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-right">
							Showing {filteredFacts?.length} of {corporateFacts.length} items
						</div>
					</>
				) : (
					<div className="text-center py-10">
						<Icon
							icon="mdi:table"
							className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
						/>
						<p className="text-gray-500 dark:text-gray-400">
							No event details available for this destination.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default DestinationTable

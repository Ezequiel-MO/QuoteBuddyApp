import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { Icon } from '@iconify/react'

const Footer: React.FC = () => {
	const { currentProject } = useQuotation()

	// Get company details from client company in current project
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color provided

	// Format date for footer
	const today = new Date()
	const formattedDate = today.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	return (
		<footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-6 mt-auto">
			<div className="max-w-5xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Left Column */}
					<div>
						<h3 className="font-semibold text-gray-800 dark:text-white-0 mb-3">
							Contact
						</h3>
						<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
							<li className="flex items-center">
								<Icon icon="mdi:email-outline" className="mr-2" width={18} />
								<span>info@example.com</span>
							</li>
							<li className="flex items-center">
								<Icon icon="mdi:phone-outline" className="mr-2" width={18} />
								<span>+1 234 567 890</span>
							</li>
							<li className="flex items-center">
								<Icon
									icon="mdi:map-marker-outline"
									className="mr-2"
									width={18}
								/>
								<span>123 Main Street, City</span>
							</li>
						</ul>
					</div>

					{/* Middle Column */}
					<div className="text-center">
						<div className="h-12 mb-3 flex justify-center">
							<div
								className="h-12 w-12 rounded-md flex items-center justify-center"
								style={{ backgroundColor: primaryColor }}
							>
								<span className="text-white-0 font-bold">LOGO</span>
							</div>
						</div>
						<p className="text-sm text-gray-600 dark:text-gray-400">
							Created on {formattedDate}
						</p>
						<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
							Ref: {currentProject?.code || 'N/A'}
						</p>
					</div>

					{/* Right Column */}
					<div className="text-right">
						<h3 className="font-semibold text-gray-800 dark:text-white-0 mb-3">
							Download
						</h3>
						<div className="space-y-2">
							<button className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white-0 transition-colors">
								<Icon icon="mdi:file-pdf-box" className="mr-1" width={18} />
								<span>PDF Quotation</span>
							</button>
							<div className="flex justify-end mt-4">
								<button
									className="px-4 py-2 rounded-md text-white-0 text-sm font-medium hover:bg-opacity-90 transition-colors"
									style={{ backgroundColor: primaryColor }}
								>
									<span className="flex items-center">
										<Icon
											icon="mdi:heart-outline"
											className="mr-1"
											width={16}
										/>
										Confirm Booking
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-500 dark:text-gray-500">
					© {new Date().getFullYear()} {clientCompany.name || 'Your Company'} •
					All rights reserved
				</div>
			</div>
		</footer>
	)
}

export default Footer

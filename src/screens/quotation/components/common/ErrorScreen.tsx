import React from 'react'
import { Icon } from '@iconify/react'

interface ErrorScreenProps {
	message: string
	onRetry: () => void
	onBack: () => void
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
	message,
	onRetry,
	onBack
}) => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
			<div className="text-center max-w-md mx-auto">
				<div className="mb-6">
					<Icon
						icon="mdi:alert-circle"
						className="text-red-500 dark:text-red-400 mx-auto"
						width={80}
						height={80}
					/>
				</div>

				<h1 className="text-2xl font-bold text-gray-800 dark:text-white-0 mb-3">
					Something Went Wrong
				</h1>

				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
					<p className="text-red-800 dark:text-red-200">{message}</p>
				</div>

				<p className="text-gray-600 dark:text-gray-400 mb-6">
					We encountered an error while trying to load the project. Please try
					again or go back to the projects list.
				</p>

				<div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
					<button
						onClick={onRetry}
						className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white-0 rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						<Icon icon="mdi:refresh" className="mr-2" width={20} />
						Try Again
					</button>

					<button
						onClick={onBack}
						className="flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white-0 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					>
						<Icon icon="mdi:arrow-left" className="mr-2" width={20} />
						Back to Projects
					</button>
				</div>
			</div>
		</div>
	)
}

export default ErrorScreen

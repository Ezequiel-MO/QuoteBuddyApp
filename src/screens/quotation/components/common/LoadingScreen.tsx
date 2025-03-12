import React from 'react'
import { Icon } from '@iconify/react'

const LoadingScreen: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
			<div className="text-center max-w-md mx-auto">
				<div className="flex items-center justify-center mb-6">
					<div className="relative">
						<Icon
							icon="mdi:file-document-outline"
							className="text-indigo-600 dark:text-indigo-400 animate-pulse"
							width={64}
							height={64}
						/>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							<div className="w-8 h-8 border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
						</div>
					</div>
				</div>

				<h1 className="text-xl font-bold text-gray-800 dark:text-white-0 mb-2">
					Loading Project...
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-6">
					Please wait while we prepare your project details
				</p>

				<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
					<div className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full animate-loadingBar"></div>
				</div>

				<div className="text-sm text-gray-500 dark:text-gray-400">
					This may take a few moments
				</div>
			</div>
		</div>
	)
}

export default LoadingScreen

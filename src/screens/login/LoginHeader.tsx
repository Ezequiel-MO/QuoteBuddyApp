import React from 'react'
import { Spinner } from 'src/components/atoms'
import { Icon } from '@iconify/react'

interface LoginHeaderProps {
	withSpinner: boolean
	userType: 'client' | 'agency'
	logoUrl?: string
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
	withSpinner,
	userType,
	logoUrl
}) => (
	<div className="mb-8 text-center">
		{logoUrl && (
			<img src={logoUrl} alt="Company Logo" className="h-12 mx-auto mb-6" />
		)}

		<div className="flex items-center justify-center mb-2 space-x-2">
			<Icon
				icon={
					userType === 'client'
						? 'mdi:account-circle'
						: 'mdi:office-building-marker'
				}
				className="text-blue-600 dark:text-blue-300"
				width="28"
				height="28"
			/>
			<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				Login to APP -{' '}
				{userType === 'client' ? 'Client Portal' : 'Agency Dashboard'}
			</h1>
		</div>

		{withSpinner && (
			<div className="flex justify-center mt-4">
				<Spinner />
			</div>
		)}
	</div>
)

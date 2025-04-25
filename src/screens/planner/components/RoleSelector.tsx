import React from 'react'
import { useLoginRoute } from '@hooks/useLoginRoute'
import { Icon } from '@iconify/react'

const RoleSelector: React.FC = () => {
	const { loginRoute } = useLoginRoute()

	// Determine role text, color, and icon based on login route
	const isClient = loginRoute === 'client'
	const roleText = isClient ? 'Client' : 'Account Manager'
	const bgColor = isClient ? '#ea5933' : '#0f766e'
	const roleIcon = isClient ? 'mdi:account' : 'mdi:account-tie'

	return (
		<div className="mb-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden">
			<div className="p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Icon icon="mdi:shield-account" className="text-gray-400 w-5 h-5" />
						<span className="text-sm text-gray-300">You're viewing as:</span>
					</div>
					<div
						className="px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm text-white-0"
						style={{
							backgroundColor: bgColor
						}}
					>
						<Icon icon={roleIcon} />
						{roleText}
					</div>
				</div>

				<p className="mt-2 text-xs text-gray-400">
					{isClient
						? 'You can view and comment on planning items, but cannot modify or add options.'
						: 'You have full access to manage planning items, options, and documents.'}
				</p>
			</div>
		</div>
	)
}

export default RoleSelector

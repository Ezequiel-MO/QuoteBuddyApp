import React from 'react'
import { useLoginRoute } from '@hooks/useLoginRoute'

const RoleSelector: React.FC = () => {
	const { loginRoute } = useLoginRoute()

	// Determine role text and color based on login route
	const roleText = loginRoute === 'client' ? 'Client' : 'Account Manager'

	const bgColor = loginRoute === 'client' ? '#ea5933' : '#0f766e'

	return (
		<div className="flex items-center space-x-3 p-2 bg-gray-700 rounded-md mb-4">
			<span className="text-sm text-white-0">Current Role:</span>
			<div
				className="px-3 py-1 rounded text-sm font-semibold"
				style={{
					backgroundColor: bgColor,
					color: 'white'
				}}
			>
				{roleText}
			</div>
		</div>
	)
}

export default RoleSelector

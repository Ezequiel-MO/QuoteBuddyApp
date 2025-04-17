import React from 'react'
import {
	usePlannerPermissions,
	UserRole
} from '../context/PlannerPermissionsContext'

const RoleSelector: React.FC = () => {
	const { userRole, setUserRole } = usePlannerPermissions()

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setUserRole(event.target.value as UserRole)
	}

	return (
		<div className="flex items-center space-x-3 p-2 bg-gray-700 rounded-md mb-4">
			<span className="text-sm text-white-0">Current Role:</span>
			<select
				value={userRole}
				onChange={handleRoleChange}
				className="bg-gray-800 text-white-0 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ea5933]"
			>
				<option value="AM">Account Manager</option>
				<option value="Client">Client</option>
			</select>
			<div
				className="ml-4 px-2 py-1 rounded text-xs font-semibold"
				style={{
					backgroundColor: userRole === 'AM' ? '#0f766e' : '#ea5933',
					color: 'white'
				}}
			>
				{userRole} Mode
			</div>
		</div>
	)
}

export default RoleSelector

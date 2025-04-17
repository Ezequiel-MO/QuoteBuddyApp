import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the roles
export type UserRole = 'AM' | 'Client'

// Define the resource types
export type ResourceType = 'PlanningItem' | 'Option' | 'Document' | 'Comment'

// Define the permission types
export type PermissionType = 'Add' | 'Edit' | 'Remove' | 'View' | 'Upload'

// Permission mapping based on the requirements
const permissionMatrix: Record<
	UserRole,
	Record<ResourceType, PermissionType[]>
> = {
	AM: {
		PlanningItem: ['Add', 'Edit', 'Remove', 'View'],
		Option: ['Add', 'Edit', 'Remove', 'View'],
		Document: ['Upload', 'Edit', 'Remove', 'View'],
		Comment: ['Add', 'Edit', 'Remove', 'View']
	},
	Client: {
		PlanningItem: ['View'],
		Option: ['View'],
		Document: ['Upload', 'View'],
		Comment: ['Add', 'View']
	}
}

interface PlannerPermissionsContextType {
	userRole: UserRole
	setUserRole: (role: UserRole) => void
	hasPermission: (resource: ResourceType, permission: PermissionType) => boolean
}

const PlannerPermissionsContext = createContext<
	PlannerPermissionsContextType | undefined
>(undefined)

interface PlannerPermissionsProviderProps {
	children: ReactNode
	initialRole?: UserRole
}

export const PlannerPermissionsProvider: React.FC<
	PlannerPermissionsProviderProps
> = ({ children, initialRole = 'AM' }) => {
	const [userRole, setUserRole] = useState<UserRole>(initialRole)

	const hasPermission = (
		resource: ResourceType,
		permission: PermissionType
	): boolean => {
		return permissionMatrix[userRole][resource].includes(permission)
	}

	return (
		<PlannerPermissionsContext.Provider
			value={{
				userRole,
				setUserRole,
				hasPermission
			}}
		>
			{children}
		</PlannerPermissionsContext.Provider>
	)
}

export const usePlannerPermissions = () => {
	const context = useContext(PlannerPermissionsContext)
	if (context === undefined) {
		throw new Error(
			'usePlannerPermissions must be used within a PlannerPermissionsProvider'
		)
	}
	return context
}

// Custom hook to check for specific permissions
export const useResourcePermission = (
	resource: ResourceType,
	permission: PermissionType
) => {
	const { hasPermission } = usePlannerPermissions()
	return hasPermission(resource, permission)
}

// Helper hooks for common permission checks
export const useCanAddPlanningItem = () =>
	useResourcePermission('PlanningItem', 'Add')
export const useCanEditPlanningItem = () =>
	useResourcePermission('PlanningItem', 'Edit')
export const useCanRemovePlanningItem = () =>
	useResourcePermission('PlanningItem', 'Remove')
export const useCanViewPlanningItem = () =>
	useResourcePermission('PlanningItem', 'View')

export const useCanAddOption = () => useResourcePermission('Option', 'Add')
export const useCanEditOption = () => useResourcePermission('Option', 'Edit')
export const useCanRemoveOption = () =>
	useResourcePermission('Option', 'Remove')
export const useCanViewOption = () => useResourcePermission('Option', 'View')

export const useCanUploadDocument = () =>
	useResourcePermission('Document', 'Upload')
export const useCanEditDocument = () =>
	useResourcePermission('Document', 'Edit')
export const useCanRemoveDocument = () =>
	useResourcePermission('Document', 'Remove')
export const useCanViewDocument = () =>
	useResourcePermission('Document', 'View')

export const useCanAddComment = () => useResourcePermission('Comment', 'Add')
export const useCanEditComment = () => useResourcePermission('Comment', 'Edit')
export const useCanRemoveComment = () =>
	useResourcePermission('Comment', 'Remove')
export const useCanViewComment = () => useResourcePermission('Comment', 'View')

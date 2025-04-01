export interface IProjectAccess {
	email: string
	availableProjects: {
		projectId: string
		projectCode: string
		groupName: string
	}[]
	lastAccessedProjectId?: string
}

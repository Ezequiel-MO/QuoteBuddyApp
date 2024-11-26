import { IProject } from '@interfaces/project'
import { initialProject } from './initialProject'

export const loadProjectFromLocalStorage = (): IProject => {
	try {
		const serializedProject = localStorage.getItem('currentProject')
		if (serializedProject === null) {
			// No data in localStorage, return the initial project
			return initialProject
		}
		return JSON.parse(serializedProject) as IProject
	} catch (err) {
		console.error('Could not load project from localStorage:', err)
		// In case of error, return the initial project
		return initialProject
	}
}

export const saveProjectToLocalStorage = (project: IProject): void => {
	try {
		const serializedProject = JSON.stringify(project)
		localStorage.setItem('currentProject', serializedProject)
	} catch (err) {
		console.error('Could not save project to localStorage:', err)
		// Handle the error as needed (e.g., show a notification)
	}
}

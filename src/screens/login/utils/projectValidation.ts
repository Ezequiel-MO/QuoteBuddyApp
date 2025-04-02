// src/utils/projectValidation.ts
import { IProject } from '@interfaces/project'

/**
 * Validates if a project has the current data structure
 * and can be safely rendered in the client application
 */
export const isValidProject = (project: IProject): boolean => {
	try {
		// Basic project structure check
		if (!project || typeof project !== 'object') return false

		// Check top-level required fields
		if (
			!project.groupName ||
			!project.groupLocation ||
			!project.arrivalDay ||
			!project.departureDay
		) {
			return false
		}

		// Check schedule array
		if (!Array.isArray(project.schedule) || project.schedule.length === 0) {
			return false
		}

		// Check client company
		if (
			!Array.isArray(project.clientCompany) ||
			project.clientCompany.length === 0
		) {
			return false
		}

		// Check for the new data structure in the first day of schedule
		const firstDay = project.schedule[0]

		// Check that lunch is IMeal structure (has restaurants array)
		if (!firstDay.lunch || !Array.isArray(firstDay.lunch.restaurants)) {
			return false
		}

		// Check that dinner is IMeal structure
		if (!firstDay.dinner || !Array.isArray(firstDay.dinner.restaurants)) {
			return false
		}

		// Check that morningEvents is IActivity structure (has events array)
		if (
			!firstDay.morningEvents ||
			!Array.isArray(firstDay.morningEvents.events)
		) {
			return false
		}

		// Check that afternoonEvents is IActivity structure
		if (
			!firstDay.afternoonEvents ||
			!Array.isArray(firstDay.afternoonEvents.events)
		) {
			return false
		}

		// All checks passed, this is a current project structure
		return true
	} catch (error) {
		// If any check throws an error, assume it's a legacy project
		console.error('Project validation error:', error)
		return false
	}
}

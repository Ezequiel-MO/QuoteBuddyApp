import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { ProjectAction } from '../context/contextinterfaces'
import { IProject } from '@interfaces/project'

export const resetProjectFilters = (
	dispatch: Dispatch<ProjectAction>,
	fields: Partial<Record<keyof IProject, any>>
) => {
	resetEntityFilters<IProject>(dispatch as Dispatch<any>, 'project', fields)
}

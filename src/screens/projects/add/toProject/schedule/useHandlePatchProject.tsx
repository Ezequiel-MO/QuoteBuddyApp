import { useCallback, useState } from 'react'
import { IProject } from '@interfaces/project'
import { toast } from 'react-toastify'
import { useCurrentProject } from 'src/hooks'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import { usePatchProject } from './usePatchProject'

type UseHandlePatchProjectHook = (project: IProject) => {
	handlePatchProject: (intro: string) => Promise<void>
	isLoading: boolean
}

export const useHandlePatchProject: UseHandlePatchProjectHook = (project) => {
	const { currentProject, setCurrentProject } = useCurrentProject()
	const { hotels, schedule, gifts } = currentProject

	const [isLoading, setIsLoading] = useState(false)

	const onSuccess = useCallback(() => {
		setCurrentProject(project)
		toast.success('Project Completed, congratulations !!', toastOptions)
	}, [project, setCurrentProject])

	const onError = useCallback((error: any) => {
		toast.error(`${error.message}`, errorToastOptions)
	}, [])

	const patchProject = usePatchProject(onSuccess, onError)

	const handlePatchProject = useCallback(
		async (intro: string) => {
			if (project._id) {
				setIsLoading(true)
				try {
					await patchProject(project._id, {
						schedule,
						hotels,
						gifts,
						projectIntro: intro
					})
				} catch (error) {
					console.error('Error patching project:', error) // Ensure errors are logged
				} finally {
					setIsLoading(false) // Ensure this is called after await completes
				}
			} else {
				toast.error(
					'Project ID is missing. Unable to save changes.',
					errorToastOptions
				)
			}
		},
		[patchProject, project._id, schedule, hotels, gifts]
	)

	return { handlePatchProject, isLoading }
}

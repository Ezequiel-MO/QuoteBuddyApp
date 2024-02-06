import { FC } from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { ProjectIntroForm } from '../toProject/intro/forms/ProjectIntroForm'
import { usePatchProject } from '../toProject/schedule/usePatchFinalProject'
import { IProject } from '@interfaces/project'

interface AddFullProgramToDataBaseProps {
	project: IProject
}

export const AddFullProgramToDataBase: FC<AddFullProgramToDataBaseProps> = ({
	project
}) => {
	const { currentProject, setCurrentProject } = useCurrentProject()
	const { hotels, schedule, projectIntro, gifts } = currentProject

	const onSuccess = () => {
		setCurrentProject(project)
		toast.success('Project Completed, congratulations !!', toastOptions)
	}

	const onError = (error: any) => {
		toast.error(`${error.message}`, errorToastOptions)
	}

	const patchProject = usePatchProject(onSuccess, onError)

	const handlePatchProject = async (intro: string) => {
		patchProject(project._id, {
			schedule,
			hotels,
			gifts,
			projectIntro: intro
		})
	}

	const projectTextContext = { textContent: projectIntro?.join('') }

	return (
		<>
			<div className="block rounded-lg shadow-lg bg-white w-full">
				<ProjectIntroForm
					onSubmit={handlePatchProject}
					projectIntro={projectTextContext}
				/>
			</div>
		</>
	)
}

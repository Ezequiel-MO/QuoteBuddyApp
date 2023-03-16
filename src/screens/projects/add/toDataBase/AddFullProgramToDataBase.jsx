import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { ProjectIntroForm } from '../toProject/intro/forms/ProjectIntroForm'
import { usePatchProject } from '../toProject/schedule/usePatchFinalProject'

export const AddFullProgramToDataBase = ({ project }) => {
	const navigate = useNavigate()
	const { currentProject, setCurrentProject } = useCurrentProject()
	const { hotels, schedule, projectIntro } = currentProject

	const onSuccess = () => {
		setCurrentProject(project)
		toast.success('Project Completed, congratulations !!', toastOptions)
		setTimeout(() => navigate('/app/project/schedule'), 1000)
	}

	const onError = (error) => {
		toast.error(`${error.message}`, errorToastOptions)
	}

	const patchProject = usePatchProject(onSuccess, onError)

	const handlePatchProject = async (intro) => {
		patchProject(project._id, {
			schedule,
			hotels,
			projectIntro: intro
		})
	}

	return (
		<>
			<div className="block rounded-lg shadow-lg bg-white w-full">
				<ProjectIntroForm
					onSubmit={handlePatchProject}
					projectIntro={projectIntro}
				/>
			</div>
		</>
	)
}

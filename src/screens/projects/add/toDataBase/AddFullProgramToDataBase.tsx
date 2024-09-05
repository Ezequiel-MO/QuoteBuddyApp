import { FC } from 'react'
import { ProjectIntroForm } from '../toProject/intro/forms/ProjectIntroForm'
import { IProject } from '@interfaces/project'
import { Spinner } from '@components/atoms'
import { useHandlePatchProject } from '../toProject/schedule/useHandlePatchProject'
import { useCurrentProject } from 'src/hooks'

export const AddFullProgramToDataBase: FC = () => {
	const { currentProject } = useCurrentProject()
	const { handlePatchProject, isLoading } = useHandlePatchProject(
		currentProject as IProject
	)

	const projectTextContext = {
		textContent: currentProject?.projectIntro?.join('')
	}

	return (
		<div className="block rounded-lg shadow-lg w-full">
			<ProjectIntroForm
				onSubmit={handlePatchProject}
				projectIntro={projectTextContext}
				isLoading={isLoading}
			/>
			{isLoading && (
				<div className="text-white-0 text-center mt-2">
					<Spinner />
				</div>
			)}
		</div>
	)
}

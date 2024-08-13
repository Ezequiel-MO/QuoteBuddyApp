import { FC, FormEvent, useState } from 'react'
import { GiftSchedule } from '../../../../render/gift/GiftSchedule'
import { RichTextEditor } from '../../../../../../components/molecules'
import { useProject } from '@screens/projects/context/ProjectContext'

interface ProjectIntroFormProps {
	onSubmit: (intro: string) => void
	projectIntro: {
		textContent: string
	}
}

export const ProjectIntroForm: FC<ProjectIntroFormProps> = ({
	onSubmit,
	projectIntro
}) => {
	const { state } = useProject()
	const [introduction, setIntroduction] = useState<string>(
		projectIntro.textContent || ''
	)

	const update = projectIntro.textContent?.length > 0

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit(introduction)
	}
	return (
		<form onSubmit={handleSubmit}>
			<button
				className="h-12 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
				type="submit"
			>
				Save Final Project
			</button>
			{state.selectedTab === 'Intro Text/Gifts' && (
				<div className="my-2">
					<RichTextEditor
						style={{}}
						textContent={introduction}
						setTextContent={setIntroduction}
						update={update}
						screen={projectIntro}
					/>
					<GiftSchedule />
				</div>
			)}
		</form>
	)
}

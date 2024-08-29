import { FC, FormEvent, useState } from 'react'
import { GiftSchedule } from '../../../../render/gift/GiftSchedule'
import TextEditor from '../../../../../../components/molecules/TextEditor'
import { useProject } from '@screens/projects/context/ProjectContext'

interface ProjectIntroFormProps {
	onSubmit: (intro: string) => void
	projectIntro: {
		textContent: string
	}
	isLoading: boolean // Add isLoading prop
}

export const ProjectIntroForm: FC<ProjectIntroFormProps> = ({
	onSubmit,
	projectIntro,
	isLoading
}) => {
	const { state } = useProject()
	const [introduction, setIntroduction] = useState<string>(
		projectIntro.textContent || ''
	)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit(introduction)
	}

	return (
		<form onSubmit={handleSubmit}>
			<button
				className="my-4 h-12 inline-block px-6 py-2 border-2 border-cyan-400 text-orange-400 font-bold text-lg leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
				type="submit"
				disabled={isLoading} // Disable button when loading
			>
				{isLoading ? 'Saving...' : 'Save Final Project'}
			</button>
			{state.selectedTab === 'Intro Text/Gifts' && (
				<div className="my-2">
					<TextEditor value={introduction} onChange={setIntroduction} />
					<GiftSchedule />
				</div>
			)}
		</form>
	)
}

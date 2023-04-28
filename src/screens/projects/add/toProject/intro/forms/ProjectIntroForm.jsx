import { useState } from 'react'
import { RichTextEditor } from '../../../../../../ui/'

export const ProjectIntroForm = ({ onSubmit, projectIntro }) => {
	const [introduction, setIntroduction] =
		useState()
		// projectIntro ? projectIntro.toString() : ''

	// console.log(typeof projectIntro.join("") === "string")
	const update = projectIntro.textContent?.length > 0

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(introduction)
	}

	return (
		<form
			onSubmit={handleSubmit}
			// className="bg-[#000] text-[#fff]"
		>
			<RichTextEditor
				style={{}}
				textContent={introduction}
				setTextContent={setIntroduction}
				update={update}
				screen={projectIntro}
			/>
			<button
				className="h-12 mt-10 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
				type="submit"
			>
				Save Final Project
			</button>
		</form>
	)
}

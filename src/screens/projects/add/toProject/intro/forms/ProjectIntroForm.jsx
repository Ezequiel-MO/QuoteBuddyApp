import { useState } from 'react'

export const ProjectIntroForm = ({ onSubmit, projectIntro }) => {
	const [introduction, setIntroduction] = useState(projectIntro || '')

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(introduction)
	}

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				name="introduction"
				value={introduction}
				onChange={(e) => setIntroduction(e.target.value)}
				className="form-control h-52 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out my-7 focus:text-gray-700 focus:outline-none"
				placeholder="Write here an introduction for the whole project - that will be displayed in the top of the project page"
				type="text"
			/>
			<button
				className="h-12 mt-4 inline-block px-6 py-2 border-2 border-orange-50 text-orange-50 font-medium text-sm leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
				type="submit"
			>
				Save Final Project
			</button>
		</form>
	)
}

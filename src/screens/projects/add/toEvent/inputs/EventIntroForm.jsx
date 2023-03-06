import { useState } from 'react'
import { Button } from '../../../../../ui'
import { IntroToEventInput } from './IntroToEventInput'

export const EventIntroForm = ({ handleAddIntro, handleAddEvent }) => {
	const [intro, setIntro] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		handleAddIntro(intro)
		handleAddEvent()
	}

	return (
		<div className="flex flex-col justify-center items-center ">
			<h1 className="text-2xl mb-4">Add Introduction to Event ? </h1>
			<form onSubmit={handleSubmit}>
				<div className="w-full sm:w-1/2 flex flex-col">
					<div className="flex flex-col">
						<IntroToEventInput setIntro={setIntro} intro={intro} />
					</div>
				</div>
				<div className="mt-10">
					<Button type="submit">Add Introduction</Button>
				</div>
			</form>
		</div>
	)
}

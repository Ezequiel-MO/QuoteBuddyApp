import { useState } from 'react'
import { Button } from '../../../../../ui'
import { IntroToEventInput } from './IntroToEventInput'

export const EventIntroForm = ({ handleAddIntro, handleAddEvent }) => {

	const [textContent, setTextContent] = useState()

	const handleSubmit = (e) => {
		e.preventDefault()
		handleAddIntro(textContent)
		handleAddEvent()
	}

	return (
		<div className="flex flex-col justify-center items-center ">
			<h1 className="text-2xl mb-4" style={{marginRight:"150px"}}>
				Add Introduction to Event ? 
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="w-full sm:w-1/2 flex flex-col">
					<div className="flex flex-col">
						<IntroToEventInput setTextContent={setTextContent} textContent={textContent} />
					</div>
				</div>
				<div className="mt-10" style={{marginLeft:"150px"}} >
					<Button type="submit">Add Introduction</Button>
				</div>
			</form>
		</div>
	)
}

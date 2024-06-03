import { useState } from 'react'
import { useHotel } from '../context/HotelsContext'
import { RichTextEditor } from '@components/molecules'
import { LanguageSelector } from './LanguageSelect'

export const AddDescriptionsInLanguages = () => {
	const { state, dispatch } = useHotel()
	const [content, setContent] = useState('')
	const [selectedLanguage, setSelectedLanguage] = useState('')

	const handleAddDescription = () => {
		dispatch({
			type: 'ADD_DESCRIPTION',
			payload: { key: selectedLanguage, value: content }
		})
	}

	const handleRemoveDescription = () => {
		if (selectedLanguage) {
			dispatch({
				type: 'REMOVE_DESCRIPTION',
				payload: { key: selectedLanguage }
			})
			setContent('') // Reset content after removing
		} else {
			alert('Please select a language')
		}
	}

	return (
		<>
			{state.currentHotel?.descriptions &&
				state.currentHotel?.descriptions?.map((el: any, index) => {
					return (
						<div key={index}>
							<div className="mb-2">
								<LanguageSelector
									selectedLanguage={selectedLanguage}
									setSelectedLanguage={setSelectedLanguage}
								/>
							</div>

							<RichTextEditor
								textContent={content}
								setTextContent={setContent}
								update={state.update}
								screen={{}}
								style={{ marginBottom: '25px' }}
							/>

							<button
								className=" text-red-400 hover:text-red-600 ml-96 mt-2"
								onClick={handleRemoveDescription}
							>
								Delete Description
							</button>
						</div>
					)
				})}
			<button
				className=" text-green-300 hover:text-green-500"
				onClick={handleAddDescription}
			>
				+ Add Description
			</button>
		</>
	)
}

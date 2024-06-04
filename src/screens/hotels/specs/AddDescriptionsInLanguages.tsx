import { useCallback, useState } from 'react'
import { useHotel } from '../context/HotelsContext'
import { RichTextEditor } from '@components/molecules'
import { LanguageSelector } from './LanguageSelect'

export const AddDescriptionsInLanguages = () => {
	const { state, dispatch } = useHotel()
	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

	const handleAddDescription = () => {
		dispatch({
			type: 'ADD_DESCRIPTION'
		})
		setSelectedLanguages([...selectedLanguages, ''])
	}

	const handleRemoveDescription = (index: number) => {
		dispatch({
			type: 'REMOVE_DESCRIPTION',
			payload: { index }
		})
		setSelectedLanguages(selectedLanguages.filter((_, i) => i !== index))
	}

	const handleLanguageChange = (index: number, languageCode: string) => {
		dispatch({
			type: 'UPDATE_DESCRIPTION',
			payload: {
				index,
				description: { languageCode }
			}
		})
		const updatedLanguages = [...selectedLanguages]
		updatedLanguages[index] = languageCode
		setSelectedLanguages(updatedLanguages)
	}

	const handleContentChange = useCallback(
		(index: number, content: string) => {
			dispatch({
				type: 'UPDATE_DESCRIPTION',
				payload: {
					index,
					description: { value: content }
				}
			})
		},
		[dispatch]
	)

	return (
		<div>
			{state.currentHotel?.descriptions &&
				state.currentHotel.descriptions.map((description, index) => (
					<div key={index}>
						<div className="mb-2">
							<LanguageSelector
								selectedLanguage={selectedLanguages[index]}
								setSelectedLanguage={(lang) =>
									handleLanguageChange(index, lang)
								}
							/>
						</div>
						<RichTextEditor
							textContent={description.value}
							setTextContent={(content: string) =>
								handleContentChange(index, content)
							}
							update={state.update}
							screen={{}}
							style={{ marginBottom: '25px' }}
						/>
						<button
							className="text-red-400 hover:text-red-600 ml-96 mt-2"
							onClick={() => handleRemoveDescription(index)}
						>
							Delete Description
						</button>
					</div>
				))}
			<button
				className="text-green-300 hover:text-green-500"
				type="button"
				onClick={handleAddDescription}
			>
				+ Add Description
			</button>
		</div>
	)
}

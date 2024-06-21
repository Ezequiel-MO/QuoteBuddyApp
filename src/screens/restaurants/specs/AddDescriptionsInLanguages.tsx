import { useCallback } from 'react'
import TextEditor from '@components/molecules/TextEditor'
import { useRestaurant } from '../context/RestaurantsContext'
import { LanguageSelector } from '@components/molecules/LanguageSelect'

export const AddDescriptionsInLanguages = () => {
	const { state, dispatch } = useRestaurant()

	const handleAddDescription = () => {
		dispatch({
			type: 'ADD_DESCRIPTION'
		})
	}

	const handleRemoveDescription = (index: number) => {
		dispatch({
			type: 'REMOVE_DESCRIPTION',
			payload: { index }
		})
	}

	const handleLanguageChange = (index: number, languageCode: string) => {
		dispatch({
			type: 'UPDATE_DESCRIPTION',
			payload: {
				index,
				description: { languageCode }
			}
		})
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
			{Array.isArray(state.currentRestaurant?.descriptions) &&
				state.currentRestaurant.descriptions.map((description, index) => {
					return (
						<div key={index}>
							<div className="mb-2">
								<LanguageSelector
									selectedLanguage={description.languageCode}
									setSelectedLanguage={(lang) =>
										handleLanguageChange(index, lang)
									}
								/>
							</div>
							<TextEditor
								value={description.value || ''}
								onChange={(content) => handleContentChange(index, content)}
							/>
							<button
								className="text-red-400 hover:text-red-600 ml-96 mt-2"
								onClick={() => handleRemoveDescription(index)}
							>
								Delete Description
							</button>
						</div>
					)
				})}
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

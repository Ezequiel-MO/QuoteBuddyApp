import React, { FC } from 'react'
import { LanguageSelector } from './LanguageSelector'
import { RichTextEditor } from 'src/components/molecules'
import languagesJson from 'src/constants/languages.json'
import { IRestaurant } from '@interfaces/restaurant'

interface DescriptionFormProps {
	descriptionsByLanguage: object[]
	setDescriptionsByLanguage: React.Dispatch<React.SetStateAction<object[]>>
	data: IRestaurant
	setData: React.Dispatch<React.SetStateAction<IRestaurant>>
}

export const DescriptionForm: FC<DescriptionFormProps> = ({
	descriptionsByLanguage,
	setDescriptionsByLanguage,
	data,
	setData
}) => {
	const addDescription = () => {
		const newDescription = {}
		setDescriptionsByLanguage([...descriptionsByLanguage, newDescription])
	}

	const removeDescription = (index: number) => {
		const updatedDescriptions = descriptionsByLanguage.filter(
			(_, idx) => idx !== index
		)
		setDescriptionsByLanguage(updatedDescriptions)
	}

	const handleRichTextEditor = (text: string, index: number) => {
		const updated = descriptionsByLanguage.map((el, idIndex) => {
			if (idIndex === index) {
				return { ...el, [Object.keys(el)[0]]: text }
			}
			return el
		})
		setDescriptionsByLanguage(updated)
	}

	const nameCountryByCode = (code: string) => {
		const country = languagesJson.find((el) => el.code === code)
		return country?.name
	}

	return (
		<div>
			{descriptionsByLanguage.map((el: any, index) => (
				<div key={index} className="mt-4">
					<label className="block uppercase text-lg text-gray-400 font-medium mb-4 ">
						<hr />
						{Object.keys(el).length > 0 &&
							`description ( ${nameCountryByCode(Object.keys(el)[0])} )`}
					</label>
					<LanguageSelector
						index={index}
						descriptionsByLanguage={descriptionsByLanguage}
						setDescriptionsByLanguage={setDescriptionsByLanguage}
						setData={setData}
					/>
					{Object.keys(el).length > 0 && (
						<div className="mt-4">
							<RichTextEditor
								textContent={el[Object.keys(el)[0]]}
								setTextContent={(text: string) =>
									handleRichTextEditor(text, index)
								}
								update={false}
								screen={{}}
								keyScreen=""
								style={{ width: '102%', marginBottom: '50px' }}
							/>
						</div>
					)}
					<button
						type="button"
						className=" text-red-400 hover:text-red-600 ml-96 mt-2"
						onClick={() => removeDescription(index)}
					>
						Delete Description
					</button>
				</div>
			))}
			<button
				type="button"
				className=" text-green-300 hover:text-green-500"
				onClick={addDescription}
			>
				+ Add Description
			</button>
		</div>
	)
}

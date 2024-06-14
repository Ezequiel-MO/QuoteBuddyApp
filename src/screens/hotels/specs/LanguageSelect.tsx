import { useState, FC, ChangeEvent } from 'react'
import languagesJson from 'src/constants/languages.json'

interface LanguageSelectorProps {
	selectedLanguage: string
	setSelectedLanguage: (language: string) => void
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({
	selectedLanguage,
	setSelectedLanguage
}) => {
	const [search, setSearch] = useState('')

	const filteredOptions = languagesJson
		.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className="w-2/5 px-2 py-1 text-base border border-solid bg-gray-700 rounded focus:text-white-0"
				type="text"
				placeholder="Search..."
				value={search}
				onChange={handleSearch}
			/>
			<select
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				name="availableLanguages"
				value={selectedLanguage}
				onChange={(e: ChangeEvent<HTMLSelectElement>) =>
					setSelectedLanguage(e.target.value)
				}
			>
				<option value="">Select a language</option>
				{filteredOptions.map((el, index) => (
					<option key={index} value={el.code}>
						{el.name}
					</option>
				))}
			</select>
		</div>
	)
}

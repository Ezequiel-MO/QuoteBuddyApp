import React, { useState, ChangeEvent, FC } from 'react'
import languagesJson from 'src/constants/languages.json'

interface ProjectLanguageSelectorProps {
	languageVendorDescriptions: string
	handleChange: (
		event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => void
}

export const ProjectLanguageSelector: FC<ProjectLanguageSelectorProps> = ({
	languageVendorDescriptions,
	handleChange
}) => {
	const [search, setSearch] = useState<string>('')

	const filteredOptions = languagesJson
		.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const code = filteredOptions[0]?.code
		if (e.key === 'Enter' && filteredOptions.length > 0) {
			handleChange({
				target: {
					name: 'languageVendorDescriptions',
					value: code
				}
			} as ChangeEvent<HTMLInputElement>)
			e.preventDefault()
		}
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full flex items-center">
			<input
				className="w-2/5 px-2 py-1 text-base border border-solid bg-gray-700 rounded focus:text-white-0"
				type="text"
				placeholder="Search..."
				value={search}
				onChange={handleSearch}
				onKeyDown={handleKeyDown}
			/>
			<select
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				name="languageVendorDescriptions"
				value={languageVendorDescriptions}
				onChange={handleChange}
			>
				{!search && <option value="">Select a language</option>}
				{filteredOptions.length === 0 ? (
					<option value="">No language exists</option>
				) : (
					filteredOptions.map((el, index) => (
						<option key={index} value={el.code}>
							{el.name}
						</option>
					))
				)}
			</select>
		</div>
	)
}

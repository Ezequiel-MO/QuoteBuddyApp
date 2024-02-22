import { useState, useEffect, FC, ChangeEvent } from "react"
import languagesJson from "src/constants/languages.json"

interface ProjectLanguageSelector {
    languageVendorDescriptions: string
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    errors: { [key: string]: string | undefined }
}

export const ProjectLanguageSelector: FC<ProjectLanguageSelector> = ({
    languageVendorDescriptions,
    handleChange,
    handleBlur,
    errors
}) => {

    const [search, setSearch] = useState('')

    const filteredOptions = languagesJson.filter(
        (el) =>
            el.name.toLowerCase().includes(search.toLowerCase())
    ).sort(function (a, b) {
        if (a.name > b.name) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }
        return 0
    })

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        (e.target as any).name = "languageVendorDescriptions"
        const code = filteredOptions[0].code
        if (e.key === 'Enter' && filteredOptions.length > 0) {
            (e.target as any).value = code
            handleChange(e as any)
            e.preventDefault()
        }
    }


    return (
        <div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
            <input
                className="w-2/5
				px-2
				py-1
				text-base
				border 
				border-solid 
				bg-gray-700
				rounded
				focus:text-white-0 "
                type="text"
                placeholder="search..."
                value={search}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
            />
            <select
                className="flex-1
				w-3/6
				py-1 
				px-2 
				border-0 
				rounded-md 
				bg-gray-700 
				text-center 
				cursor-pointer ml-2"
                name="languageVendorDescriptions"
                value={languageVendorDescriptions}
                onChange={handleChange}
            >
                {
                    !search ?
                        <option value="">Select a languaje</option>
                        :
                        (<option value="">
                            {filteredOptions.length > 0 ?
                                `Search Result:${filteredOptions.length}`
                                : "no lenguaje exists"}
                        </option>)
                }
                {
                    filteredOptions?.map((el, index) => {
                        return (
                            <option
                                key={index}
                                value={el.code}
                            >
                                {el.name}
                            </option>
                        )
                    })
                }
            </select>
            {
                errors.languageVendorDescriptions && (
                    <p className="mt-1 text-red-500 ml-96">{errors.languageVendorDescriptions}</p>
                )
            }
        </div>
    )
}
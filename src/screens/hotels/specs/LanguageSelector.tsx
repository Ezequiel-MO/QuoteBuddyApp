import { useState, useEffect, FC, ChangeEvent } from "react"
import lenguagesJson from "src/constants/languages.json"

interface LanguageSelectorProps {
    index: number
    descriptionsByLanguage: object[]
    setDescriptionsByLanguage: React.Dispatch<React.SetStateAction<object[]>>
    setData: React.Dispatch<React.SetStateAction<any>>
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({
    index,
    descriptionsByLanguage,
    setDescriptionsByLanguage,
    setData
}) => {

    const [search, setSearch] = useState('')
    const [availableLanguages, setAvailableLanguages] = useState(["en"])

    const filteredOptions = lenguagesJson.filter(
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
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        const updatedData = descriptionsByLanguage.map((el, idIndex) => {
            if (idIndex === index && value !== "none") {
                return { [value]: "" };
            }
            return el;
        });
        setDescriptionsByLanguage(updatedData)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && filteredOptions.length > 0) {
            const code = filteredOptions[0].code
            const exists = availableLanguages.find(el => el === code)
            if (exists) {
                e.preventDefault()
                return alert("There is a description with this language")
            }
            (e.target as any).value = code
            handleSelect(e as any)
            e.preventDefault()
        }
    }

    useEffect(() => {
        const update: string[] = []
        for (let i = 0; i < descriptionsByLanguage.length; i++) {
            const code = Object.keys(descriptionsByLanguage[i])[0]
            if (code) {
                update.push(code)
            }
        }
        if (!update.includes("en")) update.push("en")
        setAvailableLanguages(update)
        setData((prevData: any) => ({
            ...prevData,
            ["availableLanguages"]: update
        }))
    }, [descriptionsByLanguage])


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
                name="availableLanguages"
                value={Object.keys(descriptionsByLanguage[index])[0]}
                onChange={handleSelect}
            >
                {
                    !search ?
                        <option value="none">Select a languaje</option>
                        :
                        (<option value="none">
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
                                disabled={availableLanguages.includes(el.code)}
                            >
                                {el.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}
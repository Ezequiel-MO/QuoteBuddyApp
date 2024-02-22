import { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import lenguagesJson from "src/constants/languages.json"

interface LanguageFilterProps {
    setLanguage: (value: string) => void
    language: string
}

export const LanguageFilter: FC<LanguageFilterProps> = ({ language, setLanguage }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const filteredOptions = searchTerm ? lenguagesJson.filter(
        (el) =>
            el.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort(function (a, b) {
        if (a.name > b.name) {
            return 1
        }
        if (a.name < b.name) {
            return -1
        }
        return 0
    }) : lenguagesJson

    const handleLanguageChange = (languageCode: string) => {
        setLanguage(languageCode)
        setIsDropdownVisible(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && filteredOptions.length > 0) {
            handleLanguageChange(filteredOptions[0].code)
            e.preventDefault()
        }
    }

    const selectLanguage = lenguagesJson.find(el => el.code === language)

    //"useEffect" que sirve cuando click fuera del div que se cierre
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownRef])


    useEffect(() => {
        setSearchTerm("")
    }, [isDropdownVisible])

    return (
        <div className='relative' ref={dropdownRef}>
            <div
                className='min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-1 flex items-center justify-between'
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
                <span>
                    {
                        selectLanguage &&
                            Object.values(selectLanguage).length > 0 ?
                            selectLanguage.name
                            :
                            'Select a Language'
                    }
                </span>
                {
                    isDropdownVisible ?
                        <Icon icon="raphael:arrowup" />
                        :
                        <Icon icon="raphael:arrowdown" />
                }
            </div>
            {
                isDropdownVisible &&
                <div className="min-w-[200px] absolute mt-1 w-full rounded-md bg-gray-600 shadow-lg z-50">
                    <div className="p-2 border-b border-gray-300">
                        Find Active Language
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
                            placeholder="Search Language..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {
                            filteredOptions.map((language, index) => {
                                return (
                                    <div
                                        key={language.code}
                                        className='p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer'
                                        onClick={() => handleLanguageChange(language.code)}
                                    >
                                        {language.name}
                                    </div>
                                )
                            })
                        }
                        {
                            selectLanguage &&
                            <div
                                className='p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer'
                                onClick={() => handleLanguageChange("")}
                            >
                                ALL
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )

}
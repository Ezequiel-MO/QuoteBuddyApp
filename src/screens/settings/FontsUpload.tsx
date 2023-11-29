import { useState, useEffect, FC, ChangeEvent } from "react"
import { Icon } from '@iconify/react'
import { ISetting } from "src/interfaces/setting"

interface FontsUploadProps {
    setting: ISetting | undefined
    onUpload: (values: string[]) => void
    onDeleted: (values: string[]) => void
}

export const FontsUpload: FC<FontsUploadProps> = ({ onUpload, setting, onDeleted }) => {
    const [fonts, setFonts] = useState<string[]>([])

    const commonFonts = [
        "Arial", "Verdana", "Helvetica",
        "Tahoma", "Trebuchet MS", "Times New Roman",
        "Georgia", "Garamond", "Courier New",
        "Brush Script MT", "Lucida Sans", "Impact"
    ]

    useEffect(() => {
        if (setting && setting.fonts.length > 0) {
            setFonts(setting.fonts)
        }
    }, [setting])

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        if (value !== "" && !fonts.includes(value)) {
            onUpload([...fonts, value])
        }
    }

    const handleClickDeleted = (indexFont: number) => {
        const fontsFiltred = fonts.filter((el, index) => index !== indexFont)
        onDeleted(fontsFiltred)
    }

    return (
        <div className={`flex flex-col items-center p-4 border-2 border-gray-600 bg-gray-800  rounded-md shadow-md space-y-2 overflow-hidden relative`}>
            <h1 className="self-start text-xl">Upload Fonts</h1>
            <select
                className="cursor-pointer w-60 p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0 text-center"
                name="font"
                onChange={handleChangeSelect}
            >
                <option value="">
                    -- Select a font --
                </option>
                {
                    commonFonts.map((el, index) => {
                        return (
                            <option value={el} id={index.toString()} key={index} style={{ fontFamily: el }}>
                                {el}
                            </option>
                        )
                    })
                }
            </select>
            <div
                className={fonts.length > 0 ? `list-disc  list-outside px-12 py-3  border-2 border-gray-600 bg-slate-700  rounded-xl shadow-md space-x-4` : ""}
            >
                {
                    fonts.map((el, index) => {
                        return (
                            <span style={{ fontFamily: el, fontSize: "18px" }} key={index} id={index.toString()}>
                                {el}
                                <button
                                    style={{ marginLeft: "3px" }}
                                    type="button"
                                    className="hover:scale-125"
                                    id={index.toString()}
                                    onClick={() => handleClickDeleted(index)}
                                >
                                    <Icon className=" text-red-400 hover:text-red-700" icon="ph:x-circle-bold" />
                                </button>,
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
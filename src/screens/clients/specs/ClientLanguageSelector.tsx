import { FC } from "react"

interface ClientLanguageSelectorProps {
    options: string[]
    quoteLanguage:string
    errors: { [key: string]: string | undefined }
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    handleBlur: (
        event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
}

export const ClientLanguageSelector: FC<ClientLanguageSelectorProps> = ({
    quoteLanguage,
    options,
    errors,
    handleChange,
    handleBlur
}) => {
    return (
        <div className="my-2">
            <label className="block uppercase text-lg text-gray-400 font-medium mb-2">
                Quote Language
            </label>
            <select
                className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
                name="quoteLanguage"
                value={quoteLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
            >
                <option value="">-- Choose an option --</option>
                {
                    options?.map((el, index) => {
                        return (
                            <option value={el} key={index}>
                                {el}
                            </option>
                        )
                    })
                }
            </select>
            {
                errors.quoteLanguage && (
                    <p className="mt-1 text-red-500">{errors.quoteLanguage}</p>
                )
            }
        </div>
    )
}
import { FC, ChangeEvent, FocusEvent } from "react"

interface IOption{
    value:string
    name:string
}

interface SelectModuleProps {
    options: IOption[]
    module: string
    handleChange: (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    // errors: { [key: string]: string | undefined }
    // handleBlur: (
    //     event: FocusEvent<HTMLInputElement | HTMLSelectElement>
    // ) => void
}

export const SelectModule: FC<SelectModuleProps> = ({
    options,
    module,
    handleChange,
    // errors,
    // handleBlur
}) => {
    return (
        <div>
            <label className="block uppercase text-lg text-gray-400 font-medium mb-0.5">
                Module
            </label>
            <select
                className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
                name="module"
                value={module}
                onChange={handleChange}
                // onBlur={handleBlur}
            >
                <option value="">-- Choose an option --</option>
                {
                    options?.map((el, index) => {
                        return (
                            <option value={el.value} key={index}>
                                {el.name}
                            </option>
                        )
                    })
                }
            </select>
            {
                // errors.module && (
                //     <p className="mt-1 text-red-500">{errors.module}</p>
                // )
            }
        </div>
    )
}
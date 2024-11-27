import React, { FC, FocusEvent } from "react"

interface SelectInputProps {
    options: any[]
    titleLabel: string
    placeholderOption?: string
    name: string
    // keyValue: string
    value: string
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        // keyvalue: string
    ) => void
    errors?: { [key: string]: string | undefined }
    errorKey?: string
    handleBlur?: (
        event: FocusEvent<HTMLInputElement | HTMLSelectElement>
    ) => void
    disabled?: boolean
}


export const SelectInput: FC<SelectInputProps> = ({
    options,
    titleLabel,
    placeholderOption,
    name,
    // keyValue,
    value,
    handleChange,
    errors,
    errorKey,
    handleBlur,
    disabled = false
}) => {

    const className = 'cursor-pointer w-full px-3 py-[10.5px] border rounded-md bg-gray-700 focus:border-blue-500 focus:outline-none text-white-0 hover:border-blue-400'
    const classNameDisabled = 'w-full px-3 py-[10.5px] border rounded-md bg-gray-700  text-white-0'

    return (
        <>
            <label className="uppercase text-xl text-gray-600 font-bold block">
                {titleLabel}
            </label>
            <select
                className={!disabled ? className : classNameDisabled}
                name={name}
                id={name}
                value={value}
                onChange={(event) => handleChange(event)}
                onBlur={handleBlur}
                disabled={disabled}
            >
                <option value="">{placeholderOption ?? "-- unknown --"}</option>
                {
                    options.map((el, index) => {
                        return (
                            <option value={el.value} key={index}>
                                {el.name}
                            </option>
                        )
                    })
                }
            </select>
            {
                (errors && errorKey) && errors[errorKey] && (
                    <p className="mt-1 text-red-500">{errors[errorKey]}</p>
                )
            }
        </>
    )
}
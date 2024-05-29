import React, { FC } from "react"

interface ClientOptionsSelectProps {
    options: any[]
    titleLabel: string
    name: string
    keyValue: string
    value: string
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        keyvalue: string
    ) => void
}


export const ClientOptionsSelect: FC<ClientOptionsSelectProps> = ({
    options,
    titleLabel,
    name,
    keyValue,
    value,
    handleChange
}) => {

    return (
        <>
            <label className="uppercase text-xl text-gray-600 font-bold block">
                {titleLabel}
            </label>
            <select
                className="cursor-pointer w-full px-3 py-[10.5px] border rounded-md bg-gray-700 focus:border-blue-500 focus:outline-none text-white-0"
                name={name}
                id={name}
                value={value}
                onChange={(event) => handleChange(event, keyValue)}
            >
                <option value="">-- unknown --</option>
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
        </>
    )
}
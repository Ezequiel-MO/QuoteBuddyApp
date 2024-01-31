import React, { FC } from 'react'

interface SelectedAccManagersBoxProps {
    accManegers: string[]
    setData: React.Dispatch<React.SetStateAction<any>>
}

export const SelectedAccManagersBox: FC<SelectedAccManagersBoxProps> = ({ accManegers, setData }) => {

    const handleDelete = (accManeger: string) => {
        const updateAccManageres = accManegers.filter(el => el !== accManeger)
        console.log({ updateAccManageres, accManegers })
        setData((prevData: any) => (
            {
                ...prevData,
                ["accManagers"]: updateAccManageres
            }
        ))
    }

    if (accManegers.length === 0) return null


    return (
        <div className="rounded-lg bg-white-50 mt-2 p-4 shadow-lg">
            <p className="uppercase font-bold text-gray-700 text-center mb-4">
                Selected Acc.Manger
            </p>
            <ul className="space-y-2">
                {accManegers.map((accManeger) => {
                    const regex = /^[0-9a-fA-F]+ (.+)$/
                    const match = accManeger.match(regex)
                    return (
                        <li
                            key={accManeger}
                            className="flex items-center justify-between p-2 rounded-lg bg-gray-100"
                        >
                            <span className="text-gray-700">{match && match[1]}</span>
                            <button
                                className="text-white-0 text-sm bg-red-500 hover:bg-red-700 font-bold rounded-full h-6 w-6 flex items-center justify-center"
                                onClick={() => handleDelete(accManeger)}
                            >
                                X
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

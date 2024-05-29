import React, { FC } from "react"
import { ClientOptionsSelect } from "./ClientOptionsSelect"
import { IClient } from 'src/interfaces/'
import { RichTextEditor } from "src/components/molecules"


interface ClientQualificationProps {
    data: IClient
    setData: React.Dispatch<React.SetStateAction<any>>
    update: boolean
}


export const ClientQualification: FC<ClientQualificationProps> = ({ data, setData, update }) => {

    const optionsQualification = [
        { value: "NeverRequested", name: "Never Requested" },
        { value: "RequestedButNotProceeded", name: "Requested But Not Proceeded" },
        { value: "Proceeded", name: "Proceeded" },
        { value: "RegularClient", name: "Regular Client" },
        { value: "LostClient", name: "Lost Client" },
    ]

    const handleOptionsSelect = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, keyValue: string) => {
        const { name, value } = event.target
        setData((prevData: any) => ({
            ...prevData,
            [name]: {
                ...prevData[name],
                [keyValue]: value
            }
        }))
    }

    const handleRichTextEditor = (text: string) => {
        const updateData = { ...data }
        updateData.qualification.textContent = text
        setData(updateData)
    }

    return (
        <>
            <ClientOptionsSelect
                options={optionsQualification}
                titleLabel="qualification"
                name="qualification"
                handleChange={handleOptionsSelect}
                keyValue="status"
                value={data.qualification.status}
            />
            <div className="mt-4">
                <label className="block uppercase text-lg text-gray-400 font-medium">
                    description
                </label>
                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden 
                    ${data.qualification.status ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <RichTextEditor
                        textContent={data.qualification?.textContent}
                        setTextContent={(text: string) => handleRichTextEditor(text)}
                        update={false} //
                        screen={{}} //
                        keyScreen="" //
                        style={{}} //
                    />
                </div>
            </div>
        </>
    )
}
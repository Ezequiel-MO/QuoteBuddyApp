import React, { FC } from "react"
import { ClientOptionsSelect } from "./ClientOptionsSelect"
import { IClient } from 'src/interfaces/'
import { RichTextEditor } from "src/components/molecules"


interface ClientOriginProps {
	data: IClient
	setData: React.Dispatch<React.SetStateAction<any>>
	update: boolean
}


export const ClientOrigin: FC<ClientOriginProps> = ({ data, setData, update }) => {

	const optionsOrigin = [
		{ value: "Recommendation", name: "Recommendation" },
		{ value: "ClientChangedCompany", name: "Client Changed Company" },
		{ value: "Tradeshow", name: "Tradeshow" },
		{ value: "ColdCall", name: "Cold Call" },
		{ value: "TourismPatronat", name: "Tourism Patronat" },
		{ value: "Other", name: "Other" }
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
		updateData.origin.textContent = text
		setData(updateData)
	}

	return (
		<>
			<ClientOptionsSelect
				options={optionsOrigin}
				titleLabel="origin"
				name="origin"
				handleChange={handleOptionsSelect}
				keyValue="method"
				value={data.origin?.method as string}
			/>
			<div className="mt-4">
				<label className="block uppercase text-lg text-gray-400 font-medium">
					description
				</label>
				<div className={`transition-all duration-700 ease-in-out overflow-hidden 
                    ${data.origin.method ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
					}`}>
					<RichTextEditor
						textContent={data.origin?.textContent}
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
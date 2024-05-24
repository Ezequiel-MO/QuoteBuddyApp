import React, { ChangeEvent, useState, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { MatchingCompanySelect } from "./MatchingCompanySelect"
import { ModalCompanyForm } from "./ModalCompanyForm"
import { Button } from "src/components/atoms/buttons/Button"
import { IClient } from "@interfaces/client"

interface SelectCompanyProps {
	data: IClient
	setData: React.Dispatch<React.SetStateAction<any>>
}

export const SelectCompany: FC<SelectCompanyProps> = ({
	data,
	setData
}) => {
	const location = useLocation()
	const pathnameClient = "/app/client/specs"

	const [openModal, setOpenModal] = useState(false)

	const handleClick = () => {
		setOpenModal(prev => !prev)
		location.state.company = {}
		// console.log(location.state, data)
	}

	if (pathnameClient !== location.pathname) {
		return null
	}


	return (
		<>
			<label className="block uppercase text-lg text-gray-400 font-medium mb-0.5 mt-3">
				{`Company (optional)`}
			</label>
			<div className="flex items-center gap-4">
				<MatchingCompanySelect data={data} setData={setData} />
				<>
					<ModalCompanyForm
						open={openModal}
						setOpen={setOpenModal}
						setData={setData}
					/>
					<Button
						newClass='flex items-center gap-1 flex-none py-1 px-4 rounded-md text-center cursor-pointer hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-0 fonrt-bold uppercase'
						handleClick={handleClick}
						type='button'
						icon='ic:outline-domain-add'
						widthIcon={40}
					>
						Add Company
					</Button>
				</>
			</div>
		</>
	)
}
import React, { ChangeEvent, useEffect, useState, FC } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { IAccManager } from 'src/interfaces/accManager'

interface SelectAccManagersProps {
	data: any
	setData: React.Dispatch<React.SetStateAction<any>>
}

export const SelectAccManagers: FC<SelectAccManagersProps> = ({
	data,
	setData
}) => {
	const { data: accManagersData } = useApiFetch('accManagers')
	const accManagers = accManagersData as IAccManager[]

	const [search, setSearch] = useState<string>('')

	const [selectKey, setSelectKey] = useState<number>(0)

	useEffect(() => {
		setSelectKey((prev) => prev + 1)
	}, [search])

	const filteredOptions = accManagers.filter(
		(el) =>
			el.familyName.toLowerCase().includes(search.toLowerCase()) ||
			el.firstName.toLowerCase().includes(search.toLowerCase()) ||
			el.email.toLowerCase().includes(search.toLowerCase())
	)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		if (value !== 'none' && value !== 'all') {
			setData((prevData: any) => ({
				...prevData,
				['accManagers']: [...data['accManagers'], value]
			}))
		}
		if (value === 'all') {
			const allAccManagers = accManagers.map(
				(el) => `${el._id} ${el.firstName} ${el.familyName}`
			)
			setData((prevData: any) => ({
				...prevData,
				['accManagers']: [...allAccManagers]
			}))
		}
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className="w-2/5
				px-2
				py-1
				text-base
				border 
				border-solid 
				bg-gray-700
				rounded
				focus:text-white-0 "
				type="text"
				placeholder="search..."
				value={search}
				onChange={handleSearch}
			/>

			<select
				name="accManagers"
				id="accManagers"
				key={selectKey}
				className="flex-1
				w-3/6
				py-1 
				px-2 
				border-0 
				rounded-md 
				bg-gray-700 
				text-center 
				cursor-pointer ml-2"
				// onChange={handleChangeSelect}
			>
				{!search && <option value="none">Select Acc.Manager/s</option>}
				{filteredOptions.length === 0 && (
					<option value="none">no Acc.Manger exists</option>
				)}
				{filteredOptions.map((el: IAccManager) => {
					return (
						<option
							key={el._id}
							value={`${el._id} ${el.firstName} ${el.familyName}`}
							onClick={(e: any) => handleChangeSelect(e)}
							disabled={data.accManagers.includes(
								`${el._id} ${el.firstName} ${el.familyName}`
							)}
						>
							{`${el.firstName}  ${el.familyName}`}
						</option>
					)
				})}
				{!search && (
					<option
						className="uppercase"
						value="all"
						onClick={(e: any) => handleChangeSelect(e)}
					>
						all Acc.Managers
					</option>
				)}
			</select>
		</div>
	)
}

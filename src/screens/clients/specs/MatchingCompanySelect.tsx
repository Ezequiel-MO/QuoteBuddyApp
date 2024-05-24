import React, { ChangeEvent, useEffect, useState, FC } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { IClientCompany } from 'src/interfaces/clientCompany'
import { IClient } from 'src/interfaces/client'

interface MatchingCompanySelectProps {
	data: IClient
	setData: React.Dispatch<React.SetStateAction<any>>
}

export const MatchingCompanySelect: FC<MatchingCompanySelectProps> = ({
	data,
	setData
}) => {
	const [forceRefresh , setForceRefresh] = useState(0)
	const { data: accManagersData , isLoading } = useApiFetch('client_companies' ,forceRefresh)
	const accManagers = accManagersData as IClientCompany[]
	const refresh = ()=>{
		setForceRefresh(prev => prev + 1)
	}
	useEffect(()=>{
		refresh()
	},[data.clientCompany])

	const [search, setSearch] = useState<string>('')

	const [selectKey, setSelectKey] = useState<number>(0)

	useEffect(() => {
		setSelectKey((prev) => prev + 1)
	}, [search, accManagers])

	const filteredOptions = accManagers.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()))

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setData((prev: any) => ({
			...prev,
			clientCompany: value
		}))
	}

	if(isLoading){
		return null
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
				name="clientCompany"
				id="clientCompany"
				key={selectKey}
				value={data.clientCompany}
				className="flex-1
				w-3/6
				py-1 
				px-2 
				border-0 
				rounded-md 
				bg-gray-700 
				text-center 
				text-white-0
				cursor-pointer ml-2"
				onChange={handleChangeSelect}
			>
				{
					!search ?
						<option value="none">Select Company</option>
						:
						<option value="none">
							{filteredOptions.length > 0 ?
								`Search Result:${filteredOptions.length}`
								: "no company exists"}
						</option>
				}
				{filteredOptions.map((el) => {
					return (
						<option
							key={el._id}
							value={el.name}
						>
							{el.name}
						</option>
					)
				})}
			</select>
		</div>
	)
}
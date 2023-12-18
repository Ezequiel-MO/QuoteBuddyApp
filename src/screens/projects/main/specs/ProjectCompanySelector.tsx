import { FC, ChangeEvent, useState, useEffect } from 'react'
import { IClientCompany } from 'src/interfaces'
import { useApiFetch } from 'src/hooks/fetchData'

interface ProjectCompanySelectorProps {
	clientCompany: string
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	setData: React.Dispatch<React.SetStateAction<any>>
}

export const ProjectCompanySelector: FC<ProjectCompanySelectorProps> = ({
	clientCompany,
	handleChange,
	errors,
	handleBlur,
	setData
}) => {
	const { data: companiesData } =
		useApiFetch<IClientCompany[]>('client_companies')
	const companies = companiesData as unknown as IClientCompany[]

	const [search, setSearch] = useState<string>('')

	const filteredOptions: IClientCompany[] = companies
		.filter((el: IClientCompany) =>
			el.name.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a: IClientCompany, b: IClientCompany) => {
			if (a.name < b.name) return -1
			if (a.name > b.name) return 1
			return 0
		})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	useEffect(() => {
		if (search) {
			setData((prevData: any) => ({
				...prevData,
				clientCompany: filteredOptions.length > 0 ? filteredOptions[0]._id : ''
			}))
		}
		if (!search && !clientCompany) {
			setData((prevData: any) => ({
				...prevData,
				clientCompany: ''
			}))
		}
	}, [search])

	return (
		<div>
			<label className="block uppercase text-lg text-gray-400 font-medium mb-2">
				Company
			</label>
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
					value={clientCompany}
					className="flex-1
				w-3/6
				py-1 
				px-2 
				border-0 
				rounded-md 
				bg-gray-700 
				text-center 
				cursor-pointer ml-2"
					onChange={handleChange}
					onBlur={handleBlur}
				>
					{!search && <option value="">Select a company</option>}
					{filteredOptions.length === 0 && (
						<option value="">no company exists</option>
					)}
					{filteredOptions.map((el) => {
						return (
							<option value={el._id} key={el._id}>
								{el.name}
							</option>
						)
					})}
				</select>
				{errors.clientCompany && !clientCompany && (
					<p className="mt-1 text-red-500" style={{ marginLeft: '65%' }}>
						{errors.clientCompany}
					</p>
				)}
			</div>
		</div>
	)
}

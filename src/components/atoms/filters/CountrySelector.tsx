import { FC } from 'react'
import { ICountry } from 'src/interfaces/'

interface ClientCountrySelectorProps {
	options: ICountry[]
	country: string
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
}

export const CountrySelector: FC<ClientCountrySelectorProps> = ({
	country,
	options,
	errors,
	handleChange,
	handleBlur
}) => {
	return (
		<div className="my-2">
			<label className="uppercase text-xl text-gray-600 font-bold mr-2">
				Country
			</label>
			<select
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
				name="country"
				value={country}
				onChange={handleChange}
				onBlur={handleBlur}
			>
				<option value="">-- Select a Country --</option>
				{options?.map((el) => {
					return (
						<option value={el.accessCode} key={el._id}>
							{el.name}
						</option>
					)
				})}
			</select>
			{errors.country && <p className="mt-1 text-red-500">{errors.country}</p>}
		</div>
	)
}

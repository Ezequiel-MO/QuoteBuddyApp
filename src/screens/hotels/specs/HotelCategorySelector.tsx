import { FC } from 'react'

interface HotelCategorySelectorProps {
	options: number[]
	numberStars: number
	errors: { [key: string]: string | undefined }
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleBlur: (
		event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => void
}

export const HotelCategorySelector: FC<HotelCategorySelectorProps> = ({
	options,
	numberStars,
	handleChange,
	errors,
	handleBlur
}) => {
	return (
		<div>
			<label className="uppercase text-xl text-gray-600 font-bold">
				Category
			</label>
			<select
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none text-white-0"
				name="numberStars"
				value={numberStars}
				onChange={handleChange}
				onBlur={handleBlur}
			>
				<option value="">-- Choose an option --</option>
				{options?.map((el, index) => {
					return (
						<option value={el} key={index}>
							{el}-Star
						</option>
					)
				})}
			</select>
			{errors.numberStars && (
				<p className="mt-1 text-red-500">{errors.numberStars}</p>
			)}
		</div>
	)
}

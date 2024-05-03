import { editableDivClass, readOnlyDivClass } from '../styles'

export const ShippingDataField = ({
	label,
	name,
	value,
	handleChange,
	isEditable
}) => {
	return (
		<div className={isEditable ? editableDivClass : readOnlyDivClass}>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				{label}:
			</div>
			{isEditable ? (
				<input
					type={`${name === 'date' ? 'date' : 'text'}`}
					name={name}
					value={value}
					className="ml-2 font-normal text-gray-700 cursor-pointer w-full rounded-md border border-gray-300 px-2"
					onChange={handleChange}
				/>
			) : (
				<p
					className={
						isEditable
							? 'ml-2  text-gray-700'
							: 'ml-2 text-lg text-right text-black-0'
					}
				>
					{value}
				</p>
			)}
		</div>
	)
}

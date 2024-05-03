import { IInvoice } from '@interfaces/invoice'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { useInvoice } from '../context/InvoiceContext'

interface Props {
	label: string
	name: keyof IInvoice
	value: string
	isEditable: boolean
}

export const ShippingDataField = ({
	label,
	name,
	value,
	isEditable
}: Props) => {
	const { handleChange } = useInvoice()
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

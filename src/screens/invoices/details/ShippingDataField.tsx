import { IInvoice } from '@interfaces/invoice'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { useInvoice } from '../context/InvoiceContext'

interface Props {
	label: string
	name: keyof IInvoice
	value: string | undefined
}

export const ShippingDataField = ({ label, name, value }: Props) => {
	const { state, handleChange } = useInvoice()

	const isEditable = state.currentInvoice?.status === 'posting'
	return (
		<div
			className={isEditable ? editableDivClass : 'flex flex-row items-center'}
		>
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
				<p className="ml-2 flex-1 text-right text-lg text-black-0">{value}</p>
			)}
		</div>
	)
}

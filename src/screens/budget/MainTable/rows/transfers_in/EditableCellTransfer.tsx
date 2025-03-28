import { FC } from 'react'
import accounting from 'accounting'
import { Icon } from '@iconify/react'
import { useEditableCell } from '../../../hooks/useEditableCell'

interface EditableCellTransferProps {
	value: number
	onSave: (newValue: number) => void
	typeValue: 'unit' | 'price'
	originalValue: number
}

export const EditableCellTransfer: FC<EditableCellTransferProps> = ({
	value,
	onSave,
	typeValue,
	originalValue
}) => {
	const {
		isEditing,
		localValue,
		inputRef,
		isModified,
		isEditable,
		handleBlur,
		handleChange,
		handleKeyDown,
		handleClick
	} = useEditableCell({
		value,
		originalValue,
		onSave,
		typeValue
	})

	const isValueModified = originalValue && originalValue !== value

	return (
		<abbr
			title={`${
				isValueModified ? 'Modified' : isEditable ? 'Edit value' : 'Read-only'
			}`}
			className="no-underline"
		>
			<div
				onClick={handleClick}
				className={`
                relative ${
									isEditable ? 'cursor-text' : 'cursor-default'
								} min-w-[80px] px-2 py-1 ${
					!isEditing && isEditable
						? 'hover:border-blue-300/70 rounded-md hover:border hover:bg-gray-700/30'
						: ''
				} 
                ${isValueModified ? 'bg-cyan-800/40 rounded-md' : ''}
                `}
			>
				{isEditing && isEditable ? (
					<input
						ref={inputRef}
						type="number"
						value={localValue}
						onChange={handleChange}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						className="w-full bg-gray-700/70 text-gray-100 border border-blue-400/80 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
					/>
				) : (
					<div className="flex items-center">
						{isEditable && (
							<Icon
								icon="line-md:pencil-twotone"
								className={`absolute right-1 top-1 text-blue-300 ${
									isValueModified
										? 'opacity-80'
										: 'opacity-0 group-hover:opacity-40'
								} `}
							/>
						)}
						<span className="text-gray-100">
							{typeValue === 'price'
								? accounting.formatMoney(value, '€')
								: value}
						</span>
					</div>
				)}
			</div>
		</abbr>
	)
}

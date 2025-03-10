import React, { FC } from 'react'
import { Button } from '@components/atoms'
import { usePayment } from '../../context/PaymentsProvider'

interface ViewNoteProps {
	isEdit: boolean
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const ViewNote: FC<ViewNoteProps> = ({ isEdit, setIsEdit }) => {
	const { state, dispatch } = usePayment()

	return (
		<div className={`${!isEdit ? '' : 'hidden'}`}>
			<div
				// className="text-gray-800"
				dangerouslySetInnerHTML={{
					__html: state.currentVendorInvoice?.note ?? ''
				}}
			></div>
			<div className="mt-4 flex justify-end">
				<Button
					icon="lucide:edit"
					type='button'
					widthIcon={20}
					handleClick={() => setIsEdit((prev) => !prev)}
				>
					Edit Note
				</Button>
			</div>
		</div>
	)
}

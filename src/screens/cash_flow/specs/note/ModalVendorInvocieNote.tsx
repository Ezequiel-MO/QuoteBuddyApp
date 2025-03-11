import React, { FC, useState, useEffect } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms'
import { Button } from '@components/atoms'
import { usePayment } from '../../context/PaymentsProvider'
import { ViewNote } from './ViewNote'
import TextEditor from '@components/molecules/TextEditor'
import { updateVendorInvoice } from '../updateVendorInvoice'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { IVendorInvoice } from '@interfaces/vendorInvoice'

interface ModalVendorInvocieNoteProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	forceRefresh?: () => void
}

const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '45%',
	maxHeight: '90vh',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	overflow: 'auto',
	padding: 5
}

export const ModalVendorInvocieNote: FC<ModalVendorInvocieNoteProps> = ({
	open,
	setOpen,
	forceRefresh
}) => {
	const { state, dispatch } = usePayment()

	const [isEdit, setIsEdit] = useState(true)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (state.currentVendorInvoice?.note) {
			setIsEdit(false)
		} else {
			setIsEdit(true)
		}
	}, [state.update, state.currentVendorInvoice?._id])

	const handleTextContentChange = (text: string) => {
		dispatch({
			type: 'UPDATE_VENDORINVOICE_FIELD',
			payload: { name: 'note', value: text }
		})
	}

	useEffect(() => {
		console.log(state.currentVendorInvoice?.note)
	}, [state.currentVendorInvoice?.note])

	const handleModalClose = () => {
		setOpen(false)
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		forceRefresh && forceRefresh()
	}

	const handleSubmit = async () => {
		if (!state.currentVendorInvoice) return
		const loadingToast = toast.loading('please wait')
		setLoading(true)
		try {
			await updateVendorInvoice(
				state.currentVendorInvoice,
				state.vendorInvoices || [],
				dispatch
			)
			setTimeout(() => {
				setIsEdit(false)
			}, 500)
		} catch (error: any) {
			console.log(error)
		} finally {
			toast.dismiss(loadingToast)
			setLoading(false)
		}
	}

	return (
		<div role="menuitem">
			<ModalComponent open={open} setOpen={() => handleModalClose()} styleModal={styleModal}>
				<ModalCancelButton handleClose={() => handleModalClose()} />
				<div className="border border-gray-500 bg-yellow-100 p-4 rounded-lg shadow-md shadow-black-50 min-h-52">
					<ViewNote isEdit={isEdit} setIsEdit={setIsEdit} />
					<div className={`${isEdit ? '' : 'hidden'}`}>
						<TextEditor
							value={state.currentVendorInvoice?.note ?? ''}
							onChange={(e) => handleTextContentChange(e)}
						/>
						<div className="mt-4 flex justify-end">
							<Button
								icon={!loading ? 'lucide:edit' : 'line-md:loading-twotone-loop'}
								type="button"
								widthIcon={20}
								handleClick={() => {
									handleSubmit()
								}}
								disabled={loading}
							>
								{!loading ? 'Update Note' : 'please wait'}
							</Button>
						</div>
					</div>
				</div>
			</ModalComponent>
		</div>
	)
}

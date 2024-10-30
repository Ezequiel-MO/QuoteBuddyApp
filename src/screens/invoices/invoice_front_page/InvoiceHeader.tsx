import React from 'react'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { useOnErrorFormSubmit, useOnSuccessFormSubmit } from '../../../hooks'
import './invoice.css'
import {
	InvoicePostingButton,
	LinesBreakdownCheckBox,
	RenderLogo,
	usePostInvoice,
	VATCheckbox
} from '.'
import { useInvoice } from '../context/InvoiceContext'
import { useProjectIdFromInvoiceCode } from './useProjectIdFromInvoiceCode'

export const InvoiceHeader: React.FC = () => {
	const { state } = useInvoice()
	const { projectId } = useProjectIdFromInvoiceCode()
	const { onError } = useOnErrorFormSubmit('Invoice')
	const { onSuccess } = useOnSuccessFormSubmit('Invoice', 'invoice', false)

	if (!state.currentInvoice) {
		return <div>No invoice loaded</div>
	}

	const { isLoading, handlePostInvoice } = usePostInvoice({
		onSuccess,
		onError,
		currentInvoice: state.currentInvoice,
		projectId
	})

	return (
		<div className="border-b-[13px] border-b-white-50 h-[112px] mx-1 flex justify-between">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<RenderLogo />
					<div className="flex items-center">
						<LinesBreakdownCheckBox />
						<VATCheckbox />
						<InvoicePostingButton handlePostInvoice={handlePostInvoice} />
					</div>
				</>
			)}
		</div>
	)
}

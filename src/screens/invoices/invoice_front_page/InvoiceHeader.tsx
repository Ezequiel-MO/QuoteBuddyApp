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
import { IInvoice } from '@interfaces/invoice'

export const InvoiceHeader: React.FC = () => {
	const { state } = useInvoice()
	const { projectId } = useProjectIdFromInvoiceCode()
	const { onError } = useOnErrorFormSubmit('Invoice')
	const { onSuccess } = useOnSuccessFormSubmit('Invoice', '', false)

	const { isLoading, handlePostInvoice } = usePostInvoice({
		onSuccess,
		onError,
		currentInvoice: state.currentInvoice as IInvoice,
		projectId
	})

	if (!state.currentInvoice) {
		return <div>No invoice loaded</div>
	}

	return (
		<div className="bg-white-200 bg-white-50 h-[112px] flex justify-between">
			{isLoading ? (
				<Spinner />
			) : (
				<div className="flex items-center w-full justify-between px-4">
					<RenderLogo />
					<div className="flex items-center">
						<LinesBreakdownCheckBox />
						<VATCheckbox />
						<InvoicePostingButton handlePostInvoice={handlePostInvoice} />
					</div>
				</div>
			)}
		</div>
	)
}

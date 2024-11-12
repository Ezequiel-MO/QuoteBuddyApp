import React from 'react'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit
} from '../../../hooks'
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
	const { onSuccess } = useOnSuccessFormSubmit('Invoice', '', false)

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
		<div className="bg-white-200 bg-white-50 h-[112px] flex justify-between">
			{isLoading ? (
				<Spinner />
			) : (
				<div className="flex items-center w-full justify-around">
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

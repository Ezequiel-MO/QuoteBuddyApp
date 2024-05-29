import React, { useEffect, useState } from 'react'
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

export const InvoiceHeader: React.FC = () => {
	const { state, projects } = useInvoice()
	const [projectId, setProjectId] = useState<string>('')
	const { onError } = useOnErrorFormSubmit('Invoice')
	const { onSuccess } = useOnSuccessFormSubmit('Invoice', 'invoice', false)

	if (!state.currentInvoice) {
		return <div>No invoice loaded</div>
	}

	useEffect(() => {
		if (state.currentInvoice?.projectCode) {
			const project = projects.find(
				(project) => project.code === state.currentInvoice?.projectCode
			)
			if (project) {
				setProjectId(project?._id || '')
			}
		}
	}, [state.currentInvoice?.projectCode])

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

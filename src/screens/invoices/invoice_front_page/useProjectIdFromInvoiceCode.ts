import { useMemo } from 'react'
import { useInvoice } from '../context/InvoiceContext'

export const useProjectIdFromInvoiceCode = () => {
	const { state, projects } = useInvoice()

	const projectId = useMemo(() => {
		const projectCode = state.currentInvoice?.projectCode
		if (projectCode) {
			const project = projects.find((project) => project.code === projectCode)
			return project?._id || ''
		}
		return ''
	}, [state.currentInvoice?.projectCode, projects])

	return { projectId }
}

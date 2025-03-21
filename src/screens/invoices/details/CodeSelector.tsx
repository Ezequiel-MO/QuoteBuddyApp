import { FC, useState, useEffect } from 'react'
import { ModalComponent } from '../../../components/atoms'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { AddProjectFromInvoice } from '../add'
import { useInvoice } from '../context/InvoiceContext'

interface CodeSelectorProps {
	selectedCode: string
}

export const CodeSelector: FC<CodeSelectorProps> = ({ selectedCode }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [localCode, setLocalCode] = useState('')
	const { state, dispatch, handleChange, projects, areProjectsLoading } =
		useInvoice()

	const { currentInvoice } = state

	const isEditable = currentInvoice?.status === 'posting'

	const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleChange(e)
		setLocalCode(e.target.value)
	}

	useEffect(() => {
		if (localCode) {
			const project = projects.find((project) => project.code === localCode)
			const clientCompany = project?.clientCompany[0]
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'company', value: clientCompany?.name }
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'address', value: clientCompany?.address }
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'postCode', value: clientCompany?.postCode }
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'VATNr', value: clientCompany?.VATNr }
			})
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'projectCode', value: localCode }
			})
		}
	}, [localCode])

	if (areProjectsLoading) {
		return (
			<p className="text-center text-xl text-orange-500">
				Loading project codes...
			</p>
		)
	}

	return (
		<div
			className={isEditable ? editableDivClass : 'flex flex-row items-center'}
		>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				PROJECT CODE:
			</div>
			{isEditable ? (
				<>
					<select
						name="projectCode"
						className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
						disabled={areProjectsLoading || !projects.length}
						onChange={handleCodeChange}
						value={localCode || selectedCode}
					>
						<option value="">Select a project code</option>
						{projects.map((project, index) => (
							<option key={index} value={project.code}>
								{project.code}
							</option>
						))}
					</select>
					<div className="mt-1 font-bold text-lg flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
						<button
							className="ml-2 bg-gray-100 hover:bg-gray-400 text-lg font-medium rounded-md border border-gray-300 p-1 cursor-pointer"
							disabled={areProjectsLoading}
							onClick={() => setIsModalOpen((prev) => !prev)}
						>
							ADD PROJECT
						</button>
						<ModalComponent open={isModalOpen} setOpen={setIsModalOpen}>
							<AddProjectFromInvoice
								setOpen={() => {
									setIsModalOpen((prev) => !prev)
								}}
							/>
						</ModalComponent>
					</div>
				</>
			) : (
				<p className="ml-2 flex-1 text-right text-lg text-black-0">
					{selectedCode ?? ''}
				</p>
			)}
		</div>
	)
}

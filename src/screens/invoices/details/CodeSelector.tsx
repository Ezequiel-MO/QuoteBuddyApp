import { ChangeEvent, FC, useState, useEffect } from 'react'
import { ModalComponent } from '../../../components/atoms'
import { useGetProjects, useFilterList } from '../../../hooks'
import { IProject } from '../../../interfaces'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { AddCodeToInvoice } from '../add'

interface CodeSelectorProps {
	isEditable: boolean
	selectedCode: string
	handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const CodeSelector: FC<CodeSelectorProps> = ({
	isEditable,
	selectedCode,
	handleChange
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { isLoading, projects, refreshProjects } = useGetProjects()

	const handleAddProject = () => {
		refreshProjects()
		setIsModalOpen((prev) => !prev)
	}

	const filterFunction = (project: IProject, term: string) =>
		project.code.toLowerCase().includes(term.toLowerCase())

	const {
		filteredData: filteredProjects,
		searchTerm,
		filterList,
		setData
	} = useFilterList(projects, filterFunction)

	useEffect(() => {
		setData(projects)
	}, [projects, setData])

	return (
		<div className={isEditable ? editableDivClass : readOnlyDivClass}>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				PROJECT CODE:
			</div>
			{isEditable ? (
				<>
					<input
						type="text"
						value={searchTerm}
						onChange={filterList}
						placeholder="Search project code..."
						className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
					/>
					<select
						name="projectCode"
						className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
						disabled={isLoading || !filteredProjects.length}
						onChange={handleChange}
					>
						<option value="">Select a project code</option>
						{filteredProjects.map((project, index) => (
							<option key={index} value={project.code}>
								{project.code}
							</option>
						))}
					</select>
					<div className="mt-1 font-bold text-lg flex justify-between items-center bg-gray-200 px-4 py-2 rounded-md">
						<button
							className="ml-2 bg-gray-100 hover:bg-gray-400 text-lg font-medium rounded-md border border-gray-300 p-1 cursor-pointer"
							disabled={isLoading}
							onClick={() => setIsModalOpen((prev) => !prev)}
						>
							ADD PROJECT
						</button>
						<ModalComponent open={isModalOpen} setOpen={setIsModalOpen}>
							<AddCodeToInvoice setOpen={handleAddProject} />
						</ModalComponent>
					</div>
				</>
			) : (
				<p className="ml-2 font-normal">{selectedCode}</p>
			)}
		</div>
	)
}

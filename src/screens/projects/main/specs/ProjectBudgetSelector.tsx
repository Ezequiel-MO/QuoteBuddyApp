import { FC, useEffect, RefObject } from 'react'
import { ShowImagesButton } from '../../../../components/atoms'
import { IProject } from 'src/interfaces'

interface IBudget {
	name: string
	value: string
}

interface ProjectBudgetSelectorProps {
	options: IBudget[]
	budget: string
	handleChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	fileInput: RefObject<HTMLInputElement>
	project: IProject
	openModal: boolean
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProjectBudgetSelector: FC<ProjectBudgetSelectorProps> = ({
	options,
	budget,
	handleChange,
	open,
	setOpen,
	fileInput,
	project,
	openModal,
	setOpenModal
}) => {
	useEffect(() => {
		if (budget === 'budgetAsPdf') {
			setOpen(true)
		} else {
			setOpen(false)
		}
	}, [budget, setOpen])

	return (
		<div className="mb-4">
			<label className="block uppercase text-xl text-gray-600 font-bold mb-2">
				Budget
			</label>
			<select
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
				name="budget"
				value={budget}
				onChange={handleChange}
			>
				<option value="">-- Choose an option --</option>
				{options.map((el, index) => (
					<option value={el.value} key={index}>
						{el.name}
					</option>
				))}
			</select>
			{open && (
				<div className="mt-4">
					{!project?.imageContentUrl?.length ||
					project?.imageContentUrl?.length === 0 ? (
						<input
							id="file-upload"
							type="file"
							ref={fileInput}
							name="imageContentUrl"
							multiple={false}
							title="Select a PDF file"
							accept=".pdf"
							className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
						/>
					) : (
						<div className="mt-4">
							<ShowImagesButton
								name={true}
								setOpen={setOpenModal}
								nameValue={'SHOW PDF'}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

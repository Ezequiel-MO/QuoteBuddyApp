import { useCurrentProject } from '../../../../hooks'
import { IClientCompany, IProject } from '../../../../interfaces'
import { HeaderCell } from '@components/atoms/HeaderCell'

export const BudgetTableHead: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientCompany } = currentProject as {
		clientCompany: IClientCompany[]
	}
	const { colorPalette = [] } = (clientCompany && clientCompany[0]) || {}

	const textColorClass =
		colorPalette?.length > 0 ? `text-[${colorPalette[0]}]` : 'text-secondary'
	const backgroundColorClass =
		colorPalette?.length > 1
			? `dark:!bg-[${colorPalette[1]}]`
			: 'dark:!bg-brown-100'

	return (
		<>
			<tr className="bg-cyan-800 border-b border-gray-700 text-white-0">
				<HeaderCell
					width="10%"
					className={`${backgroundColorClass} text-left  `}
				/>
				<HeaderCell
					width="20%"
					className={`${backgroundColorClass} ${textColorClass} text-left `}
				>
					{'Event Type'}
				</HeaderCell>
				<HeaderCell
					width="35%"
					className={`${backgroundColorClass} ${textColorClass} text-left `}
				>
					{'Service'}
				</HeaderCell>
				<HeaderCell
					width="5%"
					className={`${backgroundColorClass} ${textColorClass} text-left `}
				>
					{'Pax/units'}
				</HeaderCell>
				<HeaderCell
					width="15%"
					className={`${backgroundColorClass} ${textColorClass} text-left `}
				>
					{'Unit cost w/VAT'}
				</HeaderCell>
				<HeaderCell
					width="15%"
					className={`${backgroundColorClass} ${textColorClass} text-left `}
				>
					{'Total cost w/VAT'}
				</HeaderCell>
			</tr>
		</>
	)
}

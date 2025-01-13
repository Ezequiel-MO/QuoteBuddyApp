import { tableCellClasses } from 'src/constants/listStyles'

interface HeaderCellProps {
	width: string
	className?: string
	children?: React.ReactNode
}

export const HeaderCell = ({ width, children, className }: HeaderCellProps) => (
	<th
		style={{ width }}
		className={`${tableCellClasses} text-white-100 font-bold uppercase tracking-wide border-b border-gray-700 ${
			className || ''
		}`}
	>
		{children}
	</th>
)

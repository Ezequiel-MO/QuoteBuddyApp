import { useState, useEffect } from 'react'
import { useCurrentInvoice } from '../../../../hooks'
import { BreakdownLine } from './BreakdownLine'

export const BreakdownLines = () => {
	const { currentInvoice } = useCurrentInvoice()
	const { breakdownLines } = currentInvoice
	const [foundLines, setFoundLines] = useState([])

	useEffect(() => {
		setFoundLines(breakdownLines)
	}, [breakdownLines])

	return (
		<>
			{foundLines?.slice(1).map((line) => (
				<div key={line.id} className="h-auto">
					<BreakdownLine line={line} />
				</div>
			))}
		</>
	)
}

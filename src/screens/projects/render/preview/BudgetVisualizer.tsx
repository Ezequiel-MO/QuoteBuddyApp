import React, { useState, useRef } from 'react'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'
import { useProject } from '@screens/projects/context/ProjectContext'
import { Button } from '@components/atoms'
import { usePartialCostsData } from '@screens/budget/partial-costs/usePartialCostsData'
import accounting from 'accounting'

function BudgetVisualizer() {
	const { state, dispatch } = useProject()
	const { totalCostOfItems } = usePartialCostsData()
	const [width, setWidth] = useState('85%')
	const resizerRef = useRef<HTMLDivElement>(null)

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()

		const startX = e.clientX
		const startWidth = resizerRef.current?.parentElement?.offsetWidth || 0

		const handleMouseMove = (e: MouseEvent) => {
			const newWidth = startWidth - (e.clientX - startX)
			setWidth(`${(newWidth / window.innerWidth) * 100}%`)
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<div
			className={`flex flex-col items-start justify-start fixed right-0 top-0 h-full bg-gradient-to-br from-gray-800 to-gray-700 border-l shadow-lg transition-transform duration-300 ${
				state.isBudgetVisualizerOpen ? 'translate-x-0' : 'translate-x-full'
			} z-50`}
			style={{ width }}
			role="dialog"
			aria-hidden={!state.isBudgetVisualizerOpen}
		>
			{/* Resizer */}
			<div
				className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-blue-500 hover:bg-blue-400 transition-all"
				onMouseDown={handleMouseDown}
				ref={resizerRef}
				aria-label="Resize Budget Visualizer"
			/>

			{/* Header */}
			<div className="mx-2 p-4 bg-gray-900 text-white-0 flex justify-between items-center shadow-md">
				<h1 className="text-xl font-semibold mr-2">Budget Visualizer</h1>
				<Button
					icon="mdi:close"
					widthIcon={24}
					handleClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
					type="button"
					newClass="flex items-center uppercase px-3 py-1 text-white-0 bg-red-600 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-700 active:scale-95"
				>
					Hide
				</Button>
			</div>

			{/* Summary Bar */}
			<div className="bg-gray-800 text-white-0 p-3 border-t border-gray-700">
				<div className="flex justify-between items-center">
					<span className="font-medium mr-2">Total Budget:</span>
					<span className="font-bold text-green-400">
						{accounting.formatMoney(totalCostOfItems, '€')}
					</span>
				</div>
			</div>

			{/* Main Content */}
			<div className="p-4 h-full overflow-y-auto hide-scrollbar">
				{/* Center the BudgetTable */}
				<div className="flex justify-center items-start w-full">
					<div className="rounded-lg shadow-lg p-4 bg-cyan-800">
						<BudgetTable />
					</div>
				</div>
			</div>
		</div>
	)
}

export default BudgetVisualizer

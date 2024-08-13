import React, { useState, useRef } from 'react'
import { Budget } from '@screens/budget/MainTable/higherComponents'
import { useProject } from '@screens/projects/context/ProjectContext'
import { Button } from '@components/atoms'

function BudgetVisualizer() {
	const { state, dispatch } = useProject()
	const [width, setWidth] = useState('75%') // Initial width as 3/4
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
			className={`flex flex-col items-left justify-start fixed right-0 top-0 h-full bg-gray-800 border-l shadow-lg transition-transform duration-300 ${
				state.isBudgetVisualizerOpen ? 'translate-x-0' : 'translate-x-full'
			} z-50`}
			style={{ width }}
		>
			<div
				className="absolute left-0 top-0 h-full w-1 cursor-ew-resize"
				onMouseDown={handleMouseDown}
				ref={resizerRef}
			/>
			<Button
				icon="mdi:hide"
				widthIcon={24}
				handleClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
				type="button"
				newClass="flex items-center uppercase px-3 py-1 text-white bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95"
			>
				Hide
			</Button>
			<div className="p-4 h-full overflow-y-auto hide-scrollbar">
				<h1 className="text-2xl font-bold text-white-0">Budget Visualizer</h1>
				<div className="mt-4 opacity-95">
					<Budget />
				</div>
			</div>
		</div>
	)
}

export default BudgetVisualizer

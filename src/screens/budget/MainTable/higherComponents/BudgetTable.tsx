import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../rows/hotel'
import { TotalBudgetCost } from '../../totals'
import { IDay } from '../../../../interfaces'
import { useCurrentProject } from '../../../../hooks'
import { OvernightRows } from '../rows/hotel/OvernightRows'
import { Button } from 'src/components/atoms/buttons/Button'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { GiftSection } from '../rows/gift/GiftSection'

export const BudgetTable = () => {
	const [isSaving, setIsSaving] = useState(false)
	const location = useLocation()

	const { currentProject, setCurrentProject } = useCurrentProject()
	const { multiDestination, hotels, schedule, gifts, nrPax } = currentProject

	const handleSave = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		setIsSaving(true)
		try {
			const data = { hotels, schedule, gifts }
			const res = await baseAPI.patch(`projects/${currentProject._id}`, data)
			setCurrentProject(res.data.data.data)
			toast.success('budget saved', toastOptions)
		} catch (error: any) {
			console.log(error)
			toast.error(error.message || 'An error occurred', errorToastOptions)
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div
			id="budget_id"
			className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg"
		>
			{location.pathname !== '/client' && (
				<div className="mb-6 mt-5 flex justify-end">
					<Button
						icon=""
						disabled={isSaving}
						handleClick={handleSave}
						aria-label="Save Budget"
						newClass="bg-blue-600 hover:bg-blue-500 text-white-0 font-semibold px-4 py-2 rounded-md shadow transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
					>
						{isSaving ? 'Saving Budget...' : 'Save Budget'}
					</Button>
				</div>
			)}
			<div className="overflow-x-auto">
				<table className="w-full table-auto text-sm border-collapse bg-white dark:bg-gray-700 rounded-lg shadow-md">
					<thead className="bg-gray-200 dark:bg-gray-600 sticky top-0 z-10">
						<BudgetTableHead />
					</thead>
					<tbody className="divide-y divide-gray-300 dark:divide-gray-600">
						{!multiDestination && <HotelRows />}
						{schedule?.map((day: IDay, index: number) => (
							<React.Fragment key={`${day._id}-${index}`}>
								<DayRows
									day={day}
									pax={nrPax}
									isFirstDay={index === 0}
									isLastDay={index === schedule.length - 1}
									multiDestination={multiDestination}
								/>
								{multiDestination && (
									<OvernightRows
										date={day.date}
										hotels={day.overnight?.hotels}
									/>
								)}
							</React.Fragment>
						))}
						<GiftSection />
						<TotalBudgetCost />
					</tbody>
				</table>
			</div>
		</div>
	)
}

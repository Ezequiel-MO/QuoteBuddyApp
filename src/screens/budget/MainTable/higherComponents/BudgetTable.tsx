import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../rows/hotel'
import { TotalBudgetCost } from '../../totals'
import { IDay } from '../../../../interfaces'
import { useCurrentProject } from '../../../../hooks'
import { OvernightRows } from '../rows/hotel/OvernightRows'
import { BudgetActions, BudgetState } from '../../context/interfaces'
import { Button } from 'src/components/atoms/buttons/Button'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { GiftSection } from '../rows/gift/GiftSection'

interface Props {
	state: BudgetState
	dispatch: React.Dispatch<BudgetActions>
}

export const BudgetTable = ({ state, dispatch }: Props) => {
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
		<div id="budget_id">
			{location.pathname !== '/client' && (
				<div className="ml-3 mb-6 mt-5">
					<Button
						icon=""
						disabled={isSaving}
						handleClick={handleSave}
						aria-label="Save Budget"
					>
						{isSaving ? 'Saving Budget...' : 'Save Budget'}
					</Button>
				</div>
			)}

			<table className="min-w-full divide-y divide-gray-300 dark:divide-black-50 dark:bg-gray-300 text-sm">
				<BudgetTableHead />

				<tbody className="divide-y divide-gray-300">
					{!multiDestination && <HotelRows />}
					{schedule?.map((day: IDay, index: number) => (
						<React.Fragment key={day._id}>
							<DayRows
								day={day}
								pax={nrPax}
								isFirstDay={index === 0}
								isLastDay={index === schedule.length - 1}
								multiDestination={multiDestination}
							/>
							{multiDestination && (
								<OvernightRows date={day.date} hotels={day.overnight?.hotels} />
							)}
						</React.Fragment>
					))}
					<GiftSection />
					<TotalBudgetCost />
				</tbody>
			</table>
		</div>
	)
}

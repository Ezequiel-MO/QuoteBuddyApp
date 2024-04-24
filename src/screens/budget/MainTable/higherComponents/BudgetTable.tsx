import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BudgetTableHead, DayRows } from '.'
import { HotelRows } from '../rows/hotel'
import { TotalBudgetCost } from '../../totals'
import { IDay } from '../../../../interfaces'
import {
	UPDATE_TRANSFERS_IN_COST,
	UPDATE_TRANSFERS_OUT_COST
} from '../../context/budgetReducer'
import { useCurrentProject } from '../../../../hooks'
import { OvernightRows } from '../rows/hotel/OvernightRows'
import { BudgetActions, BudgetState } from '../../context/interfaces'
import { Button } from 'src/components/atoms/buttons/Button'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { GiftSection } from "../rows/gift/GiftSection"

interface Props {
	state: BudgetState
	dispatch: React.Dispatch<BudgetActions>
}

export const BudgetTable = ({ state, dispatch }: Props) => {
	const navigate = useNavigate()
	const location = useLocation()

	const { currentProject, setCurrentProject } = useCurrentProject()
	const { multiDestination, hotels } = currentProject

	const { schedule, gifts } = state

	useEffect(() => {
		if (currentProject.schedule && currentProject.schedule.length > 0) {
			dispatch({
				type: UPDATE_TRANSFERS_IN_COST,
				payload: { transfer_in: currentProject.schedule[0]?.transfer_in }
			})
			dispatch({
				type: UPDATE_TRANSFERS_OUT_COST,
				payload: {
					transfer_out:
						currentProject.schedule[currentProject.schedule.length - 1]
							?.transfer_out
				}
			})
		}
	}, [dispatch, currentProject.schedule])

	const handleSave = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		const loadingToast = toast.loading("please wait!");
		try {
			const data = { hotels, schedule, gifts }
			const res = await baseAPI.patch(`projects/${currentProject._id}`, data)
			setCurrentProject(res.data.data.data)
			localStorage.setItem('currentProject', JSON.stringify(res.data.data.data))
			toast.dismiss(loadingToast)
			toast.success('budget save', toastOptions)
			setTimeout(() => {
				navigate('/app/project/schedule')
			}, 800)
		} catch (error: any) {
			console.log(error)
			toast.dismiss(loadingToast);
			toast.error(error.message, errorToastOptions)
		}
	}

	return (
		<div id="budget_id">
			{location.pathname !== '/client' && (
				<div style={{ marginBottom: '10px', marginLeft: '10px' }}>
					<abbr title="Save and go to schedule">
						<Button icon="" handleClick={(e) => handleSave(e)}>
							Save Budget
						</Button>
					</abbr>
				</div>
			)}

			<table className="min-w-full divide-y divide-gray-300 dark:divide-black-50 dark:bg-gray-50 text-sm">
				<BudgetTableHead />

				<tbody className="divide-y divide-gray-300">
					{!multiDestination && <HotelRows hotels={state.hotels} />}
					{state.schedule?.map((day: IDay, index: number) => (
						<React.Fragment key={day._id}>
							<DayRows
								day={day}
								pax={state.nrPax}
								isFirstDay={index === 0}
								isLastDay={index === state.schedule.length - 1}
								multiDestination={multiDestination}
							/>
							{multiDestination && (
								<OvernightRows date={day.date} hotels={day.overnight?.hotels} />
							)}
						</React.Fragment>
					))}
					<GiftSection />
					{/* <GiftsRow nrPax={state.nrPax} /> */}
					<TotalBudgetCost />
				</tbody>
			</table>
		</div>
	)
}

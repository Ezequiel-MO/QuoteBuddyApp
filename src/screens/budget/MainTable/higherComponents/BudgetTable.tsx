import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BudgetTableHead } from './BudgetTableHead'
import { DayRows } from './DayRows'
import { HotelSection } from '../sections/HotelSection'
import { TotalBudgetCost } from '../../totals/TotalBudgetCost'
import { useCurrentProject } from '../../../../hooks'
import { OvernightRows } from '../rows/hotel/OvernightRows'
import { Button } from 'src/components/atoms/buttons/Button'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { IDay } from '@interfaces/project'
import { SectionDivider } from '../sections/SectionDivider'
import { UIProvider } from '@screens/budget/context/UIContext'
import { GiftSection } from '../sections'

export const BudgetTable: React.FC = () => {
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
			toast.success('Budget saved', toastOptions)
		} catch (error: any) {
			console.log(error)
			toast.error(error.message || 'An error occurred', errorToastOptions)
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<UIProvider>
			<div id="budget_id" className="py-8 px-2 md:px-6">
				{location.pathname !== '/client' && (
					<div className="mb-6 flex justify-end">
						<Button
							icon=""
							disabled={isSaving}
							handleClick={handleSave}
							aria-label="Save Budget"
							newClass="bg-blue-600 hover:bg-blue-500 text-white-0 font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
						>
							{isSaving ? (
								<>
									<svg
										className="animate-spin -ml-1 mr-2 h-4 w-4 text-white-0"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									<span>Saving...</span>
								</>
							) : (
								'Save Budget'
							)}
						</Button>
					</div>
				)}
				<div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-700/60 bg-gradient-to-b from-gray-800 to-gray-900">
					<table className="w-full table-auto text-sm border-collapse rounded-lg">
						<thead className="sticky top-0 z-10">
							<BudgetTableHead />
						</thead>
						<tbody className="divide-y divide-gray-700/40">
							{!multiDestination && <HotelSection />}
							{schedule?.map((day: IDay, index: number) => (
								<React.Fragment key={`${day._id}-${index}`}>
									<SectionDivider title={day.date} />
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
							<SectionDivider title="Additional Items" />
							<GiftSection />
							<TotalBudgetCost />
						</tbody>
					</table>
				</div>
			</div>
		</UIProvider>
	)
}

import React, { FC, useState } from 'react'
import { DeleteIcon } from '@components/atoms'
import { useCurrentProject } from 'src/hooks'
import { useTransfers } from '../../../add/toProject/transfers/render/context'
import { IntroAdd } from 'src/components/atoms'
import { IntroModal } from '../render/introModal/IntroModal'
import { ServiceKey } from 'src/interfaces'
import { IItinerary } from '@interfaces/project'

interface ItineraryTransferRenderProps {
	dayIndex: number
	setDayIndex: React.Dispatch<React.SetStateAction<number | undefined>>
	itinerary?: IItinerary
	date: string
}

export const ItineraryTransferRender: FC<ItineraryTransferRenderProps> = ({
	itinerary,
	dayIndex,
	setDayIndex,
	date
}) => {
	const { removeIteneraryTransfer } = useCurrentProject()
	const { setOpen, setItinerary } = useTransfers()

	const [openModalIntro, setOpenModalntro] = useState(false)

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
		setOpen(true)
		setDayIndex(dayIndex)
		if (itinerary) {
			setItinerary(itinerary)
		}
	}

	const handleDelete = (id: string, index: number) => {
		removeIteneraryTransfer({
			dayIndex,
			transferId: id
		})
	}

	return (
		<div>
			<IntroAdd events={itinerary as IItinerary} setOpen={setOpenModalntro} />
			<IntroModal
				open={openModalIntro}
				setOpen={setOpenModalntro}
				day={date}
				dayIndex={dayIndex}
				eventType="itinerary"
				events={itinerary as IItinerary}
			/>
			<div
				className="my-2 bg-slate-700 p-4 rounded-lg shadow-md max-w-[600px] text-white-0 active:scale-95 active:transition active:duration-150 active:ease-in-out cursor-pointer"
				onClick={(e) => handleClick(e)}
			>
				<div className="grid grid-cols-4 text-white font-semibold border-b-2 border-white">
					<div>Vehicle Capacity</div>
					<div>Vehicle Type</div>
					<div>Cost (Service)</div>
				</div>
				{itinerary?.itinerary?.map((transfer, index) => (
					<div
						key={index}
						className="grid grid-cols-4 text-white p-2 border-b border-white"
					>
						<div>{`${transfer.vehicleCapacity} Seater`}</div>
						<div>{transfer.vehicleType}</div>
						<div>
							{transfer[transfer.selectedService as ServiceKey]} EUR{' '}
							{`(${transfer.selectedService})`}
						</div>
						<div>
							<DeleteIcon
								id={transfer._id}
								onDelete={(id) => handleDelete(id, index)}
							/>
						</div>
						{index === 0 && transfer.assistance > 0 && (
							<div className="col-span-3 text-sm text-gray-200 mt-2">
								{transfer.assistance > 0 && (
									<p>
										Assistance: {transfer.assistance} Unit/s- Cost:{' '}
										{transfer.assistanceCost} EUR
									</p>
								)}
							</div>
						)}
					</div>
				))}
				<span>Starts: {itinerary && itinerary?.starts}</span>
				<span style={{ marginLeft: '50px' }}>
					Ends: {itinerary && itinerary?.ends}
				</span>
			</div>
		</div>
	)
}

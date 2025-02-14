import { FC, useState } from 'react'
import { useCurrentProject } from '../../../../hooks'
import { HotelModal } from './hotelModal/HotelModal'
import { HotelCard } from './HotelCard'
import { CardAdd } from '../../../../components/atoms'
import { DragAndDropContextProvider } from '../../../../context/dragndrop/DragAndDropContextProvider'
import { IHotel } from '@interfaces/hotel'

interface HotelListProps {
	hotels: IHotel[]
	onDelete: (hotelId: string) => void
}

export const HotelList: FC<HotelListProps> = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()
	const [open, setOpen] = useState(false)
	const [hotelModal, setHotelModal] = useState<IHotel | undefined>(undefined)

	const handleClick = (e: React.MouseEvent<HTMLDivElement>, hotel: IHotel) => {
		e.preventDefault()
		setHotelModal(hotel)
		setOpen(true)
	}

	return (
		<div className="flex flex-col items-start w-full max-w-xs p-4 rounded-lg shadow-lg bg-gray-800 text-white-0">
			<h2 className="text-lg font-bold mb-4 uppercase">Hotels</h2>
			<div className="overflow-y-auto max-h-[500px] w-full space-y-4">
				<HotelModal open={open} setOpen={setOpen} hotel={hotelModal} />
				<DragAndDropContextProvider
					initialItems={hotels}
					onMove={dragAndDropHotel}
				>
					{(itemsState: IHotel[]) =>
						itemsState.map((hotel, index) => (
							<HotelCard
								key={hotel._id}
								hotel={hotel}
								onDelete={() => hotel._id && onDelete(hotel._id)}
								handleClick={(e) => handleClick(e, hotel)}
								index={index}
							/>
						))
					}
				</DragAndDropContextProvider>
				<CardAdd
					name="hotel"
					route="hotel"
					timeOfEvent={null}
					dayOfEvent={null}
				/>
			</div>
		</div>
	)
}

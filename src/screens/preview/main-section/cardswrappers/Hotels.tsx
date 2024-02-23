import React from 'react'
import { IHotel } from '@interfaces/hotel'
import { HotelCards } from '../cards/HotelCards'
import TabbedContent from '@components/molecules/tabs/TabbedContent'

interface Props {
	hotels: IHotel[] | []
}

export const Hotels: React.FC<Props> = ({ hotels }) => {
	return (
		<div className="flex flex-wrap page-break-after" id="hotels_id">
			<TabbedContent
				items={hotels}
				renderItem={(hotel) => <HotelCards hotel={hotel} />}
				type="hotel"
			/>
		</div>
	)
}

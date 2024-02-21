import { TabContent } from '@components/atoms/tabs/TabContent'
import { TabList } from '@components/molecules/tabs/TabList'
import { IHotel } from '@interfaces/hotel'
import React, { useMemo, useState } from 'react'
import { HotelCards } from '../cards/HotelCards'

interface Props {
	hotels: IHotel[]
}

export const Hotels: React.FC<Props> = ({ hotels }) => {
	const [openTab, setOpenTab] = useState<number>(1)

	const hotelsTabItems = useMemo(
		() =>
			hotels.map((hotel) => {
				const { _id, name } = hotel
				return { _id, name }
			}),
		[hotels]
	)

	return (
		<div className="flex flex-wrap">
			<div className="w-full">
				<TabList
					tabListItems={hotelsTabItems}
					type="hotel"
					activeTab={openTab}
					setActiveTab={setOpenTab}
					onTabClick={function (id: string): void {
						console.log('tab list from hotels')
					}}
				/>
				<div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
					<div className="py-5 flex-auto">
						<div className="tab-content tab-space">
							{hotels.map((hotel, index) => (
								<TabContent key={index} activeTab={openTab} index={index}>
									<HotelCards hotel={hotel} />
								</TabContent>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

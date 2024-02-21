import { TabContent } from '@components/atoms/tabs/TabContent'
import { TabList } from '@components/molecules/tabs/TabList'
import { IEntertainment } from '@interfaces/entertainment'
import { useState, useMemo } from 'react'
import { EntertainmentCard } from './EntertainmentCard'

interface Props {
	entertainments: IEntertainment[] | []
	restaurant: string
}

export const EntertainmentCards: React.FC<Props> = ({
	entertainments,
	restaurant
}) => {
	const [activeTab, setActiveTab] = useState<number>(1)

	const entertainmentListItems = useMemo(
		() =>
			entertainments.map((entertainment) => {
				return { _id: entertainment._id!, name: entertainment.name }
			}),
		[entertainments]
	)

	if (entertainments.length === 0) return null

	return (
		<div className="entertainment-cards-container">
			<div className="my-5 text-2xl font-semibold text-white-0 mb-4">
				Entertainment/Shows @ {restaurant}
			</div>
			<TabList
				tabListItems={entertainmentListItems}
				type="entertainment"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				onTabClick={function (id: string): void {
					console.log('function not implemented yet')
				}}
			/>

			<div className="entertainment-cards-content">
				{entertainments.map((entertainment, index) => (
					<TabContent
						key={entertainment._id}
						activeTab={activeTab}
						index={index}
					>
						<EntertainmentCard entertainment={entertainment} />
					</TabContent>
				))}
			</div>
		</div>
	)
}

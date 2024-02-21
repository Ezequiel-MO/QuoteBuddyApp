import { TabContent } from '@components/atoms/tabs/TabContent'
import { TabList } from '@components/molecules/tabs/TabList'
import { IGift } from '@interfaces/gift'
import { useMemo, useState } from 'react'
import { useTranslation } from 'src/context/translations/translationContext'
import { GiftCard } from '../cards/GiftCard'

interface Props {
	gifts: IGift[]
}

export const Gifts = ({ gifts }: Props) => {
	const [openTab, setOpenTab] = useState<number>(1)
	const { t } = useTranslation()

	const giftTabListItems = useMemo(
		() =>
			gifts
				.filter((gift) => gift._id !== undefined)
				.map((gift) => ({
					_id: gift._id as string,
					name: gift.name
				})),
		[gifts]
	)

	return (
		<>
			<div className="flex flex-wrap page-break-after" id="gifts_id">
				<div className="w-full">
					<TabList
						tabListItems={giftTabListItems}
						type="gift"
						activeTab={openTab}
						setActiveTab={setOpenTab}
						onTabClick={function (id: string): void {
							console.log('tab list from gifts')
						}}
					/>
					<div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
						<div className="px-4 py-5 flex-auto">
							<div className="tab-content tab-space">
								{gifts.map((gift, index) => (
									<TabContent key={gift._id} activeTab={openTab} index={index}>
										<GiftCard gift={gift} />
									</TabContent>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

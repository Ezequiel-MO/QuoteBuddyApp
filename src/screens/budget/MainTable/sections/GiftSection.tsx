import { useState, useEffect } from 'react'
import { useCurrentProject } from 'src/hooks'
import { IGift } from 'src/interfaces'

import { SectionHeader } from '../sections/SectionHeader'
import { GiftRow } from '../rows/gift/GiftRow'

export const GiftSection = () => {
	const {
		currentProject: { gifts = [] },
		updateGiftCost
	} = useCurrentProject()

	const [selectedGift, setSelectedGift] = useState<IGift>(gifts[0])

	useEffect(() => {
		if (gifts.length > 0 && selectedGift) {
			const payload: number = selectedGift.qty * selectedGift.price
			updateGiftCost(payload)
		}
	}, [gifts, selectedGift, updateGiftCost])

	if (gifts.length === 0) return null

	return (
		<>
			{/* Section Header - This adds consistent styling with other sections */}
			<SectionHeader title="Gifts" type="gift" />

			{/* Gift Row */}
			<GiftRow
				items={gifts}
				selectedGift={selectedGift}
				setSelectedGift={setSelectedGift}
			/>
		</>
	)
}

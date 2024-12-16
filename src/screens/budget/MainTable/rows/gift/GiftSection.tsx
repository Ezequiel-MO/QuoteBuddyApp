import { useState, useEffect } from 'react'
import { IGift } from 'src/interfaces/'
import { GiftRow } from './GiftRow'
import { useCurrentProject } from 'src/hooks'

export const GiftSection = () => {
	const {
		currentProject: { gifts = [] },
		updateGiftCost
	} = useCurrentProject()

	const [selectedGift, setSelectedGift] = useState<IGift>(gifts[0])

	useEffect(() => {
		const payload: number = selectedGift?.qty * selectedGift?.price
		updateGiftCost(payload)
	}, [gifts, selectedGift])

	return (
		<>
			<GiftRow
				items={gifts}
				selectedGift={selectedGift}
				setSelectedGift={setSelectedGift}
			/>
		</>
	)
}

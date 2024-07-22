import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import {
	AddToProjectButton,
	ButtonDeleteWithAuth
} from '../../../components/atoms'
import { formatMoney } from '../../../helper'
import { IGift } from '@interfaces/gift'
import { useGift } from '../context/GiftsContext'
import { useCurrentProject } from 'src/hooks'

interface GiftListItemProps {
	item: IGift
	canBeAddedToProject: boolean
}

export const GiftListItem: FC<GiftListItemProps> = ({
	item: gift,
	canBeAddedToProject = false
}) => {
	const { addGiftToProject } = useCurrentProject()
	const { state, dispatch } = useGift()
	const navigate = useNavigate()

	const handleAddGiftToProject = (gift: IGift) => {
		addGiftToProject(gift)
		navigate('/app/project/schedule')
	}

	const handleNavigateToGiftSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_GIFT',
			payload: gift
		})
		navigate('/app/gift/specs')
	}

	return (
		<div
			key={gift._id}
			className="bg-gray-700 rounded-lg shadow-lg overflow-hidden max-w-[300px]"
		>
			<img
				src={gift.imageContentUrl[0]}
				className="w-full h-48 object-cover"
				loading="lazy"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold mb-2 text-white-0">{gift.name}</h3>
				<div className="flex items-center justify-between mb-4">
					<AddToProjectButton
						canBeAddedToProject={canBeAddedToProject}
						onAdd={() => handleAddGiftToProject(gift)}
					/>
				</div>
				<div className="flex items-center justify-between">
					<p className="text-lg font-semibold text-white">
						{formatMoney(gift.price)}
					</p>
					<span
						className="cursor-pointer text-gray-400 hover:text-gray-800 flex items-center"
						onClick={handleNavigateToGiftSpecs}
					>
						<span>Edit</span>
						<Icon icon="mdi:database-edit-outline" width={20} />
					</span>
					<ButtonDeleteWithAuth
						endpoint={'gifts'}
						ID={gift._id}
						setter={(updatedGifts: IGift[]) =>
							dispatch({
								type: 'SET_GIFTS',
								payload: updatedGifts
							})
						}
						items={state.gifts || []}
					/>
				</div>
			</div>
		</div>
	)
}

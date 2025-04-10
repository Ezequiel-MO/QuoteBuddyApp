import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import GiftsCardList, { EditGiftParams } from './GiftsCardList'
import { IGift } from '@interfaces/gift'

export const GiftSchedule: React.FC = () => {
	const navigate = useNavigate()
	const { currentProject, removeGiftFromProject, editGift } =
		useCurrentProject()

	const handleNavigate = useCallback(() => {
		navigate('/app/gift')
	}, [navigate])

	// Handle deleting a gift
	const handleDeleteGift = useCallback(
		(giftId: string) => {
			try {
				// The API actually expects an object with an 'id' property
				removeGiftFromProject({ id: giftId } as any)
				toast.success('Gift Removed', toastOptions)
			} catch (error) {
				toast.error('Failed to remove gift', toastOptions)
				console.error('Failed to delete gift:', error)
			}
		},
		[removeGiftFromProject]
	)

	// Adapter function to convert from GiftsCardList editGift format to the API's editGift format
	const handleEditGift = useCallback(
		(params: EditGiftParams) => {
			try {
				// Get the original gift
				const originalGift = currentProject.gifts[params.indexGift]

				if (!originalGift) {
					toast.error('Gift not found', toastOptions)
					return
				}

				// Create a modified gift object with updated values
				const modifiedGift: IGift = {
					...originalGift,
					...(params.qty !== undefined && { qty: params.qty }),
					...(params.price !== undefined && { price: params.price }),
					...(params.textContent !== undefined && {
						textContent: params.textContent
					})
				}

				// Call the editGift function with the gift and index
				editGift(modifiedGift, params.indexGift)
				toast.success('Gift Updated', toastOptions)
			} catch (error) {
				toast.error('Failed to update gift', toastOptions)
				console.error('Failed to edit gift:', error)
			}
		},
		[currentProject?.gifts, editGift]
	)

	// Check if there are any gifts to display
	const hasGifts =
		Array.isArray(currentProject?.gifts) && currentProject.gifts.length > 0

	return (
		<div className="bg-gray-900 p-6 rounded-lg shadow-lg">
			<div className="mb-6">
				<h1 className="text-2xl text-orange-200 font-bold border-b border-orange-200 pb-2 mb-4">
					Project Gifts
				</h1>
				<p className="text-gray-300 mb-4">
					Manage gifts for this project. You can add, edit, or remove gifts as
					needed.
				</p>
			</div>

			{hasGifts ? (
				<GiftsCardList
					gifts={currentProject.gifts}
					handleDeleteGift={handleDeleteGift}
					editGift={handleEditGift}
				/>
			) : (
				<div className="bg-gray-800 p-8 rounded-lg text-center">
					<p className="text-gray-300 mb-4">
						No gifts added to this project yet.
					</p>
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
						onClick={handleNavigate}
					>
						Add First Gift
					</button>
				</div>
			)}
		</div>
	)
}

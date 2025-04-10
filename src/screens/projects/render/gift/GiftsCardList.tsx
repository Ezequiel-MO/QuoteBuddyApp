import { useState, ChangeEvent, useCallback, memo, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { formatMoney } from '../../../../helper'
import InputGiftQty from './InputGiftQty'
import { GiftModal } from './giftModal/GiftModal'
import { CardAddGift } from './CardAddGift'
import { IGift } from '@interfaces/gift'

// Interface for edit parameters
export interface EditGiftParams {
	qty?: number
	price?: number
	indexGift: number
	textContent?: string
}

interface GiftsCardListProps {
	gifts: IGift[]
	handleDeleteGift: (giftId: string) => void
	editGift: (params: EditGiftParams) => void
}

const GiftsCardList: React.FC<GiftsCardListProps> = ({
	gifts,
	handleDeleteGift,
	editGift
}) => {
	const navigate = useNavigate()
	const [editIndex, setEditIndex] = useState<number>(-1)
	const [activate, setActivate] = useState<boolean>(false)
	const [data, setData] = useState({
		qty: 1,
		price: 0
	})
	const [edit, setEdit] = useState({
		qty: '',
		price: ''
	})
	const [open, setOpen] = useState<boolean>(false)
	const [giftModal, setGiftModal] = useState<IGift>({} as IGift)

	const handleEdit = useCallback(
		(index: number, type: string, activate: boolean, indexGif: number) => {
			if (!activate) {
				setEditIndex(index)
				setEdit((prev) => ({
					...prev,
					[type]: type
				}))
				setActivate(true)
			} else {
				setEditIndex(index)
				setEdit((prev) => ({
					...prev,
					[type]: ''
				}))
				setActivate(false)
				editGift({
					qty: Number(data.qty),
					indexGift: indexGif,
					price: Number(data.price)
				})
			}
		},
		[data.qty, data.price, editGift]
	)

	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setData((prev) => ({
			...prev,
			[name]: value
		}))
	}, [])

	const handleClick = useCallback(
		(e: React.MouseEvent, index: number, gift: IGift) => {
			// Stop event propagation to prevent unwanted parent handlers from firing
			e.stopPropagation()
			e.preventDefault()

			setEditIndex(index)
			setGiftModal(gift)
			setOpen(true)
		},
		[]
	)

	// Handle view gift details from keyboard
	const handleViewGift = useCallback((index: number, gift: IGift) => {
		setEditIndex(index)
		setGiftModal(gift)
		setOpen(true)
	}, [])

	// Accessibility - handle keydown for clickable elements
	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLElement>, callback: () => void) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault()
				e.stopPropagation()
				callback()
			}
		},
		[]
	)

	return (
		<>
			<GiftModal
				open={open}
				setOpen={setOpen}
				gift={giftModal}
				index={editIndex}
				setEditIndex={setEditIndex}
			/>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{gifts?.map((gift, index) => (
					<div
						key={gift._id || index}
						className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors duration-200 flex flex-col"
					>
						{/* Fixed height image container */}
						<div className="relative w-full h-48">
							<img
								src={gift?.imageContentUrl[0] || '/placeholder-image.jpg'}
								className="w-full h-full object-cover"
								alt={gift.name}
								loading="lazy"
							/>
						</div>
						<div className="p-4 flex-grow flex flex-col">
							<h3 className="text-white text-lg font-medium text-center mb-3 truncate">
								{gift.name}
							</h3>
							<div className="flex justify-between items-center gap-2 mt-auto">
								<button
									className="text-blue-400 hover:text-blue-300 transition-colors duration-200 p-2"
									onClick={(e) => handleClick(e, index, gift)}
									onKeyDown={(e) =>
										handleKeyDown(e, () => handleViewGift(index, gift))
									}
									aria-label="View gift details"
								>
									<Icon icon="ic:baseline-remove-red-eye" width="20" />
								</button>

								<div>
									{editIndex === index && edit.qty ? (
										<InputGiftQty
											data={data}
											handleChange={handleChange}
											handleEdit={handleEdit}
											gift={gift}
											setData={setData}
											index={index}
											type="qty"
											activate={activate}
										/>
									) : (
										<div
											className="px-2 py-1 bg-gray-700 rounded text-sm cursor-pointer hover:bg-gray-600 transition-colors duration-200"
											onClick={(e) => {
												e.stopPropagation()
												handleEdit(index, 'qty', activate, index)
											}}
											onKeyDown={(e) =>
												handleKeyDown(e, () =>
													handleEdit(index, 'qty', activate, index)
												)
											}
											role="button"
											tabIndex={0}
											aria-label={`Edit quantity: currently ${gift?.qty ?? 1}`}
										>
											Qty: {gift?.qty ?? 1}
										</div>
									)}
								</div>

								<div>
									{editIndex === index && edit.price ? (
										<InputGiftQty
											data={data}
											handleChange={handleChange}
											handleEdit={handleEdit}
											gift={gift}
											setData={setData}
											index={index}
											type="price"
											activate={activate}
										/>
									) : (
										<div
											className="px-2 py-1 bg-gray-700 rounded text-sm cursor-pointer hover:bg-gray-600 transition-colors duration-200"
											onClick={(e) => {
												e.stopPropagation()
												handleEdit(index, 'price', activate, index)
											}}
											onKeyDown={(e) =>
												handleKeyDown(e, () =>
													handleEdit(index, 'price', activate, index)
												)
											}
											role="button"
											tabIndex={0}
											aria-label={`Edit price: currently ${formatMoney(
												gift.price
											)}`}
										>
											{formatMoney(gift.price)}
										</div>
									)}
								</div>

								<button
									className="text-red-400 hover:text-red-300 transition-colors duration-200 p-2"
									onClick={(e) => {
										e.stopPropagation()
										handleDeleteGift(gift._id)
									}}
									onKeyDown={(e) =>
										handleKeyDown(e, () => handleDeleteGift(gift._id))
									}
									aria-label="Delete gift"
								>
									<Icon icon="lucide:delete" width="20" />
								</button>
							</div>
						</div>
					</div>
				))}
				<CardAddGift navigate={navigate} />
			</div>
		</>
	)
}

// Memoize the component to prevent unnecessary re-renders
export default memo(GiftsCardList)

// Export the non-memoized version for compatibility with existing code
export { GiftsCardList }

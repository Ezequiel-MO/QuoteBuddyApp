import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { Icon } from '@iconify/react'

export const ImagesModalEvent = ({ event, imagesEvent, setImagesEvent }) => {
	const [change, setChange] = useState(false)
	const [eventIndex, setEventIndex] = useState(null)

	useEffect(() => {
		setImagesEvent(event?.imageContentUrl)
	}, [event])

	const handleDeleted = (index, image) => {
		let copy = [...imagesEvent]
		copy = copy.filter((el) => el !== image)
		setImagesEvent(copy)
		toast.success(`Image Removed number: ${index + 1}`, toastOptions)
	}

	if (!imagesEvent || imagesEvent.length === 0) {
		return null
	}

	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-4 gap-2">
				{imagesEvent.map((el, index) => (
					<div
						key={index}
						className="relative overflow-hidden"
						onMouseOver={() => {
							setChange(true)
							setEventIndex(index)
						}}
						onMouseOut={() => {
							setChange(false)
							setEventIndex(null)
						}}
					>
						<div
							className={`${
								eventIndex === index && change ? 'block' : 'hidden'
							} absolute top-2 right-2 bg-red-500 rounded-full cursor-pointer`}
							onClick={() => {
								handleDeleted(index, el)
							}}
						>
							<Icon
								icon="material-symbols:delete-outline"
								className="text-white text-xl"
							/>
						</div>
						<img
							src={`${el}?w=164&h=164&fit=crop&auto=format`}
							alt={`Thumbnail ${index + 1}`}
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

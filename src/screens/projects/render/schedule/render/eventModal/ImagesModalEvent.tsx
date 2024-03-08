import { useState, useEffect, FC } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { Icon } from '@iconify/react'
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import { animations } from "@formkit/drag-and-drop"
import { IEvent } from "src/interfaces/event"
import styles from "src/screens/projects/render/DayEvents.module.css"

interface ImagesModalEventProps {
	event: IEvent
	imagesEvent: string[]
	setImagesEvent: React.Dispatch<React.SetStateAction<string[]>>
}



export const ImagesModalEvent: FC<ImagesModalEventProps> = ({ event, imagesEvent, setImagesEvent }) => {
	const [change, setChange] = useState(false)
	const [eventIndex, setEventIndex] = useState<number | null>(null)
	
	// "parent" para el ref de "<ul>" , listImages y  setListImages es un "useState" de tipo array
	const [parent, listImages, setListImages] = useDragAndDrop<HTMLUListElement, string>(
		[],
		{
			plugins: [animations()] // sirve para la animacion del drag and drop
		}
	)
	const [imageDrag, setImageDrag] = useState<string | null>(null)
	const [isDrag, setIsDrag] = useState(false)
	console

	useEffect(() => {
		if (event?.imageContentUrl) {
			setImagesEvent(event?.imageContentUrl)
			setListImages(event?.imageContentUrl)
		}
	}, [event])

	useEffect(() => {
		setImagesEvent(listImages)
	}, [listImages])

	const handleDragStart = (linkImage: string) => {
		setImageDrag(linkImage)
		setIsDrag(true)
	}
	const handleDragEnd = () => {
		setImageDrag(null)
		setIsDrag(false)
	}

	const handleDeleted = (index: number, image: string) => {
		let copy = [...imagesEvent]
		copy = copy.filter((el) => el !== image)
		setImagesEvent(copy)
		setListImages(copy)
		toast.success(`Image Removed number: ${index + 1}`, toastOptions)
	}

	if (!listImages) {
		return null
	}

	return (
		<div className="mt-6 mb-8">
			<ul
				className="flex flex-wrap p-0 list-none rounded-lg shadow-md shadow-gray-900"
				ref={parent}
			>
				{
					listImages.map((el, index) => (
						<li
							key={el}
							className={`relative  flex-grow-0 flex-shrink-0 min-w-0 p-2 w-1/3`}
							draggable="true"
							onDragStartCapture={(e) => handleDragStart(el)}
							onDragEnd={(e) => handleDragEnd()}
						>
							<div
								className={`${styles.deletedImagen} right-10 top-2 cursor-pointer`}
								onMouseOver={(event) => {
									setChange(true)
									setEventIndex(index)
								}}
								onMouseOut={(event) => {
									setChange(false)
									setEventIndex(null)
								}}
								onClick={(e) => {
									e.stopPropagation()
									handleDeleted(index, el)
								}}
							>
								{
									eventIndex !== index && !isDrag && (
										<span className={styles.deletedImagen}>
											<Icon icon="mdi:garbage" className={styles.iconGarbage} />
										</span>
									)
								}
								{
									change && eventIndex === index && (
										<span className={styles.deletedImagen}>
											<Icon
												icon="mdi:garbage-can-empty"
												className={styles.iconGarbage}
											/>
										</span>
									)
								}
							</div>
							<img
								src={el}
								key={el}
								className={`rounded-md  h-48 object-cover w-full ${styles.imagenDrag} ${imageDrag === el && isDrag ? `opacity-60  blur-sm scale-95` : ""}`}
								loading="lazy"
							/>
						</li>
					))
				}
			</ul>
		</div>
	)
}

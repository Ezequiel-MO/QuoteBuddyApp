import React, { useState, useEffect, FC } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import { animations } from "@formkit/drag-and-drop"
import { IHotel } from "src/interfaces/hotel"
import styles from '../../DayEvents.module.css'

interface ImagesModalHotelProps {
	hotel: IHotel
	imagesHotel: string[]
	setImagesHotel: React.Dispatch<React.SetStateAction<string[]>>
}


export const ImagesModalHotel: FC<ImagesModalHotelProps> = ({ hotel, imagesHotel, setImagesHotel }) => {
	const [change, setChange] = useState(false)

	const [hotelIndex, setHotelIndex] = useState<number | null>(null)

	// "parent" para el ref , listImages y  setListImages es un "useState" de tipo array
	const [parent, listImages, setListImages] = useDragAndDrop<HTMLUListElement, string>(
		[],
		{
			plugins: [animations()] // sirve para la animacion del drag and drop
		}
	)
	const [imageDrag, setImageDrag] = useState<string | null>(null)
	const [isDrag, setIsDrag] = useState(false)

	useEffect(() => {
		if (hotel?.imageContentUrl) {
			setImagesHotel(hotel?.imageContentUrl)
			setListImages(hotel?.imageContentUrl)
		}
	}, [hotel])

	useEffect(() => {
		setImagesHotel(listImages)
	}, [listImages])


	const handleDragStart = (linkImageHotel: string) => {
		setImageDrag(linkImageHotel)
		setIsDrag(true)
	}
	const handleDragEnd = () => {
		setImageDrag(null)
		setIsDrag(false)
	}


	const handleDeleted = (index: number, imagen: string) => {
		let copy = [...imagesHotel]
		copy = copy.filter((el) => el !== imagen)
		setImagesHotel(copy)
		setListImages(copy)
		toast.success(`Imagen Removed number:${index + 1}`, toastOptions)
	}


	if (!listImages) return null

	return (
		<div className="mt-6 mb-8">
			<ul
				className="flex flex-wrap p-0 list-none rounded-lg shadow-md shadow-gray-900"
				ref={parent}
			>
				{listImages?.map((el, index) => (
					<li
						key={el}
						className={`relative  flex-grow-0 flex-shrink-0 min-w-0 p-2 w-1/3`}
						draggable="true"
						onDragStartCapture={(e) => handleDragStart(el)}
						onDragEnd={(e) => handleDragEnd()}
					>
						<div
							onMouseOver={(event) => {
								setChange(true)
								setHotelIndex(index)
							}}
							onMouseOut={(event) => {
								setChange(false)
								setHotelIndex(null)
							}}
							onClick={(e) => {
								e.stopPropagation()
								handleDeleted(index, el)
							}}
							className={`${styles.deletedImagen} right-10 top-2 cursor-pointer`}
						>
							{hotelIndex !== index && !isDrag && (
								<span className={styles.deletedImagen}>
									<Icon icon="mdi:garbage" className={styles.iconGarbage} />
								</span>
							)}
							{change && hotelIndex === index && (
								<span className={styles.deletedImagen}>
									<Icon
										icon="mdi:garbage-can-empty"
										className={styles.iconGarbage}
									/>
								</span>
							)}
						</div>
						<img
							src={el}
							key={el}
							className={`rounded-md  h-48 object-cover w-full ${styles.imagenDrag} ${imageDrag === el && isDrag ? `opacity-60  blur-sm scale-95` : ""}`}
							loading="lazy"
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

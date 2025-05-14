import React, { useEffect } from 'react'
import { ImagesModalHotel } from './ImagesModalHotel'
import {
	TableModalHotel,
	type HotelPriceFormData,
	type HotelPriceCheckedState
} from './TableModalHotel'

import { type IImage } from '../../../../../interfaces/image'
import { type IHotel } from '@interfaces/hotel'
import TextEditor from '@components/molecules/TextEditor'

export interface HotelModalContentProps {
	hotel: IHotel | null | undefined
	data: HotelPriceFormData
	setData: React.Dispatch<React.SetStateAction<HotelPriceFormData>>
	isChecked: HotelPriceCheckedState
	setIsChecked: React.Dispatch<React.SetStateAction<HotelPriceCheckedState>>
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	imagesHotel: IImage[]
	setImagesHotel: React.Dispatch<React.SetStateAction<IImage[]>>
}

export const HotelModalContent: React.FC<HotelModalContentProps> = ({
	hotel,
	data,
	setData,
	isChecked,
	setIsChecked,
	textContent,
	setTextContent,
	imagesHotel,
	setImagesHotel
}) => {
	useEffect(() => {
		// This effect is responsible for setting the initial text content
		// when the 'hotel' prop changes (e.g., a new hotel is loaded).
		// It should not interfere with subsequent user edits to the textContent.
		if (hotel && typeof hotel.textContent === 'string') {
			// Set the editor's content from hotel.textContent.
			// This will happen when 'hotel' changes or is first loaded.
			setTextContent(hotel.textContent)
		} else if (!hotel) {
		}
	}, [hotel, setTextContent])

	return (
		<div className="container flex flex-col border p-8">
			<h1 className="text-center text-2xl font-semibold mb-4">
				{hotel?.name || 'Hotel Details'}
			</h1>
			<TableModalHotel
				hotel={hotel}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
			/>
			<div className="mt-4">
				<TextEditor
					value={textContent}
					onChange={setTextContent}
					style={{ minHeight: '200px' }}
				/>
			</div>
			<ImagesModalHotel
				hotel={hotel || ({} as IHotel)}
				imagesHotel={imagesHotel}
				setImagesHotel={setImagesHotel}
			/>
		</div>
	)
}

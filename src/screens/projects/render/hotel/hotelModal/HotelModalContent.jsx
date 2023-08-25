import { RichTextEditor } from '../../../../../components/molecules'
import { ImagesModalHotel } from './ImagesModalHotel'
import { TableModalHotel } from './TableModalHotel'

export const HotelModalContent = ({
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
	const update = Object.keys(hotel).length > 0
	return (
		<div className="container flex flex-col border p-8">
			<h1 className="text-center text-2xl font-semibold mb-4">{hotel?.name}</h1>
			<TableModalHotel
				hotel={hotel}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
			/>
			<div className="mt-4">
				<RichTextEditor
					style={{}}
					setTextContent={setTextContent}
					textContent={textContent}
					screen={hotel}
					update={update}
				/>
			</div>
			<ImagesModalHotel
				hotel={hotel}
				imagesHotel={imagesHotel}
				setImagesHotel={setImagesHotel}
			/>
		</div>
	)
}

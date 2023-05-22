import { RichTextEditor } from '../../../../../ui'
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
		<div className="container w-3/4 flex flex-col bord">
			<TableModalHotel
				hotel={hotel}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
			/>
			<div style={{ marginTop: '10px' }}>
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

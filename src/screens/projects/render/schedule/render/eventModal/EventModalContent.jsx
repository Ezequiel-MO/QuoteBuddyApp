import { TableModalEvent } from './TableModalEvent'
import { ImagesModalEvent } from './ImagesModalEvent'
import { RichTextEditor } from '../../../../../../components/molecules'

export const EventModalContent = ({
	event,
	textContent,
	setTextContent,
	imagesEvent,
	setImagesEvent,
	data,
	setData,
	isChecked,
	setIsChecked
}) => {
	const update = Object.keys(event).length > 0

	return (
		<div className="flex flex-col w-full gap-4 py-2">
			<h1 className="text-center text-2xl font-bold mb-4">{event?.name}</h1>
			<TableModalEvent
				event={event}
				data={data}
				setData={setData}
				isChecked={isChecked}
				setIsChecked={setIsChecked}
			/>
			<RichTextEditor
				screen={event}
				setTextContent={setTextContent}
				textContent={textContent}
				update={update}
			/>
			<ImagesModalEvent
				event={event}
				imagesEvent={imagesEvent}
				setImagesEvent={setImagesEvent}
			/>
		</div>
	)
}

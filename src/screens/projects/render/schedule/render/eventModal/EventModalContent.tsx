import { TableModalEvent } from './TableModalEvent'
import { ImagesModalEvent } from './ImagesModalEvent'
import { RichTextEditor } from '../../../../../../components/molecules'
import { FC } from 'react'
import { IRestaurant, IEvent } from "@interfaces/index"
import { IImage } from "@interfaces/image"
import { ImageUrlCaptions } from "./ImagesUrlCaptions"

interface IisCheckedActivity {
	price: boolean
	pricePerPerson: boolean
}

interface IisCheckedRestaurant {
	price: boolean
	isVenue: boolean
}

interface EventModalContentProps {
	event: IEvent & IRestaurant;
	data: IEvent & IRestaurant;
	setData: React.Dispatch<React.SetStateAction<IEvent & IRestaurant>>;
	isChecked: IisCheckedActivity & IisCheckedRestaurant;
	setIsChecked: React.Dispatch<React.SetStateAction<IisCheckedActivity & IisCheckedRestaurant>>;
	setTextContent: (content: string) => void
	textContent: string;
	imagesEvent: string[] | IImage[];
	setImagesEvent: React.Dispatch<React.SetStateAction<string[] | IImage[]>>
}


export const EventModalContent: FC<EventModalContentProps> = ({
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

	//esto va ser momentaneo , cuando Restaurant migre  imageContentUrl a imageUrlCaptions esto se va eleminar
	const isEvent = Object.keys(event).includes('pricePerPerson')
	const isRestaurant = Object.keys(event).includes('isVenue')

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
			{
				//esto va ser momentáneo , cuando Restaurant migre  imageContentUrl a imageUrlCaptions esto se va eleminar
				isRestaurant &&
				<ImagesModalEvent
					event={event}
					imagesEvent={imagesEvent as string[]}
					setImagesEvent={setImagesEvent as any}
				/>
			}
			{
				//este Componet es el que se a utilizar cuando Restaurant migre  imageContentUrl a imageUrlCaptions
				isEvent &&
				<ImageUrlCaptions
					event={event}
					imagesEvent={imagesEvent as IImage[]}
					setImagesEvent={setImagesEvent as any}
				/>
			}
		</div>
	)
}

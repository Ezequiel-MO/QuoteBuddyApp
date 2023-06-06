import { TableModalEvent } from "./TableModalEvent"
import { RichTextEditor } from "../../../../../../ui/inputs/RichTextEditor"
import { ImagesModalEvent } from "./ImagesModalEvent"


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
        <>
            <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "24px" }}>
                {event?.name}
            </h1>
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
                style={{}}
            />
            <ImagesModalEvent
                event={event}
                imagesEvent={imagesEvent}
                setImagesEvent={setImagesEvent}
            />
        </>
    )
}
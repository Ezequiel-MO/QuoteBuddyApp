import { RichTextEditor } from "../../../../../../ui/inputs/RichTextEditor"


export const IntroModalContent = ({ 
    day,
    event ,
    textContent,
    setTextContent 
}) => {

    return (
        <>
            <h1 style={{ textAlign: "center", marginBottom: "10px", fontSize: "24px" }}>
                {`${day} ${event}`}
            </h1>
            <RichTextEditor
                screen={event}
                setTextContent={setTextContent}
                textContent={textContent}
                update={undefined}
                style={{ width: '95%' }}
            />
        </>
    )
}
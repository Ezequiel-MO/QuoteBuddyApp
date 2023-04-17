import { useState } from "react"
import { ModalComponent } from "../../../../../components/atoms/Modal"
import { TableModalHotel } from "./TableModalHotel"
import { ImagesModalHotel } from "./ImagesModalHotel"
import { RichTextEditor } from '../../../../../ui'

export const HotelModal = ({ open, setOpen, hotel , index }) => {

    const [textContent, setTextContent] = useState()

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: "90%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2
    }

    if (!hotel){
        return null
    } 
    const update = Object.keys(hotel).length > 0

    return (
        <div>
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}  >
                <div className="container w-3/4 flex flex-col bord">
    
                    <TableModalHotel hotel={hotel} />
                    
                    <div style={{ marginTop: "10px" }}>
                        <RichTextEditor
                            style={{}}
                            setTextContent={setTextContent}
                            textContent={textContent} 
                            screen={hotel} 
                            update={update} 
                        />
                    </div>

                    <ImagesModalHotel hotel={hotel} />
                </div>
            </ModalComponent>
        </div>
    )

}
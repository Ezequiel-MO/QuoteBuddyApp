import { useState } from "react"
import { ModalComponent } from "src/components/atoms/modal/Modal"
import { Button } from "src/components/atoms/"
import { OptionsMasterForm } from "./OptionsMasterForm"


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '40%',
    bgcolor: '#302c2d',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: 'auto',
    borderRadius: "20px",
}


export const ModalOptions = ({ open, setOpen, id, onDelete }) => {

    const [value, setValue] = useState("")

    const handleDeleteHotelOrMeeting = (e) => {
        if(value === "removeHotel" ){
            onDelete(id) 
        }
        if(value === "removeMeetings"){
            alert("coming soon remove Meetings...")
        }
    }

    if(!id) return null

    return (
        <div>
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}  >
                <h1 className="text-white-0 text-4xl">Choose one option</h1>
                <OptionsMasterForm value={value} setValue={setValue} />
                <div className=" flex space-x-8  translate" style={{ marginLeft: "60%", marginTop: "25px" }}>
                    <Button
                        type="button"
                        handleClick={(e) => setOpen(false)}
                    >
                        cancel
                    </Button>
                    <Button type="button" handleClick={(e) => handleDeleteHotelOrMeeting(e)}>
                        save
                    </Button>
                </div>
            </ModalComponent>
        </div>
    )
}
import { useState, FC, MouseEvent } from "react"
import { ModalComponent } from "src/components/atoms/modal/Modal"
import { Button } from "src/components/atoms/"
import { OptionsMasterForm } from "./OptionsMasterForm"
import { useCurrentProject } from "src/hooks"
import { toast } from 'react-toastify'
import { toastOptions } from "src/helper/toast"

interface ModalOptionsProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    id: string
    onDelete: (id: string) => void
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '45%',
    bgcolor: '#302c2d',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: 'auto',
    borderRadius: "20px",
}



export const ModalOptions: FC<ModalOptionsProps> = ({ open, setOpen, id, onDelete }) => {
    const { removeMeetingsByHotel } = useCurrentProject()
    const [value, setValue] = useState("")

    const handleDeleteHotelOrMeeting = (e: MouseEvent<HTMLButtonElement>) => {
        if (value === "removeHotel") {
            onDelete(id)
        }
        if (value === "removeMeetings") {
            removeMeetingsByHotel(id)
            toast.success("Meetings Removed", toastOptions)
            setOpen(false)
        }
    }

    if (!id) return null

    return (
        <div>
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}  >
                <h1 className="text-white-0 text-4xl">Choose one option</h1>
                <OptionsMasterForm value={value} setValue={setValue} />
                <div className=" flex space-x-8  translate" style={{ marginLeft: "60%", marginTop: "25px" }}>
                    <Button
                        type="button"
                        handleClick={(e) => setOpen(false)}
                        icon=""
                    >
                        cancel
                    </Button>
                    <Button
                        type="button"
                        handleClick={(e) => handleDeleteHotelOrMeeting(e)}
                        icon=""
                    >
                        save
                    </Button>
                </div>
            </ModalComponent>
        </div>
    )
}
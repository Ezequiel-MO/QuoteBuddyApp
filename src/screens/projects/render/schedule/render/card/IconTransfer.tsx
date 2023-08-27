import { FC } from "react"
import { Icon } from '@iconify/react'
import { IEvent, IRestaurant } from "../../../../../../interfaces"

interface IconTransferProps {
    event: IEvent | IRestaurant
    open: boolean
    setOpen: (open: boolean) => void
}

export const IconTransfer: FC<IconTransferProps> = ({ event, open, setOpen }) => {
    const deletedIcon = 'hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out '

    if (event?.transfer && event?.transfer.length === 0) return null

    return (
        <>
            <span
                role="button"
                className={deletedIcon}
                style={{ color: "white", marginLeft: "15px", marginRight: "5px", fontSize: "25px" }}
                onClick={(e) => {
                    e.stopPropagation()
                    if (!open) {
                        setOpen(true)
                    } else {
                        setOpen(false)
                    }
                }}
            >
                <Icon icon="tabler:bus-stop" />
            </span>
        </>
    )
}
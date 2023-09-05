import { FC } from "react"
import { IEvent, IRestaurant } from "../../../../../../interfaces"

interface IconTransferProps {
    event: IEvent | IRestaurant
    open: boolean
    setOpen: (open: boolean) => void
}

export const IconTransfer: FC<IconTransferProps> = ({ event, open, setOpen }) => {
    const deletedIcon = 'hover:text-orange-500 hover:scale-110 hover:transition hover:duration-150 hover:ease-in-out '

    if (event?.transfer && event?.transfer.length === 0) {
        return (
            <>
                <span
                    role="button"
                    className={deletedIcon}
                    style={{ color: "white", fontSize: "15px", display: "inline-block" }}
                    onClick={(e) => {
                        e.stopPropagation()
                        alert("Open modal transfer")
                    }}
                >
                    Add Transfers
                </span>
            </>
        )
    }

    if (open) {
        return (
            <>
                <span
                    role="button"
                    className={deletedIcon}
                    style={{ color: "white", fontSize: "15px", display: "inline-block" }}
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpen(false)
                    }}
                >
                    <abbr title="Closed info transer">
                        Closed Edit Transfer
                    </abbr>
                </span>
            </>
        )
    }


    return (
        <>
            <button
                role="button"
                className={deletedIcon}
                style={{ color: "white", fontSize: "15px" }}
                onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }}
            >
                <abbr title="Open info transfer">
                    Edit Transfer
                </abbr>
            </button>
        </>
    )

}
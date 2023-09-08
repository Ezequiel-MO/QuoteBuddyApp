import { FC } from "react"
import { Icon } from '@iconify/react'

interface EyeIconDetailProps {
    handleClick: () => void
    eye:boolean
    isDragging:boolean
}

export const EyeIconDetail: FC<EyeIconDetailProps> = ({ handleClick, eye = true, isDragging }) => {

    if (isDragging) return null

    return (
        <>
            <span role="button"
                className={"hover:text-orange-500 hover:scale-150 hover:transition hover:duration-150 hover:ease-in-out"}
                style={{ marginRight: "10px", display: "inline-block", fontSize: "15px" }}
                onClick={(e) => {
                    e.stopPropagation()
                    handleClick()
                }}
            >
                <abbr title='open details'>
                    {
                        eye ?
                            <Icon icon="mdi:eye-outline" style={{ fontSize: "20px", color: "orangered" }} />
                            : "Edit Details"
                    }
                </abbr>
            </span>
        </>
    )
}
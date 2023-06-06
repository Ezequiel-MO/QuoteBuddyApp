import { useState, useEffect } from 'react'
import { TableHeaders } from '../../../../../../ui'
import { InputEventTable } from "./InputEventTable"

export const TableModalEvent = ({ event, data, setData, isChecked, setIsChecked }) => {
    const [type, setType] = useState("")
    const [editMode, setEditMode] = useState(false)

    const isEvent = Object.keys(event).includes("pricePerPerson")
    const isRestaurant = Object.keys(event).includes("isVenue")

    useEffect(() => {
        if (isEvent) {
            setType("eventModal")
            setData({
                ...data,
                price: event?.price,
                pricePerPerson: event?.pricePerPerson
            })
            setIsChecked({
                ...isChecked,
                price: false,
                pricePerPerson: false
            })
        }
        if (isRestaurant) {
            setType("restaurantModal")
            setData({
                ...data,
                price: event?.price,
                isVenue: event?.isVenue
            })
            setIsChecked({
                ...isChecked,
                price: false,
                isVenue: false
            })
        }
    }, [event])

    const handleEdit = (editMode, type) => {
        if (!editMode) {
            setEditMode(true)
        } else {
            setEditMode(false)
        }
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
                ? parseFloat(e.target.value)
                : e.target.value
        })
        if (event[e.target.name] != e.target.value) {
            setIsChecked({
                ...isChecked,
                [e.target.name]: true
            })
        } else {
            setIsChecked({
                ...isChecked,
                [e.target.name]: false
            })
        }
    }

    const handleCheckboxChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.checked
        })
        if (event[e.target.name] != e.target.checked) {
            setIsChecked({
                ...isChecked,
                [e.target.name]: true
            })
        } else {
            setIsChecked({
                ...isChecked,
                [e.target.name]: false
            })
        }
    }

    return (
        <table className="table-auto border-collapse border-2   border-orange-500 text-black-50" >
            <TableHeaders headers={type} />
            <td>
                {event?.city}
            </td>
            <td>
                {event?.location?.coordinates[0]}
            </td>
            <td>
                {event?.location?.coordinates[1]}
            </td>
            <td
                className='cursor-pointer'
                style={{ display: "inline-block" }}
                onDoubleClick={() => handleEdit(editMode, 'DUInr')}
            >
                {
                    editMode &&
                    <InputEventTable
                        data={data.price}
                        nameInptut="price"
                        handleChange={handleChange}
                        editMode={editMode}
                        handleEdit={handleEdit}
                    />
                }
                {!editMode && data?.price}
            </td>
            <td>
                {
                    type === "eventModal" &&
                    (
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            name='pricePerPerson'
                            checked={data.pricePerPerson}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                    )
                }
                {
                    type === "restaurantModal" &&
                    (
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            name='isVenue'
                            checked={data.isVenue}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                    )
                }
            </td>
        </table>
    )
}
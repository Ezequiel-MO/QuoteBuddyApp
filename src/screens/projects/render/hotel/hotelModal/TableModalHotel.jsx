import { useState, useEffect } from "react"
import { TableHeaders } from '../../../../../ui'
import { InputHotelTable } from "./InputHotelTable"

export const TableModalHotel = ({ hotel, data, setData , isChecked, setIsChecked }) => {

    useEffect(() => {
        setData({
            _id: hotel?.price[0]._id,
            DUInr: hotel?.price[0]?.DUInr,
            DUIprice: hotel?.price[0]?.DUIprice,
            DoubleRoomNr: hotel?.price[0]?.DoubleRoomNr,
            DoubleRoomPrice: hotel?.price[0]?.DoubleRoomPrice,
            breakfast: hotel?.price[0]?.breakfast,
            DailyTax: hotel?.price[0]?.DailyTax
        })
        setIsChecked({
            ...isChecked,
            DUInr: false,
            DUIprice: false,
            DoubleRoomNr: false,
            DoubleRoomPrice: false,
            breakfast: false,
            DailyTax: false
        })
    }, [hotel])

    const [editMode, setEditMode] = useState(false)
    const [typePrice, setTypePrice] = useState({
        DUInr: "",
        DUIprice: "",
        DoubleRoomNr: "",
        DoubleRoomPrice: "",
        breakfast: "",
        DailyTax: ""
    })

    const handleEdit = (editMode, type) => {
        if (!editMode) {
            setTypePrice({
                ...typePrice,
                [type]: type
            })
            setEditMode(true)
        } else {
            setTypePrice({
                ...typePrice,
                [type]: ""
            })
            setEditMode(false)
        }
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]:event.target.value ? parseFloat(event.target.value) : event.target.value
        })
        if(hotel.price[0][event.target.name] != event.target.value ){
            setIsChecked({
                ...isChecked,
                [event.target.name]:true
            })
        }else{
            setIsChecked({
                ...isChecked,
                [event.target.name]: false
            })
        }
    }



    return (
        <table className="table-auto border-collapse border-2  border-orange-500 text-black-50">
            <TableHeaders headers="hotelModal" />
            <tbody>
                <tr>
                    <td
                        className="cursor-pointer"
                        onDoubleClick={() => handleEdit(editMode, "DUInr")}
                    >
                        {
                            editMode && typePrice.DUInr &&
                            <InputHotelTable
                                style={{ width: "70px" }}
                                data={data.DUInr}
                                type="DUInr"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                editMode={editMode}
                            />
                        }
                        {!typePrice.DUInr && data.DUInr}
                    </td>
                    <td
                        className="cursor-pointer"
                        onDoubleClick={() => handleEdit(editMode, "DUIprice")}
                    >
                        {
                            editMode && typePrice.DUIprice &&
                            <InputHotelTable
                                style={{ width: "70px" }}
                                data={data.DUIprice}
                                type="DUIprice"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                editMode={editMode}
                            />
                        }
                        {!typePrice.DUIprice && data.DUIprice}
                    </td>
                    <td
                        className="cursor-pointer"
                        onDoubleClick={() => handleEdit(editMode, "DoubleRoomNr")}
                    >
                        {
                            editMode && typePrice.DoubleRoomNr &&
                            <InputHotelTable
                                style={{ width: "100px" }}
                                data={data.DoubleRoomNr}
                                type="DoubleRoomNr"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                editMode={editMode}
                            />
                        }
                        {!typePrice.DoubleRoomNr && data.DoubleRoomNr}
                    </td>
                    <td
                        className="cursor-pointer"
                        onDoubleClick={() => handleEdit(editMode, "DoubleRoomPrice")}
                    >
                        {
                            editMode && typePrice.DoubleRoomPrice &&
                            <InputHotelTable
                                style={{ width: "90px" }}
                                data={data.DoubleRoomPrice}
                                type="DoubleRoomPrice"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                editMode={editMode}
                            />
                        }
                        {!typePrice.DoubleRoomPrice && data.DoubleRoomPrice}
                    </td>
                    <td
                        className="cursor-pointer"
                        onDoubleClick={() => handleEdit(editMode, "breakfast")}
                    >
                        {
                            editMode && typePrice.breakfast &&
                            <InputHotelTable
                                data={data.breakfast}
                                type="breakfast"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                editMode={editMode}
                            />
                        }
                        {!typePrice.breakfast && data.breakfast}
                    </td>
                    <td
                        className="cursor-pointer"
                        onDoubleClick={() => handleEdit(editMode, "DailyTax")}
                    >
                        {
                            editMode && typePrice.DailyTax &&
                            <InputHotelTable
                                data={data.DailyTax}
                                type="DailyTax"
                                handleChange={handleChange}
                                handleEdit={handleEdit}
                                editMode={editMode}
                            />
                        }
                        {!typePrice.DailyTax && data.DailyTax}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
import { TableHeaders } from '../../../../../ui'

export const TableModalHotel = ({ hotel }) => {
    
    return (
        <table className="table-auto border-collapse border-2  border-orange-500 text-black-50">
            <TableHeaders headers="hotelModal" />
            <tbody>
                <tr className="">
                    <td>{hotel?.price[0]?.DUInr} </td>
                    <td>{hotel?.price[0]?.DUIprice} </td>
                    <td>{hotel?.price[0]?.DoubleRoomNr}</td>
                    <td>{hotel?.price[0]?.DoubleRoomPrice}</td>
                    <td>{hotel?.price[0]?.breakfast}</td>
                    <td>{hotel?.price[0]?.DailyTax}</td>
                </tr>
            </tbody>
        </table>
    )
}
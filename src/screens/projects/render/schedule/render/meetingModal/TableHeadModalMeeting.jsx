import { TableMeeting } from "./TableMeeting"

export const TableHeadModalMeeting = ({
    meeting,
    data,
    setData,
    isChecked,
    setIsChecked
}) => {
    return (
        <div className="p-6" style={{ marginTop: "-20px" }} >
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Room Capacity</th>
                        <th className="border px-2 py-1">Coffee Break Units</th>
                        <th className="border px-2 py-1">Coffee Break Price</th>
                        <th className="border px-2 py-1">Audiovisuals</th>
                        <th className="border px-2 py-1">HD Delegate.Rate</th>
                        <th className="border px-2 py-1">Lunch units</th>
                        <th className="border px-2 py-1">Lunch price</th>
                        <th className="border px-2 py-1">Dinner units</th>
                        <th className="border px-2 py-1">Dinner price</th>
                    </tr>
                </thead>
                <TableMeeting
                    meeting={meeting}
                    data={data}
                    setData={setData}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            </table>
        </div>
    )
}
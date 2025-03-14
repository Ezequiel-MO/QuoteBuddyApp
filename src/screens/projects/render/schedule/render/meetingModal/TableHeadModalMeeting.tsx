import { FC } from 'react'
// import { TableMeeting } from "./TableMeeting"
import { Icon } from '@iconify/react'
import { IMeeting } from "@interfaces/meeting"
import { useCurrentProject } from '@hooks/index'
import { TableMeeting } from "./TableMeeting"

interface TableHeadModalMeetingProps {
    meeting?: IMeeting
    timeOfEvent: "fullDayMeetings" | "morningMeetings" | "afternoonMeetings";
    data: Record<string, number>
    setData: React.Dispatch<React.SetStateAction<Record<string, number>>>
    isChecked: Record<string, boolean>
    setIsChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    dayIndex: number
}

export const TableHeadModalMeeting: FC<TableHeadModalMeetingProps> = ({
    meeting,
    data,
    setData,
    isChecked,
    setIsChecked,
    timeOfEvent,
    dayIndex
}) => {
    const { currentProject } = useCurrentProject()
    const dayMeeting = currentProject?.schedule[dayIndex]?.date
    return (
        <div className="rounded-lg shadow-md bg-gray-800 overflow-hidden mb-6 transition-all duration-300" >
            <div
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-700 to-gray-800 text-white-50 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
            >
                <span className="text-xl font-semibold flex items-center">
                    <Icon
                        icon="material-symbols:calendar-month"
                        className="mr-2 text-cyan-400"
                        width="24"
                        height="24"
                    />
                    {dayMeeting}
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr className="bg-gray-900">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Schedule
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Room Capacity
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Coffee Break Units
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Coffee Break Price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Audiovisuals
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                HD Delegate.Rate
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Lunch units
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Lunch price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Dinner units
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Dinner price
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                FD Room Rental
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                HD Room Rental
                            </th>
                        </tr>
                    </thead>
                    <TableMeeting
                        meeting={meeting}
                        data={data}
                        setData={setData}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                        timeOfEvent={timeOfEvent}
                    />
                </table>
            </div>
        </div>
    )
}
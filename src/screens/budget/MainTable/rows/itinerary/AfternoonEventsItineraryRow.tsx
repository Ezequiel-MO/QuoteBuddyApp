import { useEffect, useState } from 'react'
import { IEvent } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import accounting from 'accounting'
import { OptionSelect } from '../../multipleOrSingle/OptionSelect'
import { EditableCell } from '../meals_activities/EditableCell'
import { getDayIndex, existActivityItinerary } from "../../../helpers"
import { useCurrentProject } from 'src/hooks'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


interface AfternoonEventsItineraryRowProps {
    items: IEvent[]
    date: string
    pax: number
    selectedEvent: IEvent
    setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent>>
}

export const AfternoonEventsItineraryRow = ({
    items,
    date,
    pax,
    selectedEvent,
    setSelectedEvent
}: AfternoonEventsItineraryRowProps) => {
    const mySwal = withReactContent(Swal)

    const NoEvents = items.length === 0
    if (NoEvents) return null


    const { dispatch, state } = useContextBudget()
    const { currentProject } = useCurrentProject()


    const [nrUnits, setNrUnits] = useState(selectedEvent?.pricePerPerson ? selectedEvent.participants || pax : 1)
    useEffect(() => {
        setNrUnits(selectedEvent?.pricePerPerson ? selectedEvent.participants || pax : 1)
    }, [selectedEvent])

    const dayIndex = getDayIndex(date, state)
    const originalActivity = currentProject.schedule[dayIndex].itinerary.afternoonActivity.events.find(el => el._id === selectedEvent._id)

    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const newValue = e.target.value as string
        const newSelectedEvent =
            items && items.find((item) => item.name === newValue)
        if (newSelectedEvent) {
            setSelectedEvent(newSelectedEvent)
        }
    }

    const handleUpdate = async (newValue: number, typeValue: 'unit' | 'price') => {
        try {
            if (typeValue === 'unit' && newValue > pax) {
                throw Error(
                    'Error! cannot be greater than the total number of passengers.'
                )
            }
            let dayIndex = getDayIndex(date, state)
            existActivityItinerary(dayIndex, state, "afternoonActivity", selectedEvent._id)
            dispatch({
                type: "UPDATE_AFTERNOON_ACTIVITY_ITINERARY",
                payload: {
                    dayIndex,
                    id: selectedEvent._id,
                    key: typeValue === 'unit' ? 'participants' : 'price',
                    value: (!newValue || newValue <= 0) ? 1 : newValue,
                }
            })
            const key = typeValue === 'unit' ? 'participants' : 'price'
            const copySelectedEvent = { ...selectedEvent }
            copySelectedEvent[key] = newValue ? newValue : 1
            setSelectedEvent(copySelectedEvent)
        } catch (error: any) {
            console.log(error)
            await mySwal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonColor: 'green'
            })
        }
    }


    return (
        <tr className={tableRowClasses}>
            <td className={tableCellClasses}>
                {date}
            </td>
            <td>
                {`En Route Itinerary, Afternoon Activity options`}
            </td>
            <td>
                <OptionSelect
                    options={items}
                    value={selectedEvent?.name || ''}
                    handleChange={(e) => handleSelectChange(e)}
                />
            </td>
            <td>
                {
                    selectedEvent.pricePerPerson &&
                    <EditableCell
                        value={selectedEvent?.participants ? selectedEvent.participants : pax}
                        originalValue={originalActivity?.participants || pax}
                        typeValue="unit"
                        onSave={(newValue) => handleUpdate(newValue, 'unit')}
                    />
                }
            </td>
            <td>
                <EditableCell
                    value={selectedEvent.price as number}
                    originalValue={originalActivity?.price || 0}
                    typeValue="price"
                    onSave={(newValue) => handleUpdate(newValue, 'price')}
                />
            </td>
            <td>
                {accounting.formatMoney(
                    (selectedEvent?.price as number) * nrUnits,
                    '€'
                )}
            </td>
        </tr>
    )
}

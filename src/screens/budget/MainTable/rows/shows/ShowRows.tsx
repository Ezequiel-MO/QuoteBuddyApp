import { useState } from 'react'
import { EntertainmentSummaryRow } from './EntertainmentSummaryRow'
import { IEntertainment, IRestaurant } from '../../../../../interfaces'
import { EntertainmentBreakdownRows } from './EntertainmentBreakdownRows'

interface Props {
  date: string
  entertainment: IEntertainment[]
  typeOfEvent: 'lunch' | 'dinner'
  selectedRestaurant: IRestaurant
}

export const ShowRows = ({ date, entertainment, typeOfEvent, selectedRestaurant }: Props) => {
  if (!entertainment) return
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedEntertainment, setSelectedEntertainment] =
    useState<IEntertainment>(entertainment[0])

  const handleEntertainmentChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedEntertainment = entertainment.find(
      (entertainment) => entertainment.name === e.target.value
    ) as IEntertainment

    setSelectedEntertainment(selectedEntertainment)
  }

  return (
    <>
      <EntertainmentSummaryRow
        date={date}
        entertainment={entertainment}
        selectedEntertainment={selectedEntertainment}
        handleChange={handleEntertainmentChange}
        typeOfEvent={typeOfEvent}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <EntertainmentBreakdownRows
        entertainment={selectedEntertainment}
        isOpen={isOpen}
        date={date}
        selectedRestaurant={selectedRestaurant}
        setEntertainment={setSelectedEntertainment}
        typeMeal={typeOfEvent}
      />
    </>
  )
}

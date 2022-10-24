import { useState, useEffect } from 'react'

const useManageTransferOptions = (transfers) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (transfers?.length > 0) {
      const filteredArr = Object.keys(transfers[0]).filter(
        (key) =>
          [
            'city',
            'company',
            '_id',
            'vehicleType',
            'vehicleCapacity',
            'selectedService'
          ].indexOf(key) === -1
      )
      const selectOptions = [
        { transfer_in: 'Transfer In' },
        { transfer_out: 'Transfer Out' },
        { dispo_4h: '4H at disposal' },
        { hextra: 'Overtime' },
        { hextra_night: 'Overtime Night' },
        { dispo_5h_out: '5H at disposal Excursions' },
        { dispo_4h_airport: '4H at disposal start/finish at Airport' },
        { transfer_in_out_night: 'Transfer In/Out Night' },
        { dispo_6h: '6H at disposal' },
        { dispo_6h_night: '6H at disposal Night' },
        { dispo_9h: '9H at disposal Excursions' }
      ]

      const serviceOptions = filteredArr.map((key) => {
        const option = selectOptions.find((option) => option[key])
        return option ? option : { [key]: key }
      })

      setOptions(serviceOptions)
    }
  }, [transfers])

  return { options }
}

export default useManageTransferOptions

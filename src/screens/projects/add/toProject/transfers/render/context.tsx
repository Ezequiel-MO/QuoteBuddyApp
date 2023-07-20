import { createContext, useContext, useState, FC, ReactElement } from 'react'
import { IFreelancer } from '../../../../../../interfaces/freelancer'

interface TransfersContextProps {
	city: string
	setCity: React.Dispatch<React.SetStateAction<string>>
	company: string
	setCompany: React.Dispatch<React.SetStateAction<string>>
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	vehicleCapacity: string
	setVehicleCapacity: React.Dispatch<React.SetStateAction<string>>
	freelancer: IFreelancer | null
	setFreelancer: React.Dispatch<React.SetStateAction<IFreelancer | null>>
	service: string
	setService: React.Dispatch<React.SetStateAction<string>>
}

const TransfersContext = createContext<TransfersContextProps | undefined>(
	undefined
)

interface TransfersProviderProps {
	children: React.ReactNode
}

export const TransfersProvider: FC<TransfersProviderProps> = ({
	children
}): ReactElement => {
	const [city, setCity] = useState('none')
	const [company, setCompany] = useState('none')
	const [open, setOpen] = useState(false)
	const [vehicleCapacity, setVehicleCapacity] = useState('')
	const [freelancer, setFreelancer] = useState<IFreelancer | null>(null)
	const [service, setService] = useState('none')

	return (
		<TransfersContext.Provider
			value={{
				city,
				setCity,
				company,
				setCompany,
				open,
				setOpen,
				vehicleCapacity,
				setVehicleCapacity,
				freelancer,
				setFreelancer,
				service,
				setService
			}}
		>
			{children}
		</TransfersContext.Provider>
	)
}

export function useTransfers() {
	const context = useContext(TransfersContext)
	if (context === undefined) {
		throw new Error('useTransfers must be used within a TransfersProvider')
	}
	return context
}

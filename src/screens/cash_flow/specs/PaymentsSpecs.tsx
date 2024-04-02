import { Spinner } from '@components/atoms'
import { useState } from 'react'
import PaymentsMasterForm from './PaymentsMasterForm'

const PaymentsSpecs = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center">
			{isLoading ? <Spinner /> : <PaymentsMasterForm />}
		</div>
	)
}

export default PaymentsSpecs

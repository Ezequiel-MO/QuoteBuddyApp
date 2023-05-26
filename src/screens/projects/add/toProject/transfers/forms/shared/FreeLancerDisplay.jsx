import React from 'react'
import { Icon } from '@iconify/react'

export const FreelancerDisplay = ({
	freelancerData,
	serviceType,
	removeAction
}) => {
	const freelancer = freelancerData[0]
	const { familyName, fullDayRate, halfDayRate, _id } = freelancer || {}

	const dayRate = serviceType === 'assistance' ? halfDayRate : fullDayRate
	const rateLabel =
		serviceType === 'assistance' ? 'Half Day Rate' : 'Full Day Rate'
	const containerClasses =
		serviceType === 'assistance'
			? 'bg-green-200 p-2 rounded'
			: 'bg-blue-200 p-2 rounded'

	return (
		freelancer && (
			<div
				className={`flex justify-between items-center w-60 mt-2 ${containerClasses}`}
			>
				<label className="text-xl text-rose-500-100">
					<p style={{ fontSize: '18px' }}>
						{`Freelancer: ${familyName}, ${rateLabel}: ${dayRate}€  `}
						<button
							className="text-white font-bold py-2 px-4 rounded"
							onClick={() => removeAction({ id: _id })}
						>
							<Icon icon="fluent:delete-16-regular" color="#ea5933" />
						</button>
					</p>
				</label>
			</div>
		)
	)
}

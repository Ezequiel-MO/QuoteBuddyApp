import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { FreelancerAction } from '../context/contextinterfaces'
import { IFreelancer } from '@interfaces/freelancer'

export const resetFreelancerFilters = (
	dispatch: Dispatch<FreelancerAction>,
	fields: Partial<Record<keyof IFreelancer, any>>
) => {
	resetEntityFilters<IFreelancer>(
		dispatch as Dispatch<any>,
		'freelancer',
		fields
	)
}

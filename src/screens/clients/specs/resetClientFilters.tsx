import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { ClientAction } from '../context/contextinterfaces'
import { IClient } from '@interfaces/client'

export const resetClientFilters = (
	dispatch: Dispatch<ClientAction>,
	fields: Partial<Record<keyof IClient, any>>
) => {
	resetEntityFilters<IClient>(dispatch as Dispatch<any>, 'client', fields)
}

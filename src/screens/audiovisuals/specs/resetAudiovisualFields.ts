import { Dispatch } from 'react'
import { resetEntityFilters } from 'src/helper/forms/resetEntityFilters'
import { AudiovisualAction } from '../context/contextinterfaces'
import { IAudiovisual } from '@interfaces/audiovisual'

export const resetAudiovisualFilters = (
	dispatch: Dispatch<AudiovisualAction>,
	fields: Partial<Record<keyof IAudiovisual, any>>
) => {
	resetEntityFilters<IAudiovisual>(
		dispatch as Dispatch<any>,
		'audiovisual',
		fields
	)
}

import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IAudiovisual } from '@interfaces/audiovisual'
import { useAudiovisual } from '../context/AudiovisualsContext'

interface AudiovisualListItemProps {
	item: IAudiovisual
	canBeAddedToProject: boolean
}

export const AudiovisualListItem: FC<AudiovisualListItemProps> = ({
	item: audiovisual,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useAudiovisual()
	const navigate = useNavigate()

	const handleNavigateToRestaurantSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_AUDIOVISUAL',
			payload: audiovisual
		})
		navigate('/app/audiovisual/specs')
	}

	return (
		<tr className={listStyles.tr}>
			<td
				onClick={handleNavigateToRestaurantSpecs}
				className="hover:text-blue-600 hover:underline cursor-pointer"
			>
				{audiovisual?.name}
			</td>
			<td>{audiovisual?.city}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint={'audiovisuals'}
					ID={audiovisual?._id}
					setter={(updatedAudiovisuals: IAudiovisual[]) =>
						dispatch({
							type: 'SET_AUDIOVISUALS',
							payload: updatedAudiovisuals
						})
					}
					items={state.audiovisuals || []}
				/>
			</td>
		</tr>
	)
}

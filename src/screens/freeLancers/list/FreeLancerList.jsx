import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import { useGetFreeLancers, useCurrentProject } from '../../../hooks'
import { FreeLancerListItem } from '../'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'

export const FreeLancerList = () => {
	const navigate = useNavigate()
	const [freeLancer] = useState({})
	const { freelancers, setFreelancers, isLoading } = useGetFreeLancers()
	const [foundFreelancers, setFoundFreelancers] = useState([])
	const { currentProject, addMeetGreetOrDispatch, addAssistance } =
		useCurrentProject()

	useEffect(() => {
		setFoundFreelancers(freelancers)
	}, [freelancers])

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	const freeLancersList = foundFreelancers?.map((el) => (
		<FreeLancerListItem
			key={el._id}
			freeLancer={el}
			freelancers={freelancers}
			setFreelancers={setFreelancers}
			canBeAddedToProject={currentProjectIsLive}
			addMeetGreetOrDispatch={addMeetGreetOrDispatch}
			addAssistance={addAssistance}
		/>
	))

	const handleClick = () =>
		navigate('/app/freelancer/specs', { state: { freeLancer } })

	return (
		<>
			<ListHeader title="Freelancers" handleClick={handleClick} />

			{isLoading ? (
				<Spinner />
			) : (
				<table className="w-full p-5">
					<TableHeaders headers="freelancer" />
					{freeLancersList}
				</table>
			)}
		</>
	)
}

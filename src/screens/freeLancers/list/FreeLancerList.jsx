import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import {
	useGetFreelancers,
	useCurrentProject,
	useFilterList
} from '../../../hooks'
import { FreeLancerListItem } from '../'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'

export const FreeLancerList = () => {
	const navigate = useNavigate()
	const [freeLancer] = useState({})
	const { freelancers, setFreelancers, isLoading } = useGetFreelancers()
	const { currentProject, addMeetGreetOrDispatch, addAssistance } =
		useCurrentProject()

	useEffect(() => {
		setFoundFreelancers(freelancers)
	}, [freelancers])

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	const filterFunction = (data, value) =>
		data.firstName.toLowerCase().includes(value.toLowerCase()) ||
		data.familyName.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundFreelancers,
		searchTerm: searchItem,
		filterList,
		setData: setFoundFreelancers
	} = useFilterList(freelancers, filterFunction)

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
			<ListHeader
				title="Freelancers"
				handleClick={handleClick}
				filterList={filterList}
				searchItem={searchItem}
			/>

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

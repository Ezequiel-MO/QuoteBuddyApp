import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import { useCurrentProject, useFilterList } from '../../../hooks'
import { FreeLancerListItem } from '..'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useFetchFreelancers } from 'src/hooks/fetchData'
import { listStyles } from 'src/constants/listStyles'
import { IFreelancer } from '@interfaces/freelancer'

export const FreeLancerList = () => {
	const navigate = useNavigate()
	const [freeLancer] = useState({} as IFreelancer)
	const { freelancers, setFreelancers, isLoading } = useFetchFreelancers({})
	const { currentProject } = useCurrentProject()

	useEffect(() => {
		setFoundFreelancers(freelancers)
	}, [freelancers])

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	const filterFunction = (data: IFreelancer, value: string) =>
		data.firstName.toLowerCase().includes(value.toLowerCase()) ||
		data.familyName.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundFreelancers,
		searchTerm: searchItem,
		filterList,
		setData: setFoundFreelancers
	} = useFilterList(freelancers, filterFunction)

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
				<table className={listStyles.table}>
					<TableHeaders headers="freelancer" />
					{foundFreelancers?.map((el) => (
						<FreeLancerListItem
							key={el._id}
							freeLancer={el}
							freelancers={freelancers}
							setFreelancers={setFreelancers}
							canBeAddedToProject={currentProjectIsLive}
						/>
					))}
				</table>
			)}
		</>
	)
}

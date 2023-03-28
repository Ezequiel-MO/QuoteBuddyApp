import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TableHeaders, SearchInput } from "../../../ui"
import { CreateFreelancerButton } from "../renders/CreateFreelancerButton"
import { useGetFreeLancers ,useCurrentProject  } from "../../../hooks"
import { FreeLancerListItem } from "../"
import { Spinner } from "../../../components/atoms"


export const FreeLancerList = () => {
    const navigate = useNavigate()
    const [freeLancer] = useState({})
    const { freelancers, setFreelancers, isLoading } = useGetFreeLancers()
    const [foundFreelancers, setFoundFreelancers] = useState([])
    const { currentProject , addMeetGreetOrDispatch , addAssistance } = useCurrentProject()

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



    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mr-8 ml-8 relative">
                <div className="flex flex-col w-full">
                    <h1 className="text-2xl">Freelancer List</h1>
                    <div className="flex flex-row justify-start items-center mb-1">
                        <CreateFreelancerButton
                            freeLancer={freeLancer}
                            navigate={navigate}
                        />
                    </div>
                </div>
            </div>
            {
                isLoading ?
                    <Spinner /> :
                    <table className="w-full p-5">
                        <TableHeaders headers="freelancer" />
                        {freeLancersList}
                    </table>
            }
        </>
    )
}

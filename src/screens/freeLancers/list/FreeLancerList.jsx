import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateFreelancerButton } from "../renders/CreateFreelancerButton"

export const FreeLancerList = () => {
    const navigate = useNavigate()
    const [freeLancer] = useState({})


    return (
        <>
            <h1>Cooming soon...</h1>
            <CreateFreelancerButton
                freeLancer={freeLancer}
                navigate={navigate}
            />
        </>
    )
}

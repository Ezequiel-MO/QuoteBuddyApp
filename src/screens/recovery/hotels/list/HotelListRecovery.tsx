import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApiFetch } from 'src/hooks/fetchData/useApiFetch'
import { IHotel } from '@interfaces/hotel'
import { HotelListRecoveryItem } from './HotelListRecoveryItem'
import { useAuth } from 'src/context/auth/AuthProvider'

export const HotelListRecovery = () => {

    const { data, dataLength, isLoading, setData } = useApiFetch<IHotel[]>('hotels/isDeleted/true')
    
    //esto sirve para proteger la ruta , si el usuario quiere insgresar y el usuario no es admin(version Beta)
    const navigate = useNavigate()
    const { auth } = useAuth()
    useEffect(() => {
        if(auth.role !== 'admin'){
            navigate('/app')
        }
    }, [])

    return (
        <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4">
                <div className="flex flex-col w-full">
                    <h1 className="text-2xl">
                        Hotels
                    </h1>
                </div>
            </div>
            <hr />
            <HotelListRecoveryItem isLoading={isLoading} hotels={data} />
        </>
    )
}
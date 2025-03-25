import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from 'src/context/auth/AuthProvider'


export const DBRestoreCenter = () => {

    const navigate = useNavigate()

    const { auth } = useAuth()

    if(auth.role !== 'admin' ){
        return null
    }

    return (
        <div
            className="text-white-100 bg-black-100 rounded bg-slate-500 p-3 m-1 mt-3 h-48 min-h-full w-60 card"
            onClick={() => {
                setTimeout(() => {
                    navigate('/app/hotel_recovery')
                }, 300)
            }}
        >
            <div className="indent-3 flex items-center text-white-100 bg-black-100 h-fit   mt-3">
                <Icon
                    icon="hugeicons:data-recovery"
                    width="22"
                    height="22"
                    inline={true}
                />
                <p>DB Restore Center</p>
            </div>
            <div>
                <p className="text-base pt-3 pl-0">
                    <i>Manage all vendors, Projects and more to retrieve from DataBase</i>
                </p>
            </div>
        </div>
    )

}
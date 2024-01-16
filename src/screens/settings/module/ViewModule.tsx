import { ViewModuleUpload } from "./ViewModuleUpload"
import { useGetSetting } from "src/hooks/useGetSetting"
import { Spinner } from 'src/components/atoms'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { ISetting } from "src/interfaces"





export const ViewModule = () => {
    const { setting, setSetting, isLoading, setIsLoading, refreshSetting } = useGetSetting()

    const handleSubmitView = async (value: boolean) => {
        setIsLoading(true)
        try {
            const json: any = {}
            json.viewFinancial = value
            await baseAPI.patch(`settings/${setting?._id}`, json)
            toast.success("View module  updated", toastOptions)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            refreshSetting()
        }
    }

    return (
        <div>
            {
                isLoading ?
                    <div className={`flex flex-col items-center p-4 border-2 border-gray-600 bg-gray-800  rounded-md shadow-md space-y-2`}>
                        <Spinner />
                    </div>
                    :
                    <ViewModuleUpload setting={setting as ISetting} onUpload={handleSubmitView} />
            }
        </div>
    )
}
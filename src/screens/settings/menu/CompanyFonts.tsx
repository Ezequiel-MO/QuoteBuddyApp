import { FC } from "react"
import { FontsUpload } from "../FontsUpload"
import { ColorsUpload } from "../ColorsUpload"
import { useGetSetting } from "src/hooks/useGetSetting"
import { Spinner } from 'src/components/atoms'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'
import { ISetting } from "src/interfaces/setting"

export const CompanyFonts: FC = () => {
    const { setting, setSetting, isLoading, setIsLoading, refreshSetting } = useGetSetting()

    const onUpload = async (values: string[]) => {
        setIsLoading(true)
        try {
            const json = { fonts: values }
            await baseAPI.patch(`settings/${setting?._id}`, json)
            toast.success("Fonts Company  updated", toastOptions)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            refreshSetting()
        }
    }

    const onDeleted = async (values: string[]) => {
        setIsLoading(true)
        try {
            const json = { fonts: values }
            await baseAPI.patch(`settings/${setting?._id}`, json)
            toast.success("Deleted Font successfully ", toastOptions)
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
                    <FontsUpload onUpload={onUpload} setting={setting} onDeleted={onDeleted} />
            }
        </div>
    )
}
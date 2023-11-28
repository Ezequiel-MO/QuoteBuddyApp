import { FC } from "react"
import { ColorsUpload } from "../ColorsUpload"
import { useGetSetting } from "src/hooks/useGetSetting"
import { Spinner } from 'src/components/atoms'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'
import { IColorPalette, ISetting } from "src/interfaces/setting"


export const CompanyColors: FC = () => {
    const { setting, setSetting, isLoading, setIsLoading, refreshSetting } = useGetSetting()

    const handleSubmitColors = async (values: IColorPalette) => {
        setIsLoading(true)
        try {
            const json = { colorPalette: values }
            await baseAPI.patch(`settings/${setting?._id}`, json)
            toast.success("Colors Company  updated" , toastOptions)
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
                    <ColorsUpload submitForm={handleSubmitColors} settingColors={setting?.colorPalette} />
            }
        </div>
    )
}
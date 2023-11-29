import { FC } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { LogoUpload } from '../LogoUpload'
import { Settings } from '../Settings'
import baseAPI from 'src/axios/axiosConfig'
import { Spinner } from 'src/components/atoms'
import { useGetSetting } from 'src/hooks/useGetSetting'

export const CompanyLogo: FC = () => {
	const { setting, isLoading, setIsLoading, refreshSetting } = useGetSetting()

	const onUpload = async (file: File) => {
		setIsLoading(true)
		let formData = new FormData()
		formData.append('logo', file)
		formData.append('typeImage', 'logo')
		formData.append('deletedImage', setting?.logo as string)

		try {
			await baseAPI.patch(`settings/logo/${setting?._id}`, formData)
			toast.success('Logo Company updated', toastOptions)
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
			refreshSetting()
		}
	}

	return (
		<div>
			<Settings />
			{isLoading ? (
				<Spinner />
			) : (
				<LogoUpload onUpload={onUpload} setting={setting} />
			)}
		</div>
	)
}

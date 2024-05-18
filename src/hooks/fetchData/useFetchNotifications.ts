import { INotafication } from '@interfaces/notification'
import { IAccManagerNotification } from "@interfaces/accManagerNotification"
import { useEffect, useState } from 'react'
import { useApiFetch } from './useApiFetch'

interface Props {
    params: string
    forceRefresh?: number
}

export const useFetchNotifications = ({ params, forceRefresh }: Props) => {
    const [url, setUrl] = useState<string>(`notifications/${params}`)

    useEffect(() => {
        setUrl(`notifications/${params}`)
    }, [params])
    const { data, isLoading, setData } = useApiFetch<INotafication[] | IAccManagerNotification[]>(url, forceRefresh)
    const notifications = data

    return { notifications, isLoading, setData }
}

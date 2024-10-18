import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { toastOptions } from 'src/helper/toast'

export const useOnSuccessFormSubmit = (
    title: string,
    slug: string,
    update: boolean,
    dispatch: React.Dispatch<any>,
    setForceRefresh: React.Dispatch<React.SetStateAction<number>>
) => {
    const navigate = useNavigate()

    const onSuccess = useCallback(() => {
        toast.success(
            `${`${title} ${update ? 'Updated' : 'Created'}`}`,
            toastOptions
        )
        setForceRefresh(prev => prev + 1)
        dispatch({
            type: 'TOGGLE_UPDATE',
            payload: false
        })
        setTimeout(() => {
            navigate(`/app/${slug}`)
        }, 2000)
    }, [navigate, title, slug, update])

    return { onSuccess }
}
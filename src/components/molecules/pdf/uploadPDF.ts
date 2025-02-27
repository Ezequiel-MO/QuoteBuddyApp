import baseAPI from 'src/axios/axiosConfig'
import { logger } from 'src/helper/debugging/logger'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { toast } from 'react-toastify'


export const uploadPDF = async (
    routeUpload: string,
    entityId: string,
    pdfUrls: string[],
    fieldName: string,
    entityType:string
) => {
    logger.info('Uploading PDF', { routeUpload, entityId, pdfUrls })
    if (!pdfUrls || pdfUrls.length === 0) {
        return
    }

    const pdfFiles = await Promise.all(
        pdfUrls.map(async (item) => {
            const response = await fetch(item);
            const blob = await response.blob();
            return new File([blob], 'image.pdf', { type: 'application/pdf' })
        })
    )

    const formData = new FormData()
    pdfFiles.forEach((file) => {
        formData.append(fieldName, file)
    })
    try {
        await baseAPI.patch(`${routeUpload}/${entityId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error: any) {
        console.log(error)
        toast.error(
            `Failed to add PDF ${entityType.slice(0, -1)} , ${error.response.data.message || ""}`,
            errorToastOptions,
        )
        logger.logErrorToDatabase(error.response.data.message, `validation of the  ${entityType} add PDF, in updloadPDF.ts`, "info")
        throw error
    }
}
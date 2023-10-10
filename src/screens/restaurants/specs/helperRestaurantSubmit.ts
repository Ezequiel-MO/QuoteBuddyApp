

export const saveFilesImagesAndPdf = async (files: File[]) => {
    const filesImages = []
    const filesPdf = []
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type === "image/jpeg" || files[i].type === "image/png") {
                filesImages.push(files[i])
            }
            if (files[i].type === "application/pdf") {
                filesPdf.push(files[i])
            }
        }
    }
    return await { filesImages, filesPdf }
}
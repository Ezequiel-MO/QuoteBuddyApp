import { useState, useEffect, RefObject, FC } from 'react'
import { ImageList, ImageListItem } from '@mui/material'
import { Icon } from '@iconify/react'
import { ModalComponent } from '../atoms'
import { ViewPdfModal } from "./ViewPdfModal"
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../helper/toast'
import { pdfjs } from 'react-pdf'
import { Viewer } from '@react-pdf-viewer/core'
import pdfLogo from '../../assets/pdf_logo.jpg'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`; // para que se visualice el pdf

interface IAddPdfModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void
    setSelectedFiles: (files: File[]) => void
    selectedFiles: File[]
    fileInput: RefObject<HTMLInputElement>
    multipleCondition: boolean
}

interface IPdfUrl {
    url: string
    name: string
}

export const AddPdfModal: FC<IAddPdfModalProps> = ({
    open,
    setOpen,
    handleFileSelection,
    setSelectedFiles,
    selectedFiles,
    fileInput,
    multipleCondition
}) => {
    const [pdfPreviewUrls, setPdfPreviewUrls] = useState<IPdfUrl[]>([])
    const [openModalView, setOpenModalView] = useState(false)
    const [pdfView, setPdfView] = useState<string>()
    const [countFiltes, setCountFiles] = useState<number>()

    useEffect(() => {
        if (open && !multipleCondition && selectedFiles.length > 1) {
            selectedFiles.pop()
            console.log(open)
            toast.error("only one pdf can be uploaded", errorToastOptions)
            return
        }
        const pdfUrls = selectedFiles.map((el): IPdfUrl => {
            return {
                url: URL.createObjectURL(el),
                name: el.name
            }
        })
        setPdfPreviewUrls(pdfUrls)
        setCountFiles(selectedFiles.length)
    }, [selectedFiles, open])

    const handleViewPdf = (urlPdf: string) => {
        console.log(urlPdf)
        setOpenModalView(true)
        setPdfView(urlPdf)
    }

    const handleDeletedImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, pdfUrl: IPdfUrl) => {
        const newPdfUrls = pdfPreviewUrls.filter(el => el.url !== pdfUrl.url)
        const newFilesPdfs = selectedFiles.filter((el) => el.name !== pdfUrl.name) // EL ANY HAY QUE REVISARLO
        setPdfPreviewUrls(newPdfUrls)
        setSelectedFiles(newFilesPdfs)
    }


    return (
        <>
            <ViewPdfModal open={openModalView} setOpen={setOpenModalView} pdfUrl={pdfView as string} />
            <ModalComponent open={open} setOpen={setOpen}>
                <ImageList sx={{ width: 590, height: 450 }} cols={3} rowHeight={164}>
                    {pdfPreviewUrls?.map((item, index) => (
                        <ImageListItem key={index} style={{ position: 'relative', cursor: "zoom-in" }} onClick={() => handleViewPdf(item.url)} >
                            <div
                                style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    color: 'red',
                                    margin: '1px',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeletedImage(e, item)
                                }}
                            >
                                <Icon icon="material-symbols:cancel" width="30" />
                            </div>
                            <img src={pdfLogo} loading="lazy" />
                            {/* <Viewer fileUrl={item.url}  /> */}
                        </ImageListItem>
                    ))}
                </ImageList>
                <fieldset className="grid grid-cols-2 gap-4">
                    <div
                        className="flex align-center justify-start"
                        style={{ marginTop: '10px' }}
                    >
                        <input
                            style={{ color: 'transparent' }}
                            id="file-upload"
                            type="file"
                            ref={fileInput}
                            name="pdfContentUrl"
                            accept='application/pdf'
                            multiple={multipleCondition}
                            onChange={(e) => handleFileSelection(e)}
                        />
                        <span style={{ position: 'absolute', marginLeft: '100px' }}>
                            {`${countFiltes} files selected for upload`}
                        </span>
                        <button
                            style={{ position: 'absolute', right: '60px' }}
                            className="cursor-pointer w-32 h-8  hover:bg-gray-600 bg-green-200 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
                            type="button"
                            onClick={() => setOpen(false)}
                        >
                            ADD PDF/S
                        </button>
                    </div>
                </fieldset>
            </ModalComponent>
        </>
    )
}
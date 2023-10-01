import { FC } from 'react'
import { ModalComponent } from '../atoms'
import { pdfjs } from 'react-pdf'
import { Viewer } from '@react-pdf-viewer/core' // se instala para ver el pdf en el navegador
import type { PageLayout } from '@react-pdf-viewer/core' // esto es para el "const pageLayout" (si es un jsx esto no es nesario )
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout' // plugin se react-pdf-viewer/core (hay que instarlarlo)
import { searchPlugin } from '@react-pdf-viewer/search' // plugin se eact-pdf-viewer/core
import { zoomPlugin } from '@react-pdf-viewer/zoom' // plugin se eact-pdf-viewer/core

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`; // para que se visualice el pdf

interface IViewPdfModaProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    pdfUrl: string
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxHeight: '100vh',
    overflow: 'hidden',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
}


const pageLayout: PageLayout = {
    transformSize: ({ size }) => ({
        height: size.height + 30,
        width: size.width + 30,
    }),
}

export const ViewPdfModal: FC<IViewPdfModaProps> = ({ pdfUrl, open, setOpen }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const searchPluginInstance = searchPlugin()
    const zoomPluginInstance = zoomPlugin()

    return (
        <ModalComponent open={open} styleModal={styleModal} setOpen={setOpen}>
            <div
                style={{ height: '95vh', width: "60vw" }}
            >
                <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} pageLayout={pageLayout} />
            </div>
        </ModalComponent>
    )
}

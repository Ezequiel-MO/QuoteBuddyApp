import { useRef, useState, useEffect, useMemo, FC } from 'react'
import { ImageList, ImageListItem } from '@mui/material'
import { Icon } from '@iconify/react'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../helper/toast'
import { ModalComponent } from '../atoms'
import { ViewPdfModal } from './ViewPdfModal'
import pdfLogo from '../../assets/pdf_logo.jpg'

interface ModalPdflProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	multipleCondition: boolean
	nameScreen: string
	keyModel: string
	initialValues: any // ESTO HAY QUE VER  COMO SE PUEDE MODIFICAR PARA QUE NO SEA ANY
	screen: any // ESTO HAY QUE VER  COMO SE PUEDE MODIFICAR PARA QUE NO SEA ANY
	submitForm: (
		values: { [key: string]: any },
		files: File[],
		url: string,
		update: boolean
	) => void
}

interface IPdfUrl {
	url: string
	name: string
}

export const ModalPdf: FC<ModalPdflProps> = ({
	open,
	setOpen,
	multipleCondition,
	nameScreen,
	initialValues,
	keyModel,
	screen,
	submitForm
}) => {
	const fileInput = useRef<HTMLInputElement>(null)
	const [openModalView, setOpenModalView] = useState(false)
	const [pdfView, setPdfView] = useState<string>()
	//
	const [pdfPreviewUrls, setPdfPreviewUrls] = useState<IPdfUrl[]>([])
	const [filesPdfs, setFilesPdfs] = useState<any>([]) //ESTE ANY QUE REVISARLO
	const [deletedPdf, setDeletedPdf] = useState<string[]>([])
	const update = Object.keys(screen)?.length > 0 ? true : false

	useEffect(() => {
		setFilesPdfs([])
		setDeletedPdf([])
		if (update && screen[keyModel]?.length > 0) {
			const pdfs: string[] = [...screen[keyModel]]
			const pdfUrls = pdfs.map((el) => {
				return {
					url: el,
					name: el
				}
			})
			setPdfPreviewUrls(pdfUrls)
		}
	}, [screen, open])

	const handleViewPdf = (urlPdf: string) => {
		setOpenModalView(true)
		setPdfView(urlPdf)
	}

	const handleDeletedImage = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		pdfUrl: IPdfUrl
	) => {
		const newPdfUrls = pdfPreviewUrls.filter((el) => el.url !== pdfUrl.url)
		const newFilesPdfs = filesPdfs.filter((el: any) => el.name !== pdfUrl.name) // EL ANY HAY QUE REVISARLO
		setPdfPreviewUrls(newPdfUrls)
		setDeletedPdf(newFilesPdfs)
		//si es un pdf que sea de "amazon web service" lo mando al estado "deletedPdf"
		if (pdfUrl?.url.includes('amazonaws')) {
			setDeletedPdf([...deletedPdf, pdfUrl?.url])
		}
	}

	const handleUploadPdf = () => {
		if (fileInput && fileInput.current && fileInput.current.files) {
			if (!multipleCondition && pdfPreviewUrls.length > 0) {
				return toast.error('only one pdf can be uploaded', errorToastOptions)
			}
			const files: File[] = Array.from(fileInput.current.files)
			const pdfUrls = files.map((file) => {
				return {
					url: URL.createObjectURL(file),
					name: file.name
				}
			})
			setPdfPreviewUrls([...pdfPreviewUrls, ...pdfUrls])
			setFilesPdfs([...filesPdfs, ...files])
		}
	}

	//Guardo en un array lo que tiene el estado "pdfPreviewUrls" las url que tiene "amazon" con el useMemo
	const pdfContentUrl = useMemo(() => {
		return pdfPreviewUrls
			.map((el) => {
				if (el?.url.includes('amazon')) {
					return el.url
				}
			})
			.filter((el) => el)
	}, [pdfPreviewUrls])

	return (
		<>
			<ViewPdfModal
				open={openModalView}
				setOpen={setOpenModalView}
				pdfUrl={pdfView as string}
			/>
			<ModalComponent open={open} setOpen={setOpen}>
				<ImageList sx={{ width: 590, height: 450 }} cols={3} rowHeight={164}>
					{pdfPreviewUrls?.map((item, index) => (
						<ImageListItem
							key={index}
							style={{ position: 'relative', cursor: 'zoom-in' }}
							onClick={() => handleViewPdf(item.url)}
						>
							<div
								style={{
									position: 'absolute',
									cursor: 'pointer',
									color: 'red',
									margin: '1px'
								}}
								onClick={(e) => {
									e.stopPropagation()
									handleDeletedImage(e, item)
								}}
							>
								<Icon icon="material-symbols:cancel" width="30" />
							</div>
							{<img src={pdfLogo} loading="lazy" />}
						</ImageListItem>
					))}
				</ImageList>
				<div className="flex align-center justify-end p-4">
					<Formik
						initialValues={initialValues}
						onSubmit={(values) => {
							values['imageContentUrl'] = pdfContentUrl
							values['deletedImage'] = deletedPdf
							submitForm(values, filesPdfs ?? [], `${nameScreen}/pdf`, update)
						}}
					>
						{() => (
							<div>
								<Form>
									<fieldset className="grid grid-cols-2 gap-4">
										<div className="flex align-center justify-start">
											<input
												style={{ color: 'transparent' }}
												id="file-upload"
												type="file"
												ref={fileInput}
												name="pdfContentUrl"
												multiple={multipleCondition}
												onChange={handleUploadPdf}
												accept="application/pdf"
											/>
											<span style={{ position: 'absolute', marginTop: '30px' }}>
												{`${filesPdfs.length} files selected for upload`}
											</span>
										</div>
										<input
											type="submit"
											className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value="Edit now"
										/>
									</fieldset>
								</Form>
							</div>
						)}
					</Formik>
					{/* <button type='button' onClick={() => console.log({pdfContentUrl})}>Ver consola</button> */}
				</div>
			</ModalComponent>
		</>
	)
}

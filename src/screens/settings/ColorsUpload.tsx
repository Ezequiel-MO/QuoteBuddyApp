import { useState, useEffect, FormEvent, FC, ChangeEvent } from 'react'
import { Icon } from '@iconify/react'
import { SubmitInput } from 'src/components/atoms'
import { IColorPalette, ISetting } from 'src/interfaces/setting'

interface ColorsUploadProps {
	settingColors: IColorPalette | undefined
	submitForm: (values: IColorPalette) => void
}

export const ColorsUpload: FC<ColorsUploadProps> = ({
	submitForm,
	settingColors
}) => {
	const [data, setData] = useState<IColorPalette>({
		primary: '',
		secundary: '',
		tertiary: ''
	})

	useEffect(() => {
		if (settingColors) {
			setData(settingColors)
		}
	}, [settingColors])

	const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
		setData({
			...data,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmitFormColors = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		submitForm(data)
	}

	return (
		<div
			className={`flex flex-col items-center p-4 border-2 border-gray-600 bg-gray-800  rounded-md shadow-md space-y-2 overflow-hidden relative`}
		>
			<h1 className="self-start text-xl">
				<span className="text-primary">Colors Palette</span>
			</h1>
			<form onSubmit={handleSubmitFormColors}>
				<ul className="list-disc  list-outside px-16 py-3  border-2 border-gray-600 bg-slate-700  rounded-xl shadow-md space-y-2">
					<li>
						<div className="flex items-center space-x-2 mb-[15px]">
							<span>Primary</span>
							<input
								type="color"
								className="w-12 h-6 cursor-pointer"
								name="primary"
								id="1"
								value={data.primary}
								onChange={handleChangeColor}
							/>
							<Icon className="w-5 h-5" icon="pepicons-pop:color-picker" />
						</div>
					</li>
					<li>
						<div className="flex items-center space-x-2 mb-[15px]">
							<span>Secondary</span>
							<input
								type="color"
								className="w-12 h-6 cursor-pointer"
								name="secundary"
								value={data.secundary}
								onChange={handleChangeColor}
							/>
							<Icon className="w-5 h-5" icon="pepicons-pop:color-picker" />
						</div>
					</li>
					<li>
						<div className="flex items-center space-x-2">
							<span>Tertiary</span>
							<input
								type="color"
								className="w-12 h-6 cursor-pointer"
								name="tertiary"
								value={data.tertiary}
								onChange={handleChangeColor}
							/>
							<Icon className="w-5 h-5" icon="pepicons-pop:color-picker" />
						</div>
					</li>
				</ul>
				<div className="text-center">
					<SubmitInput update={true} title="Setting Colors" />
				</div>
			</form>
		</div>
	)
}

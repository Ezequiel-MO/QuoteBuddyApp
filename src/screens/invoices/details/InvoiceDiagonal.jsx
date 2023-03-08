export const InvoiceDiagonal = () => {
	return (
		<div>
			<svg
				fill="currentColor"
				viewBox="0 0 100 100"
				className="absolute right-0 bottom-0 left-0 text-white-50 z-0"
			>
				<polygon id="diagonal" points="0,90 100,65 100,100 0,100" />
				<text x="52" y="85" className="text-black-50 text-[2px] font-bold">
					Cutting Edge Events S.L
				</text>
				<text
					x="52"
					y="88"
					className="text-black-50 text-[2px] tracking-tight leading-none"
				>
					Avda. Via Augusta 12-25, 08174, Sant Cugat del Vallès
				</text>
				<text
					x="52"
					y="91"
					className="text-black-50 text-[2px] tracking-tighter leading-none"
				>
					CIF: B97963813
				</text>
				<text
					x="52"
					y="94"
					className="text-black-50 text-[2px] tracking-tighter leading-none"
				>
					Travel Agency Licence Code: CV-m1210 - V. ROI code ESB97963813
				</text>
				<text
					x="52"
					y="97"
					className="text-black-50 text-[2px] tracking-tighter leading-none"
				>
					Registro Mercantil de Barcelona, Volum 46063, Foli 168, Full B 508314,
					Inscripció 2
				</text>
			</svg>
		</div>
	)
}

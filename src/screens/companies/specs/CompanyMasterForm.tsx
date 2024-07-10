import React, { useState, useEffect, FC } from 'react'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { CompanyFormFields } from './CompanyFormFields'
import { useCompanyData } from './useCompanyData'
import { useImageState } from '../../../hooks'
import { SubmitInput, ShowImagesButton } from '../../../components/atoms'
import { IClientCompany } from 'src/interfaces/clientCompany'
import { IClient } from '@interfaces/client'

const CompanyMasterForm = () => {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<CompanyFormFields />
			</form>
		</>
	)
}

export default CompanyMasterForm

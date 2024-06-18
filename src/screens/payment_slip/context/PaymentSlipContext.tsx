import React, { createContext, useContext, useState, useEffect, useReducer, ReactNode, FC } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchProjects } from "src/hooks/fetchData/useFetchProjects"
import { paymentSlipReducer } from "./PaymentSlipReducer"
import { IProject } from "@interfaces/project"
import { PaymentSlipActions } from "./interfaces"
import { ICollectionFromClient } from '@interfaces/collectionFromClient'


interface IPaymentSlipContext {
    stateProject: IProject | null
    isLoading: boolean
    setForceRefresh: React.Dispatch<React.SetStateAction<number>>
    dispatch: React.Dispatch<PaymentSlipActions>
    isUpdate: boolean
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    collectionFromClient: ICollectionFromClient | null
    setCollectionFromClient: React.Dispatch<React.SetStateAction<ICollectionFromClient>>
}

interface PaymentSlipProviderProps {
    children: ReactNode;
}

// Valor predeterminado del contexto y creación del contexto
const defaultValue: IPaymentSlipContext = {
    stateProject: null,
    isLoading: true,
    setForceRefresh: () => { },
    dispatch: () => { },
    isUpdate: false,
    setIsUpdate: () => { },
    collectionFromClient: null,
    setCollectionFromClient: () => { }
}

const PaymentSlipContext = createContext<IPaymentSlipContext>(defaultValue) // creo el context

// con esto puedo exportar  el hook personalizado para usar el context que cree
export const usePaymentSlip = () => useContext(PaymentSlipContext)

export const PaymentSlipProvider: FC<PaymentSlipProviderProps> = ({ children }) => {
    const { projectId } = useParams<{ projectId: string }>()

    const [forceRefresh, setForceRefresh] = useState(0)
    const { isLoading, project } = useFetchProjects({ id: projectId, forceRefresh })

    const [state, dispatch] = useReducer(paymentSlipReducer, project || {} as IProject)

    const [isUpdate, setIsUpdate] = useState(false)
    const [collectionFromClient, setCollectionFromClient] = useState<ICollectionFromClient>({} as ICollectionFromClient)

    useEffect(() => {
        dispatch({
            type: "SET_PROJECT",
            payload: {
                project: project as IProject
            }
        })
    }, [project, projectId])


    return (
        <PaymentSlipContext.Provider
            value={{
                stateProject: state,
                isLoading,
                setForceRefresh,
                dispatch,
                isUpdate,
                setIsUpdate,
                collectionFromClient,
                setCollectionFromClient
            }}>
            {children}
        </PaymentSlipContext.Provider>
    )
}


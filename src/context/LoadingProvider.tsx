import React, { createContext, useContext, useState, ReactNode, FC } from 'react'


interface ILoadingContextType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

interface LoadingProviderProps {
    children: ReactNode;
}




// Valor predeterminado del contexto y creación del contexto
const defaultValue: ILoadingContextType = {
    isLoading: false,
    setIsLoading: () => { },
}
const LoadingContext = createContext<ILoadingContextType>(defaultValue) // creo el context


//exporto el hook personalizado para usar el context que cree
export const useLoading = () => useContext(LoadingContext) 

export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}
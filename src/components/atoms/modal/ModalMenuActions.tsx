import { FC, useEffect, useState, useRef } from "react"
import { Icon } from "@iconify/react"

interface ModalMenuActionsProps<T extends { _id?: string }> {
    item: T;
    children: React.ReactNode
}

export const ModalMenuActions = <T extends { _id?: string }>({
    item,
    children
}: ModalMenuActionsProps<T>) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleToggleMenu = () => setIsMenuOpen((prev) => !prev)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (target.id !== item._id && target.role !== "menuitem") {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [item._id])

    const menuRef = useRef<HTMLDivElement | null>(null)

    //useEffect para que suba la pantalla del navegador si el menu falta contenido para mostrar(Si el menú está muy abajo)
    useEffect(() => {
        if (isMenuOpen && menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect()
            const bottomSpace = window.innerHeight - rect.bottom
            // Si el menú está muy abajo, desplazamos la pantalla
            // console.log(bottomSpace)
            if (bottomSpace < 70) {
                window.scrollBy({ top: 200, behavior: 'smooth' })
            }
        }
    }, [isMenuOpen])

    return (
        <div className="relative">
            <Icon
                id={item._id}
                icon="mdi:dots-vertical"
                className="text-xl cursor-pointer"
                onClick={handleToggleMenu}
            />

            <div
                className={`absolute text-left transition-all duration-300 
                    ${!isMenuOpen ? "max-h-0 opacity-0 scale-y-0" : "max-h-[800px] opacity-100 scale-y-100"}`}
            >
                <div
                    ref={menuRef} // sirve para el  useEffect de subir la pantalla
                    className="z-50 origin-top-right absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
                >
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
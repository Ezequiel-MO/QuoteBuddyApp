
export interface IColorPalette {
    primary:string,
    secundary: string
    tertiary:string,
}


export interface ISetting{
    _id: string, 
    logo:string,
    fonts: string [],
    colorPalette: IColorPalette
}
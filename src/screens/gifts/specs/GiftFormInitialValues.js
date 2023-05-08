export const getInitialValues =  (gift , formData) =>{
    if(formData){
        return formData
    }
    return{
        name: gift?.name ?? "",
        price: gift?.price ?? Number() ,
        imageContentUrl: gift?.imageContentUrl ?? [],
    }
}
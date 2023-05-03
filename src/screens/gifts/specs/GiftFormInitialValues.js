export const getInitialValues =  (gift) =>{
    return{
        name: gift?.name ?? "",
        price: gift?.price ?? Number() ,
        imageContentUrl: gift?.imageContentUrl ?? [],
    }
}
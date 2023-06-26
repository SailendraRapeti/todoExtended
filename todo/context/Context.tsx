import React from "react";
const Context=React.createContext({
    array:[],
    onAdd:(item:{id:string,image:string,name:string
        email:string,mobile:number})=>{},
    onDelete:(id:string)=>{},

})
export default Context
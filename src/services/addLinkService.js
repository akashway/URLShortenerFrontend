const URL=import.meta.env.VITE_BACKEND_URL


const addLinkService=async (data)=>{
const response= await fetch(`${URL}/link`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`${localStorage.getItem('token')}`
    },
    body:JSON.stringify(data)
})

return response
}


export default addLinkService
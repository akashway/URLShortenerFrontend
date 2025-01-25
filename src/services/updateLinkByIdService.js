const URL=import.meta.env.VITE_BACKEND_URL


const updateLinkByIdService=async (id,data)=>{
const response= await fetch(`${URL}/link/${id}`,{
    method:'PUT',
    headers:{
        'Content-Type':'application/json',
        'Authorization':`${localStorage.getItem('token')}`
    },
    body:JSON.stringify(data)
})

return response
}


export default updateLinkByIdService
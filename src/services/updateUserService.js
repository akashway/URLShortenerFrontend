const URL=import.meta.env.VITE_BACKEND_URL

const updateUserById=async (data,id)=>{

    const response= await fetch(`${URL}/user/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body:JSON.stringify(data)
    })
    return response

}

export default updateUserById
const URL=import.meta.env.VITE_BACKEND_URL

const DeleteUserById=async (id)=>{

    const response= await fetch(`${URL}/user/${id}`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export default DeleteUserById
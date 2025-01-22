const URL=import.meta.env.VITE_BACKEND_URL

const profileService=async ()=>{
    const response=await fetch(`${URL}/user/me`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`${localStorage.getItem('token')}`
        }
    })
    return response
}

export default profileService
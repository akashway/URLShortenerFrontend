const URL=import.meta.env.VITE_BACKEND_URL


const loginService=async (data)=>{
    const response=await fetch(`${URL}/user/login`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(data)
    })

    return response
}

export default loginService
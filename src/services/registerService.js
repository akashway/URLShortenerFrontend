const URL=import.meta.env.VITE_BACKEND_URL

const registerService=async (data)=>{

    const response= await fetch(`${URL}/user/register`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })

    return response

}

export default registerService
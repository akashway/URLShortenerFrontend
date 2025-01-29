const URL=import.meta.env.VITE_BACKEND_URL

const getTotalClicks=async ()=>{
    const response= await fetch(`${URL}/analytics/total-clicks`,{
        method:'GET',
        headers:{
           'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

const getClickByDays=async ()=>{
    const response= await fetch(`${URL}/analytics/day-wise`,{
        method:'GET',
        headers:{
           'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

const getClickByDevice=async()=>{
    const response= await fetch(`${URL}/analytics/device-wise`,{
        method:'GET',
        headers:{
           'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export {getTotalClicks,getClickByDays,getClickByDevice}
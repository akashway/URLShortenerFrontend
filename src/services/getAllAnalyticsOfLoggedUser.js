const URL = import.meta.env.VITE_BACKEND_URL

const getAllAnalyticsOfLoggedUser = async (offset,limit=10) => {
    const response = await fetch(`${URL}/analytics?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export default getAllAnalyticsOfLoggedUser
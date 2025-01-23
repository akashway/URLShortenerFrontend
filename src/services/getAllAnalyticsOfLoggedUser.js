const URL = import.meta.env.VITE_BACKEND_URL

const getAllAnalyticsOfLoggedUser = async () => {
    const response = await fetch(`${URL}/analytics`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export default getAllAnalyticsOfLoggedUser
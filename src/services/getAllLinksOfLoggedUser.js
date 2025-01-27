const URL = import.meta.env.VITE_BACKEND_URL

const getAllLinksOfLoggedUser = async (offset,limit=10) => {
    const response = await fetch(`${URL}/link/myLinks?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export default getAllLinksOfLoggedUser
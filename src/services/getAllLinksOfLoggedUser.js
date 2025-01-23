const URL = import.meta.env.VITE_BACKEND_URL

const getAllLinksOfLoggedUser = async () => {
    const response = await fetch(`${URL}/link/myLinks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response
}

export default getAllLinksOfLoggedUser
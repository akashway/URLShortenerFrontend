const URL = import.meta.env.VITE_BACKEND_URL

const getLinkById = async (id) => {
    const response = await fetch(`${URL}/link/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    return response

}

export default getLinkById
const URL = import.meta.env.VITE_BACKEND_URL


const deleteLinkById = async (id) => {
    const response = await fetch(`${URL}/link/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })

    return response
}

export default deleteLinkById
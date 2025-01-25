const convertDate = (createdAt) => {
    const date = new Date(createdAt)
    const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    }
    const formatter = new Intl.DateTimeFormat('en-US', options)
    return formatter.format(date)
}

export default convertDate
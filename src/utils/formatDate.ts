export const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    console.log(date)

    return new Intl.DateTimeFormat('ua-UA', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }).format(date);
}
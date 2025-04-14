export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ua', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }).format(date);
}
export const sort = <T>(a: T, b: T, orderBy: 'asc' | 'desc') => {
    const isDesc = orderBy === 'desc' ? -1 : 1;

    let comparisonResult = 0;

    if (typeof a === 'string') {
        comparisonResult = String(a).localeCompare(String(b), undefined, { numeric: true });
    }

    if (typeof a === 'number') {
        comparisonResult = Number(a) - Number(b);
    }

    if (typeof a === 'boolean') {
        comparisonResult = Number(a) - Number(b);
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        comparisonResult = a.length - b.length;
    }

    return comparisonResult * isDesc;
}
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    return [...Array(totalPages).keys()].map(i => i + 1);
}
export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages, pageNumber) => {
    let result = [];
    if (pageNumber > 1) {
        if (pageNumber > 2) {
            result.push('1')
            if (pageNumber > 3) {
                result.push('2')
                if (pageNumber > 4) {
                    result.push('...')
                }
            }
        }
        result.push('' + (pageNumber - 1))
    }
    result.push('' + pageNumber)
    if (totalPages > pageNumber) {
        result.push('' + (pageNumber + 1))
        if (totalPages > pageNumber + 1) {
            if (totalPages > pageNumber + 2) {
                if (totalPages > pageNumber + 3) {
                    result.push('...')
                }
                result.push('' + (totalPages - 1))
            }
            result.push('' + totalPages)
        }
    }
    return result;
}
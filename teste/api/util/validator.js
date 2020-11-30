const validateNotFoundException = (value) => {
    if (value === undefined || value === null || JSON.stringify(value) === "[]") {
        return false
    } else {
        return true
    }
}

module.exports = {
    validateNotFoundException
}
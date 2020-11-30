const clientNotFoundMessage = {status: 404, message: "Client Not Found", data: null};

const successMessage = (data, message = "success") => {
    return {status: 200, message: message, clients: typeof(data) === "object" ? data : JSON.parse(data)}
}

module.exports = {
    clientNotFoundMessage,
    successMessage
}
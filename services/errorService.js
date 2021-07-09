const errorStatusMap = {

    "NOT_FOUND": 404,
    "SERVER_ERROR": 500
}

const errorMessageMap = {

    "NOT_FOUND": "resource not found",
    "SERVER_ERROR": "something went wrong , try again later"
}

module.exports = {

    errorHandler: (error, message) => {

        if (!error.status) error.status = "SERVER_ERROR";


        return {
            status: errorStatusMap[error.status],
            message: message ? message : errorMessageMap[error.status]
        }
    }
}

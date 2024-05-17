// response.js
export function response(res, statusCode, data) {
    res.status(statusCode).json({
        error: false,
        data,
    });
}

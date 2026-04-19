class ApiResponse {
    constructor(
        statusCode, 
        data, 
        message = "Success"
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        // statusCode should be less than 400
        this.success = statusCode < 400
    }
}
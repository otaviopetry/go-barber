class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    // create the error message setting 400 as default status code
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default AppError;

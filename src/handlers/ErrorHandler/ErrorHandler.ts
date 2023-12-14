
export class ErrorHandler extends Error{
    message: string;
    status: number;
    name: string;
    stack?: string;

    constructor(status: number, message: string) {
        super(message);
        this.name = "Error";
        this.message = message;
        this.status = status;
    }

    static notVerified(){
        return new ErrorHandler(401, "Token isn`t verified");
    }
}
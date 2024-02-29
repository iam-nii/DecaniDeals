
// A function for handling errors
export const errorHandler = (statusCode, message)=>{
    
    const error = new Error(); // Typecasting  to any because we are adding properties to the error object
    error.code = statusCode;
    error.message = message;
    return error; 
}
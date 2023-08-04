import EErros from "./enums.js";

export default (error,request,response,next) => {
    console.log(error.code)
    switch (error.code) {
        case EErros.PRODUCT_ALREADY_EXISTS:
            response.status(409).json({
                status: "error",
                error: error.name,
                description: error.cause,
            })
            break;

        case EErros.PRODUCT_NOT_FOUND:
            response.status(404).json({
                status: "error",
                error: error.name,
                description: error.cause,
            })
            break;
        
        default:
            response.status(500).json({
                status: "error",
                error: error.name,
                description: error.cause,
            })
            break;

    }
}
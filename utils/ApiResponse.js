class ApiResponse{
    constructor(status,data,message,response){
        this.status = status
        this.data = data
        this.message = message
        this.response = response
    }
}

module.exports = ApiResponse
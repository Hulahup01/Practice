class ServiceError extends Error{
    
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }

    static notFound(message) {
        return new ServiceError(404, message);
    }
}

module.exports = ServiceError;
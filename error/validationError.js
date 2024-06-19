class ValidationError extends Error{
    
    constructor(message) {
        super();
        //?? cringe
        this.status = 422;
        this.message = message;
    }
}

module.exports = ValidationError;
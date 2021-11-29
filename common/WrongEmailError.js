
class WrongEmailError extends Error{
    constructor(message) {
        super(message);
    }
}

module.exports =  WrongEmailError;

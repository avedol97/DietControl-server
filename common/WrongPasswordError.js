
class WrongPasswordError extends Error{
    constructor(message) {
        super(message);
    }
}
module.exports = WrongPasswordError;



class UsernameExists extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = UsernameExists;

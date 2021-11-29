const bcrypt = require('bcrypt');

const cryptoPassword = async function(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}
module.exports =cryptoPassword;

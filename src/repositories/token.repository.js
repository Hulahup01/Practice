const BaseRepository = require('./base.repository');
const Token = require("../models/token.entity");

class TokenRepository extends BaseRepository  {
    constructor () {
        super();
        this.model = Token;
    }
}

module.exports = new TokenRepository();
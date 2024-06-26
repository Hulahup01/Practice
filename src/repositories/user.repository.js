const BaseRepository = require('./base.repository');
const User = require("../models/user.entity");

class UserRepository extends BaseRepository  {
    constructor () {
        super();
        this.model = User;
    }
}

module.exports = new UserRepository();
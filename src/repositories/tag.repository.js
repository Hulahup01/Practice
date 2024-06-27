const BaseRepository = require('./base.repository');
const Tag = require("../models/tag.entity");

class TagRepository extends BaseRepository  {
    constructor () {
        super();
        this.model = Tag;
    }
}

module.exports = new TagRepository();
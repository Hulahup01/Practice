class BaseRepository {
    constructor () {
        this.model = undefined
    }

    async create (body) {
        return (await this.model.create(body));
    }

    async findAll (options = {}) {
        return (await this.model.findAll(options));
    }

    async findOne (options = {}) {
        return (await this.model.findOne(options));
    }

    async findOrCreate (options = {}) {
        return (await this.model.findOrCreate(options));
    }

    async findByPk (id, options = {}) {
        return (await this.model.findByPk(id, options));
    }

    async update (id, body) {
        return (await this.model.update(body, { where: { id }, returning: true }))[1];
    }

    async remove (id) {
        return (await this.model.destroy({ where: { id } }));
    }
}

module.exports = BaseRepository
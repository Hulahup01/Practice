class UpdateTagDto {
    label;

    constructor(data) {
        this.name = data?.label;
    }
}

module.exports = UpdateTagDto
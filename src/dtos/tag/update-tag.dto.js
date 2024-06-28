class UpdateTagDto {
    label;

    constructor(data) {
        this.label = data?.label;
    }
}

module.exports = UpdateTagDto
class CreateTagDto {
    label;

    constructor(data) {
        this.name = data?.label;
    }
}

module.exports = CreateTagDto
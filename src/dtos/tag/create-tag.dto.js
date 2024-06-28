class CreateTagDto {
    label;

    constructor(data) {
        this.label = data?.label;
    }
}

module.exports = CreateTagDto
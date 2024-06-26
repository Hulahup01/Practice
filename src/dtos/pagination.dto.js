class PaginationDto {
    page;
    limit;

    constructor(data) {
        this.page = data?.page;
        this.limit = data?.limit;
    }
}

module.exports = PaginationDto;
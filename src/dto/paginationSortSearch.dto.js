class PaginationSortSearchDto {
    page;
    limit;
    sort;
    order;
    search;

    constructor(data) {
        this.page = data?.page;
        this.limit = data?.limit;
        this.sort = data?.sort;
        this.order = data?.order;
        this.search = data?.search;
    }
}

module.exports = PaginationSortSearchDto;
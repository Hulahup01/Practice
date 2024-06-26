const PaginationDto = require('../pagination.dto');

class GetMeetupDto extends PaginationDto {
    sort;
    order;
    search;
    tags;

    constructor(data) {
        super(data);
        this.sort = data?.sort;
        this.order = data?.order;
        this.search = data?.search;
        this.tags = data?.tags;
    }
}

module.exports = GetMeetupDto
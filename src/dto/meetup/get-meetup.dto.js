const PaginationSortSearchDto = require('../paginationSortSearch.dto');

class GetMeetupDto extends PaginationSortSearchDto {
    tags;

    constructor(data) {
        super(data);
        this.tags = data?.tags;
    }
}

module.exports = GetMeetupDto
const PaginationSortSearchDto = require('../paginationSortSearch.dto');

class GetTagDto extends PaginationSortSearchDto {
    constructor(data) {
        super(data);
    }
}

module.exports = GetTagDto
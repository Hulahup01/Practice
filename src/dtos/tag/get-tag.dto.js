const PaginationDto = require('../pagination.dto');

class GetTagDto extends PaginationDto {
    constructor(data) {
        super(data);
    }
}

module.exports = GetTagDto
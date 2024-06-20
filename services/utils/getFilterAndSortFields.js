const {Op} = require("sequelize");


function getFilterFields(dto) {
    const filterFields = {};
    const filterRegex = /Filter$/; // Regular expression to identify keys ending with 'Filter'
    for (const key in dto) {
        if (filterRegex.test(key)) {
            filterFields[key.replace(filterRegex, '')] = {
                [Op.like]: `%${dto[key]}%`
            };
        }
    }
    return filterFields;
}

function getSortFields(dto) {
    const sortFields = [];
    const sortRegex = /Sort$/; // Regular expression to identify keys ending with 'Sort'
    for (const key in dto) {
        if (sortRegex.test(key)) {
            sortFields.push([key.replace(sortRegex, ''), dto[key]]);
        }
    }
    return sortFields;
}


module.exports = { getFilterFields, getSortFields };
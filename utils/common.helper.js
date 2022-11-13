const _ = require('underscore');

exports.getBodyValues = async (body) => {
    const values = _.map(Object.keys(body), (key) => {
        return body[key];
    });
    return values;
};
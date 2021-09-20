const db = require('../connection.js');

exports.formatValues = (data) => {
    if (data.length === 0) return [];

    const valueKeys = Object.keys(data[0]);

    const formattedValues = data.map(dataObj => {
        const valueArray = [];
        valueKeys.forEach(value => {
            valueArray.push(dataObj[value])
        });
        return valueArray;
    });

    return formattedValues;
}

exports.insertIntoUsers = (userData) => {

}




  

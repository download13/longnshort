const sqlite = require('sqlite3');


const database = new sqlite.Database('storage/main.db');

function addUrl(url) {
    return get('INSERT INTO urls (original) VALUES (?)', [url])
        .catch(err => null)
        .then(() => getUrl(url));
}

function getUrl(url) {
    return get('SELECT * FROM urls WHERE original = ?', [url])
        .then(row => row.id);
}

function findUrl(number) {
    return get('SELECT * FROM urls WHERE id = ?', [number])
        .then(row => row && row.original);
}

function get(query, params) {
    return new Promise((resolve, reject) => {
        database.get(query, params, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}


exports.addUrl = addUrl;
exports.findUrl = findUrl;
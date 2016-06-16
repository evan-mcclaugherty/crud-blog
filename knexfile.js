require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: 'postgres://localhost/crud-blog'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};

export const environment = {
    server: {
        port: process.env.SERVER_PORT || 4000,
        pageSize: process.env.PAGE_SIZE || 5
    },
    db: {
        url: process.env.URL_DB || 'mongodb://localhost/resolveessa'
    },
    secutiry: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        jwtSecret: process.env.JWT_SECRET || 'secret-resolveessa'
    },
    log: {
        name: 'resolveessa',
        level: process.env.LOG_LEVEL || 'debug'
    }
}

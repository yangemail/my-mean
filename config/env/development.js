module.exports = {
    // MongoDB connection string:
    // remote -> mongodb://username:password@hostname:port/database
    // local -> mongodb://localhost/database
    db: 'mongodb://localhost/mean-book',
    // db: 'mongodb://yangemail8:<PASSWORD>@cluster0-shard-00-00-uix2c.mongodb.net:27017,cluster0-shard-00-01-uix2c.mongodb.net:27017,cluster0-shard-00-02-uix2c.mongodb.net:27017/mean-book?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
    // Development configuration options
    sessionSecret: 'developmentSessionSecret'
}

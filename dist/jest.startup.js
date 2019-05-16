"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jestCli = require("jest-cli");
const server_1 = require("./server/server");
const environment_1 = require("./common/environment");
const users_router_1 = require("./src/users/users.router");
const users_model_1 = require("./src/users/users.model");
const problems_router_1 = require("./src/problems/problems.router");
const categories_router_1 = require("./src/categories/categories.router");
let server;
const beforeAllTests = () => {
    environment_1.environment.db.url = process.env.DB_TEST_URL || 'mongodb://localhost/resolveessa-test';
    environment_1.environment.server.port = process.env.SERVER_PORT_TEST || 4001;
    environment_1.environment.secutiry.jwtSecret = 'test-secret-resolveessa';
    server = new server_1.Server();
    return server.bootstrap([
        users_router_1.usersRouter,
        problems_router_1.problemRouter,
        categories_router_1.categoriesRouter
    ])
        .then(server => users_model_1.User.deleteMany({}))
        .then(() => {
        let admin = new users_model_1.User();
        admin.name = 'Admin';
        admin.fone = '16993187409';
        admin.email = 'admin@email.com';
        admin.password = '123456789';
        admin.profiles = ['admin', 'user'];
        return admin.save();
    })
        .catch(console.error);
};
const afterAllTests = () => {
    return server.shutDown();
};
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(err => {
    console.error;
    process.exit(1);
});
//# sourceMappingURL=jest.startup.js.map
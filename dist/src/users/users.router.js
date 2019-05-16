"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../common/model-router");
const users_model_1 = require("./users.model");
const auth_1 = require("../security/auth");
const auth_handler_1 = require("../security/auth.handler");
const users_schema_1 = require("./users.schema");
const error_1 = require("../../common/error");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email)
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => {
                    if (user)
                        return [user];
                    return [];
                })
                    .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                    .catch(next);
            else
                next();
        };
        this.validateDuplicateFone = (req, resp, next) => {
            const { fone, email } = req.body;
            users_model_1.User.findByEmailOrFone(fone, email)
                .then(user => {
                if (user) {
                    if (user.fone == fone) {
                        throw new error_1.BadRequest('Fone is used');
                    }
                    else if (user.email == email) {
                        throw new error_1.BadRequest('Email is used');
                    }
                }
                next();
            }).catch(next);
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    apply(application) {
        application.get(this.basePath, auth_handler_1.authorize('user'), this.findByEmail, this.findAll);
        application.get(`${this.basePath}/:id`, auth_handler_1.authorize('user'), this.validateId, this.findById);
        application.post(this.basePath, this.validateSchema(users_schema_1.UsersSchemaSave), this.validateDuplicateFone, this.save);
        application.post(`${this.basePath}/authenticate`, auth_1.authenticate);
        application.put(`${this.basePath}/:id`, auth_handler_1.authorize('admin'), this.validateId, this.replace);
        application.patch(`${this.basePath}/:id`, auth_handler_1.authorize('admin'), this.validateId, this.update);
    }
}
exports.usersRouter = new UsersRouter();
//# sourceMappingURL=users.router.js.map
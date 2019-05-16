"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../common/model-router");
const auth_handler_1 = require("../security/auth.handler");
const problems_model_1 = require("./problems.model");
const problems_schema_1 = require("./problems.schema");
class ProblemRouter extends model_router_1.ModelRouter {
    constructor() {
        super(problems_model_1.Problem);
    }
    apply(application) {
        application.get(`${this.basePath}`, auth_handler_1.authorize('user'), this.findAll);
        application.post(`${this.basePath}`, auth_handler_1.authorize('user'), this.validateSchema(problems_schema_1.ProblemSchemaSave), this.save);
        application.put(`${this.basePath}/:id`, auth_handler_1.authorize('user'), this.validateId, this.validateSchema(problems_schema_1.ProblemSchemaSave), this.replace);
        application.patch(`${this.basePath}/:id`, auth_handler_1.authorize('user'), this.validateId, this.update);
    }
}
exports.problemRouter = new ProblemRouter();
//# sourceMappingURL=problems.router.js.map
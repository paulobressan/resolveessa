"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../common/model-router");
const categories_model_1 = require("./categories.model");
const auth_handler_1 = require("../security/auth.handler");
const categories_schema_1 = require("./categories.schema");
class CategoriesRouter extends model_router_1.ModelRouter {
    constructor() {
        super(categories_model_1.Category);
    }
    apply(application) {
        application.get(`${this.basePath}`, auth_handler_1.authorize('user'), this.findAll);
        application.post(`${this.basePath}`, auth_handler_1.authorize('admin'), this.validateSchema(categories_schema_1.CategoriesSchemaSave), this.save);
        application.put(`${this.basePath}/:id`, auth_handler_1.authorize('admin'), this.validateId, this.validateSchema(categories_schema_1.CategoriesSchemaSave), this.replace);
        application.patch(`${this.basePath}/:id`, auth_handler_1.authorize('admin'), this.validateId, this.update);
    }
}
exports.categoriesRouter = new CategoriesRouter();
//# sourceMappingURL=categories.router.js.map
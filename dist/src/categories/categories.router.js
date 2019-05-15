"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../common/model-router");
const categories_model_1 = require("./categories.model");
class CategoriesRouter extends model_router_1.ModelRouter {
    constructor() {
        super(categories_model_1.Category);
    }
    apply(application) {
        // application.get(this.basePath, authorize('application'), this.findByEmail, this.findAll)
    }
}
//# sourceMappingURL=categories.router.js.map
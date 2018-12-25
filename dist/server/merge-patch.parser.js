"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method == 'PATCH') {
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (err) {
            return next(new restify_errors_1.BadRequestError(`Content-type invalido: ${err.message}`));
        }
    }
    return next();
};
//# sourceMappingURL=merge-patch.parser.js.map
import * as express from 'express';
import { ModelRouter } from '../../common/model-router';
import { authorize } from '../security/auth.handler';
import { Problem } from './problems.model';
import { ProblemSchemaSave } from './problems.schema';

class ProblemRouter extends ModelRouter<Problem> {
    constructor() {
        super(Problem);
    }

    apply(application: express.Application): void {
        application.get(`${this.basePath}`, authorize('user'), this.findAll)
        application.post(`${this.basePath}`, authorize('user'), this.validateSchema(ProblemSchemaSave), this.save)
        application.put(`${this.basePath}/:id`, authorize('user'), this.validateId, this.validateSchema(ProblemSchemaSave), this.replace)
        application.patch(`${this.basePath}/:id`, authorize('user'), this.validateId, this.update)
    }
}

export const problemRouter = new ProblemRouter();
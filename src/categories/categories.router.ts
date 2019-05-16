import * as express from 'express';
import { ModelRouter } from '../../common/model-router';
import { Category } from './categories.model';
import { authorize } from '../security/auth.handler';
import { CategoriesSchemaSave } from './categories.schema';

class CategoriesRouter extends ModelRouter<Category> {
    constructor() {
        super(Category);
    }

    apply(application: express.Application): void {
        application.get(`${this.basePath}`, authorize('user'), this.findAll)
        application.post(`${this.basePath}`, authorize('admin'), this.validateSchema(CategoriesSchemaSave), this.save)
        application.put(`${this.basePath}/:id`, authorize('admin'), this.validateId, this.validateSchema(CategoriesSchemaSave), this.replace)
        application.patch(`${this.basePath}/:id`, authorize('admin'), this.validateId, this.update)
    }
}

export const categoriesRouter = new CategoriesRouter();
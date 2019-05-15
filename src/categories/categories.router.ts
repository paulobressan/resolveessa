import * as express from 'express';
import { ModelRouter } from '../../common/model-router';
import { Category } from './categories.model';
import { authorize } from '../security/auth.handler';

class CategoriesRouter extends ModelRouter<Category> {
    constructor() {
        super(Category);
    }
    apply(application: express.Application): void {
        // application.get(this.basePath, authorize('application'), this.findByEmail, this.findAll)
    }
}
import * as express from 'express'
import { ModelRouter } from '../../common/model-router';
import { User } from './users.model';
import { authenticate } from '../security/auth';
import { authorize } from '../security/auth.handler';
import { UsersSchemaSave } from './users.schema';
import { BadRequest } from '../../common/error';

class UsersRouter extends ModelRouter<User> {
    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    findByEmail: express.RequestHandler = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
        if (req.query.email)
            User.findByEmail(req.query.email)
                .then(user => {
                    if (user)
                        return [user]
                    return []
                })
                .then(this.renderAll(resp, next, {
                    pageSize: this.pageSize,
                    url: req.url
                }))
                .catch(next)
        else
            next()
    }

    validateDuplicateFone: express.RequestHandler = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
        const { fone, email } = req.body;
        User.findByEmailOrFone(fone, email)
            .then(user => {
                if (user) {
                    if (user.fone == fone) {
                        throw new BadRequest('Fone is used')
                    } else if (user.email == email) {
                        throw new BadRequest('Email is used')
                    }
                }
                next();
            }).catch(next);
    }

    apply(application: express.Application) {
        application.get(this.basePath, authorize('user'), this.findByEmail, this.findAll)
        application.get(`${this.basePath}/:id`, authorize('user'), this.validateId, this.findById)
        application.post(this.basePath, this.validateSchema(UsersSchemaSave), this.validateDuplicateFone, this.save)
        application.post(`${this.basePath}/authenticate`, authenticate)
        application.put(`${this.basePath}/:id`, authorize('admin'), this.validateId, this.replace)
        application.patch(`${this.basePath}/:id`, authorize('admin'), this.validateId, this.update)
    }
}

export const usersRouter = new UsersRouter()
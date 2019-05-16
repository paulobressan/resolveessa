import 'jest'
import * as request from 'supertest'

let address = (<any>global).address
const auth: string = (<any>global).auth

test('get /categories', () => {
    return request(address)
        .get('/categories')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})

test('post /categories', () => {
    return request(address)
        .post('/categories')
        .set('Authorization', auth)
        .send({
            name: 'Agua e Esgoto',
            description: 'Agua e Esgoto',
            urlImage: '/static/teste.png'
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.name).toBe('Agua e Esgoto')
            expect(response.body.description).toBe('Agua e Esgoto')
            expect(response.body.urlImage).toBe('/static/teste.png')
            expect(response.body.isAtivo).toBe(true)
            expect(response.body).toBeInstanceOf(Object)
        }).catch(fail)
})

test('put /categories', () => {
    return request(address)
        .post('/categories')
        .set('Authorization', auth)
        .send({
            name: 'Agua e Esgoto',
            description: 'Agua e Esgoto',
            urlImage: '/static/teste.png'
        })
        .then(response => request(address)
            .put(`/categories/${response.body._id}`)
            .set('Authorization', auth)
            .send({
                name: 'Agua e Esgoto 2',
                description: 'Agua e Esgoto 2',
                urlImage: '/static/teste.png 2'
            })).then(response => {
                expect(response.status).toBe(200)
                expect(response.body.name).toBe('Agua e Esgoto 2')
                expect(response.body.description).toBe('Agua e Esgoto 2')
                expect(response.body.urlImage).toBe('/static/teste.png 2')
                expect(response.body.isAtivo).toBe(true)
                expect(response.body).toBeInstanceOf(Object)
            }).catch(fail)
})
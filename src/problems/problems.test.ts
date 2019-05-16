import 'jest'
import * as request from 'supertest'

let address = (<any>global).address
const auth: string = (<any>global).auth

test('get /problems', () => {
    return request(address)
        .get('/problems/')
        .set('Authorization', auth)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.body.items).toBeInstanceOf(Array)
        }).catch(fail)
})
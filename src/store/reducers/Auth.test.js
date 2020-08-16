import reducer from './auth'
import * as actionType from '../actions/actionTypes'

describe('auth reducer', () => {

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null
        })
    })

    it('should store token when login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null
        }, {
            type: actionType.AUTH_SUCCESS,
            authData: {
                data: {
                    idToken: 'initoken',
                    localId: 'aidi'
                }
            }
        }
        )).toEqual({
            token: 'initoken',
            userId: 'aidi',
            error: null
        })
    })
})
'use strict';
const errors = require('restify-errors');
const axios = require('axios');
const querystring = require('querystring');
const { params, url, redirect_uri } = require("./../serviceParams.js")


class Router {
    constructor(server) {
        this.serverInstance = server;
    }

    activateAuthEndpoint() {

        this.serverInstance.get("/auth", async (req, res, next) => {
            if ('code' in req.query) {
                try {
                    var data = params;
                    data['code'] = req.query.code
                    data = querystring.stringify(data);
                    data += `&redirect_uri=${redirect_uri}`
                    var response = await axios.post(url, data)
                    const result = await this._exchangeLongLivedToken(response.data['access_token'])
                    Promise.resolve(res.send(result))
                }
                catch (ex) {
                    console.log(ex)
                    next(new errors.BadRequestError());
                }
            }
            else next(new errors.BadRequestError());
        });
    }
    activateUserEndPoints() {


        this.serverInstance.get('/getUserInfo/:param', async (req, res, next) => {

            console.log(req.query)
            if ('access_token' in req.query == false) return next(new errors.BadRequestError());
            if ('profile' == req.params.param) {
                try {
                    const tokenResponse = await axios.get(`https://graph.instagram.com/me?access_token=${req.query.access_token}&fields=username,account_type`)
                    res.send(tokenResponse.data)
                }
                catch (ex) {
                    next(new errors.BadRequestError())
                }

            }
            else if ('media' == req.params.param) {
                try {
                    const tokenResponse = await axios.get(`https://graph.instagram.com/me/media?access_token=${req.query.access_token}&fields=id,caption`)
                    res.send(tokenResponse.data)
                }
                catch (ex) {
                    next(new errors.BadRequestError())

                }

            }
            else next(new errors.BadRequestError());
        });
    }





    async _exchangeLongLivedToken(token) {
        const query = { client_secret: params.client_secret, access_token: token, grant_type: "ig_exchange_token" }
        const tokenResponse = await axios.get(`https://graph.instagram.com/access_token?${querystring.stringify(query)}`)
        return Promise.resolve(tokenResponse.data)
    }

}


module.exports = Router


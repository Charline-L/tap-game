/*
Imports
*/
    // Node
    const express = require('express');
    const authRouter = express.Router();

    // Inner
    const Mandatory = require('../../services/mandatory.service');
    const Vocabulary = require('../../services/vocabulary.service');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
    const { checkFields } = require('../../services/request.service');
    const { register, login } = require('./auth.controller');
//

/*
Routes definition
*/
    class AuthRouterClass {

        // Inject Passport to secure routes
        constructor({ passport }) {
            this.passport = passport;
        }
        
        // Set route fonctions
        routes(){

            /**
             * POST Route to create new identity
             * @param body: Object => email: String (unique), password: String
             * @callback => create identity and associated user
            */
            authRouter.post( '/register', (req, res) => {
                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };
                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatory.register, req.body );

                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else{

                    //=> Request is valid: use controller
                    register(req.body)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
                };
            });

            /**
             * POST Route to login user
             * @param body: Object => email: String, password: String
             * @callback => send user _id and date informations
            */
            authRouter.post( '/login', (req, res) => {

                // Check request body
                if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };

                // Check fields in the body
                const { miss, extra, ok } = checkFields( Mandatory.login, req.body );

                //=> Error: bad fields provided
                if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
                else{

                    //=> Request is valid: use controller
                    login(req.body, res)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse) );
                };
            });

            /**
             * GET Route to check identity token (for Angular AuthGuard)
             * @param passport: AuthStrategy => use the access token to check user identity
             * @callback => send user _id and date informations
             */
            authRouter.get( '/', this.passport.authenticate('jwt', { session: false }), (req, res) => {

                // Check if identity is validated for security strategy
                if(req.user.isValidated) return sendApiSuccessResponse(res, Vocabulary.request.success, { _id: req.user._id, lastConnection: req.user.lastConnection })
                else return sendApiErrorResponse(res, Vocabulary.request.error, 'Identity not validated');
            });

            /**
             * GET Route pour déconnecter l'utilisateur
             * @param passport: AuthStrategy => use the access token to check user identity
             * @callback => send success
             */
            authRouter.get( '/logout', this.passport.authenticate('jwt', { session: false }), (req, res) => {

                // efface le cookie
                res.cookie(process.env.COOKIE_NAME, null, {httpOnly: true});

                // Renvoit réponse vide
                return sendApiSuccessResponse(res, Vocabulary.request.success, {})
            });
        };

        // Start router
        init(){
            // Get route fonctions
            this.routes();

            // Sendback router
            return authRouter;
        };
    };
//

/*
Export
*/
    module.exports = AuthRouterClass;
//
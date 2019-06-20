/*
Imports
*/
// Node
const express = require('express');
const gameRouter = express.Router();

// Inner
const Mandatory = require('../../services/mandatory.service');
const Vocabulary = require('../../services/vocabulary.service');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/response.service');
const { checkFields } = require('../../services/request.service');
const { addScore, allScores } = require('./game.controller');
//

/*
Routes definition
*/
class GameRouterClass {

    // Inject Passport to secure routes
    constructor({ passport }) {
        this.passport = passport;
    }

    // Set route fonctions
    routes(){

        /**
         * GET Route pour récupérer les scores du jeu
         * @callback => envoie le tableau de scores
         */
        gameRouter.get( '/scores', this.passport.authenticate('jwt', { session: false }), (req, res) => {

            allScores()
                .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
        });

        /**
         * POST Route pour ajouter un score
         * @param body: Object => nombre: String
         * @callback => enregistre le score
         */
        gameRouter.post( '/score', this.passport.authenticate('jwt', { session: false }), (req, res) => {

            // Check request body
            if (typeof req.body === 'undefined' || req.body === null) { sendBodyError(res, Vocabulary.errors.noBody) };

            // Check fields in the body
            const { miss, extra, ok } = checkFields( Mandatory.score, req.body );

            //=> Error: bad fields provided
            if (!ok) { sendFieldsError(res, Vocabulary.errors.badFields, miss, extra) }
            else{

                //=> Request is valid: use controller
                addScore(req.body, req.user._id)
                    .then( apiResponse => sendApiSuccessResponse(res, Vocabulary.request.success, apiResponse) )
                    .catch( apiResponse => sendApiErrorResponse(res, Vocabulary.request.error, apiResponse))
            };
        });
    };

    // Start router
    init(){
        // Get route fonctions
        this.routes();

        // Sendback router
        return gameRouter;
    };
};
//

/*
Export
*/
module.exports = GameRouterClass;
//
/*
Import
*/
const GameModel = require('../../models/game.model')
//

/*
Methods
*/

/**
 * AddScore pour un utilisateur
 * @param body => points: Number
 */
const addScore = (body, idUser) => {

    return new Promise((resolve, reject) => {

        // ajoute l'id de l'utilisateur
        body.user = idUser

        // ajoute la date
        body.date = new Date()

        // enregistre le score
        GameModel.create(body)
            .then(mongoResponse => resolve({_id: mongoResponse._id}))
            .catch(mongoResponse => reject(mongoResponse))
    })
}


/**
 * AllScores pour un utilisateur
 */
const allScores = () => {

    return new Promise((resolve, reject) => {

        GameModel
            .find(
                {},
                { '_id': 0, 'date' :1, 'user': 1, 'points': 1},
                {
                    sort:{
                        points: -1
                    }
                }
            )
            .populate('user')
            .exec((error, scores) => {

                if (error) reject(error)
                else resolve(scores)
            })
    })
}

/*
Export
*/
module.exports = {
    addScore,
    allScores
}
//
/*
Import
*/
// Mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose;

/*
Mongoose schema definition
Declare each property and type needed for the schema
*/
const gameSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    points: Number,
    date: Date,
})
//

/*
Export
Create a const that use the Mongoose schema to declare an objet model
*/
const GameModel = mongoose.model('game', gameSchema);
module.exports = GameModel;
//
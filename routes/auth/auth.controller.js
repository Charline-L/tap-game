/*
Import
*/
    const UserModel = require('../../models/user.model')
    const bcrypt = require('bcryptjs');
//

/*
Methods
*/
    /**
     * Register new identity and user
     * @param body => email: String (unique), password: String
    */
    const register = body => {
        return new Promise( (resolve, reject) => {

            // Search user by email
            UserModel.findOne( { email: body.email }, (error, user) => {
                if(error) return reject(error) // Mongo Error
                else if(user) return reject('Identity already exist')
                else{

                    // Encrypt user password
                    bcrypt.hash( body.password, 10 )
                    .then( hashedPassword => {

                        // Replace password
                        body.password = hashedPassword;

                        // Set creation and connection date
                        body.creationDate = new Date();
                        body.lastConnection = null;

                        // ajoute la validation de l'utilisateur
                        body.isValidated = true

                        // Register new user
                        UserModel.create(body)
                        .then( mongoResponse => resolve({ _id: mongoResponse._id, creationDate: mongoResponse.creationDate }))
                        .catch( mongoResponse => reject(mongoResponse) )
                    })
                    .catch( hashError => reject(hashError) );
                };
            });
            
        });
    };

    /**
     * Login user
     * @param body: Object => email: String, password: String
    */
    const login = (body, res) => {

        return new Promise( (resolve, reject) => {

            // Search user by email
            UserModel.findOne( { email: body.email }, (error, user) => {
                if(error) reject(error)
                else if(!user) reject('Unknow identity')
                else{

                    // Check password
                    const validPassword = bcrypt.compareSync(body.password, user.password);
                    if( !validPassword ) reject('Password is not valid')
                    else {

                        // Set cookie
                        res.cookie(process.env.COOKIE_NAME, user.generateJwt(user._id), {httpOnly: true});

                        // Define user last connection
                        const lastConnection = user.lastConnection;

                        // Set user new connection
                        user.lastConnection = new Date();

                        // Save new connection
                        user.save( (error, user) => {

                            if(error) return reject(error)
                            else{
                                return resolve({ _id: user._id, firstName: user.firstName, creationDate: user.creationDate, lastConnection: lastConnection });
                            };
                        });
                    };
                };
            });
        });
    };

/*
Export
*/
    module.exports = {
        register,
        login
    }
//
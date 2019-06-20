/* 
Definition
*/
    const Mandatories = {
        register: ['email', 'password', 'lastName', 'firstName'],
        idValidation: ['_id', 'password'],
        login: ['email', 'password'],
        changePassword: ['password', 'newPassword'],
        score: ['points']
    };
//

/* 
Export
*/
    module.exports = Mandatories;
//
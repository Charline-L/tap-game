const EmailValidator = require('email-validator');

/*
Service definition
*/
    const checkFields = (required, object) => {
        /* 
        Variables
        */
            const miss = [];
            const extra = [];
        //
    
        /*
        Check fields
        */
            // Check missing fields
            required.forEach((prop) => {
                if (!(prop in object)) miss.push(prop);
            });
        
            // Check extra fields
            for (const prop in object) {
                if (required.indexOf(prop) === -1) extra.push(prop);
            }

            // verifie si le mail est valide
            if ( object.email && !EmailValidator.validate(object.email) ) miss.push(object.email);

            // Set service state
            const ok = (extra.length === 0 && miss.length === 0);

            // Return service state
            return { ok, extra, miss };
        //
    };
// 


/*
Export service fonctions
*/
  module.exports = {
    checkFields,
  };
//
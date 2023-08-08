const mongoose = require('mongoose');

const myDb = new mongoose.Schema({
         username: {
                  type: 'string',
                  required: true
         },
         email: { type: 'string', required: true, unique: true },
         password: {
                  type: 'string',
                  required: true
         },
         confirmPassword: {
                  type: 'string',
                  required: true
         },

})
myDb.statics.findByCredentials = async function (username, password) {
         const user = await this.findOne({ username });

         if (!user) {
                  return null; // User not found
         }
         return user;
}

const Register = new mongoose.model("Register", myDb);
module.exports = Register;
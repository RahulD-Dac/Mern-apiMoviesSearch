const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/login", {
         useNewUrlParser: true,
         useUnifiedTopology: true,
}).then(() => {
         console.log(`connection successfully`);
}).catch((e) => {
         console.log(`connection error: ${e}`);
});

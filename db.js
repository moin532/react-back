const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(process.env.DATABASE)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

};



module.exports = main;


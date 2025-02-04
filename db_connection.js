const mongoose = require('mongoose');
const url = 'mongodb+srv://prilean:BrillantSecret8888@cluster0.jhql3.mongodb.net/AuppSpring2025?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url)
      .then( () => 
             {
               console.log('NODEJS TO MongoDB Connection ESTABLISH.....');
             })
      .catch( err => 
              {
               console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
               process.exit();
              }); 
module.exports = mongoose;

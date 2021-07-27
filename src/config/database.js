const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jkthecoder:jkTheCoder@cluster0.va5hj.mongodb.net/assessmentinfo?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then( () => console.log('Database Connected ..!'))
.catch( err => console.log(err));
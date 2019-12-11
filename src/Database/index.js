const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Jayme:020600@cluster0-uoip5.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
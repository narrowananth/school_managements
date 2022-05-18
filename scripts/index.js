var glob = require('glob');
var path = require('path');
const mongoose = require("mongoose");
module.exports = function(app) {

    let dbPath = "mongodb+srv://admin-ananth:171025@cluster0.vwqpc.mongodb.net/School"

    mongoose.connect(dbPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    const mongodb = mongoose.connection;

    mongodb.on("error", () => {
        console.log("> error occurred from the MongoDB Atlas database");
    });
    mongodb.once("open", () => {
        console.log("> successfully opened the MongoDB Atlas database");
    });

    Mongodb = () => {
        return {
            AdminDetail: require('./models/admin.model'),
            ClassDetail: require('./models/class.model'),
            FeeDetail: require('./models/fee.model'),
            StudentDetail: require('./models/student.model'),
            StaffDetail: require('./models/staff.model'),
            ParentsDetail: require('./models/parent.model'),
            PaymentDetail: require('./models/payment.model')
        }
    }

    glob.sync('scripts/**/*.js').forEach(function(file) {
        file = file.replace('scripts/', '');
        // Avoid to read this current file, config.js & utils.js
        if (file === path.basename(__filename) || file.includes(".model.js")) { return; }

        // Load the js file.
        require('./' + file)(app, Mongodb);
    });
};
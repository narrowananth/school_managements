let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schemaOptions = {
    toObject: {
        virtuals: true,
        getters: true
    },
    toJSON: {
        virtuals: true,
        getters: true
    },
    timestamps: true
};

let AdminSchema = new Schema({
    principleId: { type: Number },
    principleName: { type: String },
    principleEmail: { type: String },
    principlePhoneNo: { type: String },
    role: { type: String },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let AdminDetail = mongoose.model('admin_users', AdminSchema);
module.exports = AdminDetail;
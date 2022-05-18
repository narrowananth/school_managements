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

let StaffSchema = new Schema({
    staffId: { type: Number },
    staffName: { type: String },
    staffEmail: { type: String },
    staffPhoneNo: { type: String },
    role: { type: String },
    access: { type: Array },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let StaffDetail = mongoose.model('school_staffs', StaffSchema);
module.exports = StaffDetail;
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
let ParentsSchema = new Schema({
    studentName: { type: String, required: true },
    studentId: { type: Number, required: true },
    fatherName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let ParentsDetail = mongoose.model('parents_details', ParentsSchema);
module.exports = ParentsDetail;
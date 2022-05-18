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
let StudentSchema = new Schema({
    rollNo: { type: Number, required: true },
    studentName: { type: String, required: true },
    studentId: { type: Number, required: true },
    dob: { type: String, required: true },
    academicYear: { type: String, required: true },
    status: { type: String, required: true },
    class: { type: String, required: true },
    standard: { type: String, required: true },
    feesPay: { type: Boolean, required: true },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let StudentDetail = mongoose.model('student_details', StudentSchema);
module.exports = StudentDetail;
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
let PaymentSchema = new Schema({
    rollNo: { type: Number },
    studentName: { type: String },
    studentId: { type: Number },
    dob: { type: String },
    academicYear: { type: String },
    class: { type: String },
    status: { type: String },
    standard: { type: String },
    advanceAmount: { type: Number },
    examFees: { type: Number },
    bookFees: { type: Number },
    yearlyFees: { type: Number },
    totalFees: { type: Number },
    remaingFees: { type: Number },
    mobile: { type: Number },
    email: { type: String },
    fatherName: { type: String },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let PaymentDetail = mongoose.model('payment_histories', PaymentSchema);
module.exports = PaymentDetail;
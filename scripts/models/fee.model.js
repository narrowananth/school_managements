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

let FeeSchema = new Schema({
    standard: { type: String },
    advanceAmount: { type: Number },
    examFees: { type: Number },
    bookFees: { type: Number },
    yearlyFees: { type: Number },
    totalFees: { type: Number },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let FeeDetail = mongoose.model('school_class_fees', FeeSchema);
module.exports = FeeDetail;
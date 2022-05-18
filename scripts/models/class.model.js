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

let ClassSchema = new Schema({
    class: { type: String, required: true },
    standard: { type: String },
    section: { type: String },
    staffId: { type: Number },
    staffName: { type: String },
    academicYear: { type: String },
    academicYearScore: { type: Number },
    created_at: Date,
    updated_at: Date,
}, schemaOptions);

let ClassDetail = mongoose.model('class_and_section', ClassSchema);
module.exports = ClassDetail;
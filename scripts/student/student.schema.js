const Joi = require('@hapi/joi')
module.exports = (app, Mongodb) => {

    createStudentDetails = Joi.object({
        rollNo: Joi.number().required(),
        studentId: Joi.number().required(),
        studentName: Joi.string().required(),
        dob: Joi.string().required(),
        academicYear: Joi.string().required(),
        status: Joi.string().required(),
        class: Joi.string().required(),
        standard: Joi.string().required(),
        feesPay: Joi.boolean().required(),
    })

    showStudentFees = Joi.object({
        studentId: Joi.number().required(),
        standard: Joi.string().required()
    })
}
const Joi = require('@hapi/joi')
module.exports = (app, Mongodb) => {

    createParentDetails = Joi.object({
        staffId: Joi.number().required(),
        studentName: Joi.string().required(),
        studentId: Joi.number().required(),
        fatherName: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required()
    })
}
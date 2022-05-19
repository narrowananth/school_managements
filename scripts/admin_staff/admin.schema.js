const Joi = require('@hapi/joi')
module.exports = (app, Mongodb) => {

    createStaffDetails = Joi.object({
        staffName: Joi.string().required(),
        staffId: Joi.number().required(),
        staffEmail: Joi.string().email().required(),
        staffPhoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required()
    })

    updateStaffDetails = Joi.object({
        staffId: Joi.number().required(),
        role: Joi.string().valid('viewer', 'admin').required(),
        access: Joi.array().required()
    })

    createAdminDetails = Joi.object({
        principleName: Joi.string().required(),
        principleId: Joi.number().required(),
        principleEmail: Joi.string().email().required(),
        principlePhoneNo: Joi.string().length(10).pattern(/^[0-9]+$/).required()
    })

    createFeesDetails = Joi.object({
        standard: Joi.string().required(),
        advanceAmount: Joi.number().required(),
        examFees: Joi.number().required(),
        bookFees: Joi.number().required(),
        yearlyFees: Joi.number().required()
    })
}